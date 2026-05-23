from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # The '__all__' shortcut tells DRF to automatically map every column in the database table
        fields = '__all__'