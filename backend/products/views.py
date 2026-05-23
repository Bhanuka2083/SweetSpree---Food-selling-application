from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
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