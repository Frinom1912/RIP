from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    stars = models.IntegerField(blank=True, null=True)
    country_code = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Hotel'