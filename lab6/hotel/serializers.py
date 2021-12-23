from hotel.models import Hotel
from rest_framework import serializers


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ["pk", "name", "url", "imageSrc", "stars", "country_code"]