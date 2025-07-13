from django.urls import path , include
from . import views

urlpatterns = [
    
    path('',views.ProductView.as__view()),
]
