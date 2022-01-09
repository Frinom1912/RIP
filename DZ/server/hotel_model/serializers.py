from hotel_model.models import Country, Hotel
from rest_framework import serializers

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ("pk", "name")
        

class HotelSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Hotel.objects.create(**validated_data)
    country = CountrySerializer(source='country_code', required=False)
    class Meta:
        model = Hotel
        fields = ("pk", "name", "url", "imageSrc", "stars", "country_code", "country")
