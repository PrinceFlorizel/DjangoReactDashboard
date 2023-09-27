# from rest_framework import routers
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from weather import views

# weather_list = views.WeatherViewSet.as_view({
#     'get': 'list'
# })

urlpatterns = [
    path('api/weather/', views.WeatherList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)