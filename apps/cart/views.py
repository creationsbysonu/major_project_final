from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from apps.products.models import Product

# Helper to get or create cart for user/session
def get_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key or request.session.save() or request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key)
    return cart

class CartView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        cart = get_cart(request)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

class AddToCartView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        cart = get_cart(request)
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 1))
        product = get_object_or_404(Product, id=product_id)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'quantity': 1})
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()
        return Response({'success': True, 'item': CartItemSerializer(item, context={'request': request}).data})

class UpdateCartItemView(APIView):
    permission_classes = [permissions.AllowAny]
    def patch(self, request, item_id):
        cart = get_cart(request)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        quantity = int(request.data.get('quantity', 1))
        item.quantity = quantity
        item.save()
        return Response({'success': True, 'item': CartItemSerializer(item, context={'request': request}).data})

class RemoveCartItemView(APIView):
    permission_classes = [permissions.AllowAny]
    def delete(self, request, item_id):
        cart = get_cart(request)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        item.delete()
        return Response({'success': True})

class ClearCartView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        cart = get_cart(request)
        cart.items.all().delete()
        return Response({'success': True})
