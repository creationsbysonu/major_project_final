from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Count, Q
from .models import Category
from apps.products.models import Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryListView(generics.ListCreateAPIView):
    """
    List all categories or create a new category
    GET: Returns all categories
    POST: Creates a new category (admin only)
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def get_permissions(self):
        """
        Only authenticated users can create categories
        Anyone can view categories
        """
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return []
    
    def get_queryset(self):
        """
        Optionally filter categories by parent, active status, or show only main categories
        """
        queryset = Category.objects.all()
        is_active = self.request.query_params.get('active', None)
        parent_id = self.request.query_params.get('parent', None)
        main_only = self.request.query_params.get('main_only', None)
        
        if is_active is not None:
            queryset = queryset.filter(is_active=True)
        
        if parent_id is not None:
            if parent_id == '0':  # Get main categories (no parent)
                queryset = queryset.filter(parent=None)
            else:
                queryset = queryset.filter(parent_id=parent_id)
        
        if main_only:
            queryset = queryset.filter(parent=None)
            
        return queryset.order_by('name')


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a category
    GET: Returns category details
    PUT/PATCH: Updates category (admin only)
    DELETE: Deletes category (admin only)
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def get_permissions(self):
        """
        Only authenticated users can update/delete categories
        Anyone can view category details
        """
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return []
    
    def retrieve(self, request, *args, **kwargs):
        """
        Get category details with product count
        """
        category = self.get_object()
        serializer = self.get_serializer(category)
        data = serializer.data
        
        # Add product count to response
        data['product_count'] = category.products.filter(is_active=True).count()
        
        return Response(data)


class CategoryProductsView(generics.ListAPIView):
    """
    List all products in a specific category
    GET: Returns all products for a category
    """
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        """
        Get products for specific category
        """
        category_id = self.kwargs['pk']
        category = get_object_or_404(Category, pk=category_id)
        
        queryset = Product.objects.filter(
            category=category,
            is_active=True
        ).select_related('category', 'brand')
        
        # Optional filtering
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        search = self.request.query_params.get('search', None)
        brand = self.request.query_params.get('brand', None)
        is_featured = self.request.query_params.get('featured', None)
        in_stock = self.request.query_params.get('in_stock', None)
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) |
                Q(short_description__icontains=search)
            )
        if brand:
            queryset = queryset.filter(brand__slug=brand)
        if is_featured:
            queryset = queryset.filter(is_featured=True)
        if in_stock:
            queryset = queryset.filter(stock__gt=0)
            
        return queryset.order_by('-created_at')
    
    def list(self, request, *args, **kwargs):
        """
        Custom list response with category info
        """
        category_id = self.kwargs['pk']
        category = get_object_or_404(Category, pk=category_id)
        
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['category'] = {
                'id': category.id,
                'name': category.name,
                'description': category.description,
                'slug': category.slug
            }
            return response
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'category': {
                'id': category.id,
                'name': category.name,
                'description': category.description,
                'slug': category.slug
            },
            'products': serializer.data
        })


# Additional utility views you might need

class PopularCategoriesView(generics.ListAPIView):
    """
    Get categories with most products
    """
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return Category.objects.annotate(
            product_count=Count('products', filter=Q(products__is_active=True))
        ).filter(
            is_active=True,
            product_count__gt=0
        ).order_by('-product_count')[:6]


class CategorySearchView(generics.ListAPIView):
    """
    Search categories by name
    """
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return Category.objects.filter(
                name__icontains=query,
                is_active=True
            ).order_by('name')
        return Category.objects.none()