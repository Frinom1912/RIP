from django.contrib import admin
from .models import Country, Hotel

admin.site.register(Hotel)
admin.site.register(Country)