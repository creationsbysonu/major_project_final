from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Product

# Register your models here.

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    pass