from rest_framework import serializers
from .models import Cart, CartItem
from apps.products.models import Product
from django.conf import settings

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'product_price', 'product_image', 'quantity']

    def get_product_image(self, obj):
        request = self.context.get('request')
        # Prefer primary ProductImage if exists
        primary_image = obj.product.images.filter(is_primary=True).first()
        if primary_image and primary_image.image:
            url = primary_image.image.url
        else:
            first_image = obj.product.images.first()
            if first_image and first_image.image:
                url = first_image.image.url
            elif obj.product.image:
                url = obj.product.image.url
            else:
                return None
        if request is not None:
            return request.build_absolute_uri(url)
        # Avoid double /media/ prefix
        from django.conf import settings
        if url.startswith(settings.MEDIA_URL):
            return url
        return settings.MEDIA_URL + url.lstrip('/')

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_key', 'items', 'created_at', 'updated_at']
