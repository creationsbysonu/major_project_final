# management/commands/populate_categories.py
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from categories.models import Category


class Command(BaseCommand):
    help = 'Populate database with initial categories'
    
    def handle(self, *args, **options):
        categories = [
            {
                'name': 'Fashion',
                'description': 'Trendy clothing, accessories, and fashion items for men, women, and kids',
                'subcategories': [
                    {'name': 'Men\'s Fashion', 'description': 'Clothing and accessories for men'},
                    {'name': 'Women\'s Fashion', 'description': 'Clothing and accessories for women'},
                    {'name': 'Kids Fashion', 'description': 'Clothing and accessories for children'},
                    {'name': 'Accessories', 'description': 'Fashion accessories and jewelry'},
                ]
            },
            {
                'name': 'Electronics',
                'description': 'Latest electronic devices, gadgets, and tech accessories',
                'subcategories': [
                    {'name': 'Smartphones', 'description': 'Mobile phones and accessories'},
                    {'name': 'Laptops & Computers', 'description': 'Computers and related accessories'},
                    {'name': 'Audio & Video', 'description': 'Headphones, speakers, and entertainment devices'},
                    {'name': 'Gaming', 'description': 'Gaming consoles and accessories'},
                ]
            },
            {
                'name': 'Home Decor',
                'description': 'Beautiful home decoration items, furniture, and interior design products',
                'subcategories': [
                    {'name': 'Furniture', 'description': 'Home and office furniture'},
                    {'name': 'Lighting', 'description': 'Lamps, ceiling lights, and decorative lighting'},
                    {'name': 'Wall Art', 'description': 'Paintings, posters, and wall decorations'},
                    {'name': 'Kitchen & Dining', 'description': 'Kitchen accessories and dining essentials'},
                ]
            },
            {
                'name': 'Gadgets',
                'description': 'Innovative gadgets, smart devices, and cutting-edge technology',
                'subcategories': [
                    {'name': 'Smart Home', 'description': 'Home automation and smart devices'},
                    {'name': 'Wearables', 'description': 'Smartwatches, fitness trackers, and wearable tech'},
                    {'name': 'Tech Accessories', 'description': 'Cables, chargers, and tech accessories'},
                    {'name': 'Outdoor Gadgets', 'description': 'Portable and outdoor technology'},
                ]
            },
            {
                'name': 'Books',
                'description': 'Wide collection of books across various genres and subjects',
                'subcategories': [
                    {'name': 'Fiction', 'description': 'Novels, stories, and fictional literature'},
                    {'name': 'Non-Fiction', 'description': 'Educational, biographical, and informational books'},
                    {'name': 'Academic', 'description': 'Textbooks and academic publications'},
                    {'name': 'Children\'s Books', 'description': 'Books for kids and young readers'},
                ]
            },
        ]
        
        created_count = 0
        for category_data in categories:
            # Create main category
            main_category, created = Category.objects.get_or_create(
                name=category_data['name'],
                defaults={
                    'slug': slugify(category_data['name']),
                    'description': category_data['description'],
                    'is_active': True,
                    'parent': None  # Main categories have no parent
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created main category: {main_category.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Main category already exists: {main_category.name}')
                )
            
            # Create subcategories
            for subcat_data in category_data.get('subcategories', []):
                subcategory, sub_created = Category.objects.get_or_create(
                    name=subcat_data['name'],
                    defaults={
                        'slug': slugify(subcat_data['name']),
                        'description': subcat_data['description'],
                        'is_active': True,
                        'parent': main_category  # Set parent to main category
                    }
                )
                
                if sub_created:
                    created_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f'  Created subcategory: {subcategory.name}')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f'  Subcategory already exists: {subcategory.name}')
                    )
        
        total_categories = len(categories) + sum(len(cat.get('subcategories', [])) for cat in categories)
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully processed {total_categories} categories. '
                f'Created {created_count} new categories.'
            )
        )