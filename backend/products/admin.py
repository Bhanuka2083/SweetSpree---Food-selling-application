from django.contrib import admin
from .models import Product, ProductImage

# Register your models here.

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 5 # Gives 3 empty rows by default to upload files

# This creates a nice table view in the admin panel
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name',)
    inlines = [ProductImageInline]