from django.db import models


class Street(models.Model):
    name = models.CharField(max_length=256, verbose_name="Street name")
    city = models.CharField(max_length=256, verbose_name="Street city")
    def __str__(self):
        return self.name


class House(models.Model):
    name = models.CharField(max_length=256, verbose_name="House name")
    house_number = models.PositiveIntegerField(verbose_name="House number")
    num_of_citizens = models.PositiveIntegerField(verbose_name="House citizens")
    street_house = models.ForeignKey(
        Street,
        on_delete=models.SET_DEFAULT,
        null=True,
        default=None,
        related_name="houses"
    )

    def __str__(self):
        return self.name
