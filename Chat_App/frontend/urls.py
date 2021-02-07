from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('register/', index),
    path('<str:username>/',index)
]