import csv
from django.core.management.base import BaseCommand
from apps.products.models import Product, Brand
from apps.categories.models import Category

class Command(BaseCommand):
    help = 'Import products from CSV file (media/products.csv)'

    def handle(self, *args, **kwargs):
        allowed_categories = ['Electronics', 'Fashion', 'Books', 'Home_Decor', 'Gadgets']  # Updated to match your categories
        with open('media/products.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['category'] not in allowed_categories:
                    continue  # Skip this product
                category, _ = Category.objects.get_or_create(name=row['category'])
                brand, _ = Brand.objects.get_or_create(name=row['brand'])
                Product.objects.create(
                    name=row['name'],
                    description=row.get('description', ''),
                    price=row['price'],
                    category=category,
                    brand=brand,
                    stock=row.get('stock', 0),
                    sku=row['sku'],
                )
        self.stdout.write(self.style.SUCCESS('Products imported!')) 