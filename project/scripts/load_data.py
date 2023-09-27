# Load data from csv file to Django model

import pandas as pd
from weather.models import WeatherDataPoint

def run():
    df = pd.read_csv('data_raw/seattle-weather.csv')
    df['temp'] = (df['temp_min'] + df['temp_max']) / 2
    df = df.loc[:, ['date', 'temp']]

    data = df.to_dict('records')

    for item in data:
        data_point = WeatherDataPoint(**item)
        data_point.save()
