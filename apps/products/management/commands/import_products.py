import csv
from django.core.management.base import BaseCommand
from apps.products.models import Product, Brand
from apps.categories.models import Category
from django.utils.text import slugify
from django.db import IntegrityError

class Command(BaseCommand):
    help = 'Import products from CSV file (media/products.csv)'

    def handle(self, *args, **kwargs):
        allowed_categories = ['Electronics', 'Fashion', 'Books', 'Home_Decor', 'Gadgets', 'Book']
        with open('media/products.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                category_name = row.get('Category')
                if category_name not in allowed_categories:
                    continue
                category, _ = Category.objects.get_or_create(name=category_name)
                brand_name = row.get('Brand', 'Unknown')
                brand, _ = Brand.objects.get_or_create(name=brand_name)
                name = row.get('Name', '')[:200]  # Truncate to 200 chars
                description = row.get('Description', '')
                price = row.get('Price', 0)
                sku = row.get('Sku', '')
                stock = row.get('Stock', 10)
                # Generate slug and ensure it fits max_length=50
                base_slug = slugify(name)[:45]  # leave room for uniqueness
                slug = base_slug
                i = 1
                while Product.objects.filter(slug=slug).exists():
                    suffix = f"-{i}"
                    slug = f"{base_slug[:45-len(suffix)]}{suffix}"
                    i += 1
                try:
                    Product.objects.create(
                        name=name,
                        slug=slug,
                        description=description,
                        price=price,
                        category=category,
                        brand=brand,
                        stock=stock,
                        sku=sku,
                    )
                except IntegrityError:
                    self.stdout.write(self.style.WARNING(f"Duplicate SKU skipped: {sku}"))
        self.stdout.write(self.style.SUCCESS('Products imported!')) 