from django.contrib import admin
from django.urls import path
from hotel import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.getHotels),
    path('hotel/<int:id>/', views.getHotelById, name='hotel_url'),
]
