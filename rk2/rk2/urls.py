from django.contrib import admin
from django.urls import path, include
from houses import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="main"),
    path('house/', include([
        path('', views.read_house, name='read_house'),
        path('create/', views.create_house, name="create_house"),
        path('update/<int:house_id>/', views.update_house, name="update_house"),
        path('delete/<int:house_id>/', views.delete_house, name="delete_house"),
    ])),
    path('street_house/', include([
        path('', views.read_street_house, name='read_street_house'),
        path('create/', views.create_street_house, name="create_street_house"),
        path('update/<int:street_house_id>/',
             views.update_street_house, name="update_street_house"),
        path('delete/<int:street_house_id>/',
             views.delete_street_house, name="delete_street_house"),
    ])),
    path('report/', views.report, name="report"),
]
