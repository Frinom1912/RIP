from rest_framework import viewsets
from hotel.models import Hotel
from hotel.serializers import HotelSerializer
from rest_framework import status
from rest_framework.response import Response

class HotelViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer  # Сериализатор для модели

    # def post(self, request):
    #     serializer = HotelSerializer(data=request.data)
    #     if serializer.is_valid():
    #       serializer.save()
    #       return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
    #     else:
    #       return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)