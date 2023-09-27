from django.db import models

# Create your models here.
class WeatherDataPoint(models.Model):
    date = models.DateField()
    temp = models.FloatField()
