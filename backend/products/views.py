from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def get_products(request):
    products = Product.objects.filter(is_active=True)
    
    # Pass the queryset to the serializer. 
    # many=True tells DRF we are serializing a list of items, not just one.
    # context={'request': request} is the magic trick that tells DRF to automatically build the full http://... URL for images!
    serializer = ProductSerializer(products, many=True, context={'request': request})
    
    return Response(serializer.data)


# single product details retreve
@api_view(['GET'])
def get_product(request, pk):
    try:
        # Try to find the product with the matching ID
        product = Product.objects.get(pk=pk, is_active=True)
        # many=False because we are translating a single object, not a list
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        # If the ID doesn't exist, return a clean 404 error
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)