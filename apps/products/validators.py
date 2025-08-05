# In apps/products/validators.py (create this file)

from django.core.exceptions import ValidationError
from django.conf import settings
import os

def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1].lower()
    if ext not in settings.ALLOWED_IMAGE_EXTENSIONS:
        raise ValidationError(f'Unsupported file extension. Allowed: {", ".join(settings.ALLOWED_IMAGE_EXTENSIONS)}')

def validate_image_file_size(value):
    filesize = value.size
    if filesize > settings.MAX_UPLOAD_SIZE:
        raise ValidationError(f'File size must be less than {settings.MAX_UPLOAD_SIZE / (1024*1024):.1f} MB')