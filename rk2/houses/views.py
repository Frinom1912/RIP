from django.db.models.aggregates import Sum
from django.http.response import HttpResponse
from django.shortcuts import get_list_or_404, get_object_or_404, redirect, render
from .models import Street, House
from django.db import models


def index(request):
    return render(request, 'index.html')

# houses


def read_house(request):
    houses = House.objects.all()
    return render(request, 'house/house_list.html', {'houses': houses})


def create_house(request):
    if request.method == 'GET':
        street_houses = Street.objects.all()
        return render(request, 'house/create_house.html', {"street_houses": street_houses})
    else:
        dto = {}
        for key in request.POST:
            if key in House.__dict__:
                dto[key] = request.POST[key]
        dto['street_house'] = get_object_or_404(Street, pk=request.POST['street_house'])
        new_house = House(**dto)
        new_house.save()
        return redirect('read_house')


def update_house(request, house_id):
    if request.method == 'GET':
        street_houses = Street.objects.all()
        house = get_object_or_404(House, pk=house_id)
        return render(request, 'house/update_house.html', {"house": house, "street_houses": street_houses})
    else:
        house = get_object_or_404(House, pk=house_id)
        for key in request.POST:
            if key in house.__dict__ and key != 'street_house':
                setattr(house, key, request.POST[key]) 
        if 'street_house' in request.POST:
            setattr(house, 'street_house', get_object_or_404(
                Street, pk=request.POST['street_house']))
        house.save()
        return redirect('read_house')


def delete_house(request, house_id):
    house = get_object_or_404(House, pk=house_id)
    house.delete()
    return redirect(request.META.get('HTTP_REFERER'))

# street_houses


def read_street_house(request):
    street_houses = Street.objects.all()
    return render(request, 'street_house/street_house_list.html', {'street_houses': street_houses})


def create_street_house(request):
    if request.method == 'GET':
        return render(request, 'street_house/create_street_house.html')
    else:
        dto = {}
        for key in request.POST:
            if key in Street.__dict__:
                dto[key] = request.POST[key]
        new_street_house = Street(**dto)
        new_street_house.save()
        return redirect('read_street_house')


def update_street_house(request, street_house_id):
    if request.method == 'GET':
        street_house = get_object_or_404(Street, pk=street_house_id)
        return render(request, 'street_house/update_street_house.html', {"street_house": street_house})
    else:
        street_house = get_object_or_404(Street, pk=street_house_id)
        for key in request.POST:
            if key in street_house.__dict__:
                setattr(street_house, key, request.POST[key])
        street_house.save()
        return redirect('read_street_house')


def delete_street_house(request, street_house_id):
    street_house = get_object_or_404(Street, pk=street_house_id)
    street_house.delete()
    return redirect(request.META.get('HTTP_REFERER'))


# REPORT


def report(request):
    sortet_streets = Street.objects.order_by("name")
    num_of_citizens = []
    for street_house in Street.objects.all():
        num_of_citizens.append({"street_house": street_house,  "num_of_citizens": House.objects.filter(
            street_house=street_house.pk).aggregate(Sum('num_of_citizens'))['num_of_citizens__sum']})
    return render(request, 'report.html', {"sortet_streets": sortet_streets, "num_of_citizens": sorted(num_of_citizens, key=lambda A: -1*A['num_of_citizens'])})
