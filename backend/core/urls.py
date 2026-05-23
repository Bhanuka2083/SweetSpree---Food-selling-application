"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from products.models import Product

from django.conf import settings
from django.conf.urls.static import static
from products.views import get_products


def sample_products(request):
    products = Product.objects.filter(is_active=True)
    data = []
    
    for p in products:
        # Check if the image exists before trying to get its URL
        image_url = request.build_absolute_uri(p.image.url) if p.image else None
        
        data.append({
            "id": p.id,
            "name": p.name,
            "price": float(p.price),
            "description": p.description,
            "image_url": image_url
        })
        
    return JsonResponse(data, safe=False)


def api_welcome(request):
    return JsonResponse({"message": "Welcome to the SweetSpree API Backend!"})


# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/products/', sample_products),
# ]

urlpatterns = [
    path('admin/', admin.site.url_view if hasattr(admin, 'url_view') else admin.site.urls),
    path('api/products/', get_products),
    path('', api_welcome),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


