from hotel_model.models import Country, Hotel
from hotel_model.serializers import CountrySerializer, HotelSerializer
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

class CountryView(ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class SingleCountryView(RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class HotelView(ListAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def post(self, request):
        country = request.data
        serializer = HotelSerializer(data=country)
        if serializer.is_valid(raise_exception=True):
            article_saved = serializer.save()
        return Response({"success": "Article '{}' created successfully".format(article_saved.name)})

class SingleHotelView(RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer