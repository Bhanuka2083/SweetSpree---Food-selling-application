from django.contrib import admin
from .models import Product

# Register your models here.

# This creates a nice table view in the admin panel
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name',)