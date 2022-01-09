from django.contrib import admin
from django.urls import include, path
from hotel_model import views as hotel_views
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'hotel', hotel_views.HotelView)
# router.register(r'country', hotel_views.CountryView)

urlpatterns = [
    path('country/', hotel_views.CountryView.as_view()),
    path('country/<int:pk>', hotel_views.SingleCountryView.as_view()),

    path('hotel/', hotel_views.HotelView.as_view()),
    path('hotel/<int:pk>', hotel_views.SingleHotelView.as_view()),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls)
]