from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'Country'


class Hotel(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=999, blank=True, null=True)
    imageSrc = models.CharField(max_length=999, blank=True, null=True)
    stars = models.IntegerField(blank=True, null=True)
    country_code = models.ForeignKey(Country, on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'Hotel'