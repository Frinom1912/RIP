from django.contrib import admin
from django.urls import include, path
from hotel import views as hotel_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'hotel', hotel_views.HotelViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
]