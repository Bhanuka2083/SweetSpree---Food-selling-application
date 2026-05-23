from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True) # Cover image
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# --- Add this new model below ---
class ProductImage(models.Model):
    # ForeignKey links this image to a specific Product.
    # on_delete=models.CASCADE means if a product is deleted, its gallery images are deleted too.
    # related_name='images' allows us to easily grab all images belonging to a product.
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_gallery/')
    alt_text = models.CharField(max_length=200, blank=True, help_text="Optional description of the image")

    def __str__(self):
        return f"Image for {self.product.name}"