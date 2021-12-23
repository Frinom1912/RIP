from django.shortcuts import render
from datetime import date
from hotel.models import Hotel

def getHotels(request):
    return render(request, 'hotels/hotels.html', {'data' : {
        'current_date': date.today(),
        'hotels': Hotel.objects.all()
    }})

def getHotelById(request, id):
    return render(request, 'hotels/hotel.html', {'data' : {
        'current_date': date.today(),
        'hotel': Hotel.objects.filter(id=id)[0]
    }})