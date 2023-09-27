from weather.models import WeatherDataPoint

def run():
    WeatherDataPoint.objects.all().delete()