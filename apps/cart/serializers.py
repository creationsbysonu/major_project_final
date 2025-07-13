from django.urls import path , include

urlpatterns = [
    
    path('cart/',include('api.urls'))
]
