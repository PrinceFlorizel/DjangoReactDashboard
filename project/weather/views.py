import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import WeatherDataPoint

class WeatherList(APIView):
    def get(self, request, format=None):

        req_params = request.GET
        start_dt = req_params.get('min_date')
        end_dt = req_params.get('max_date')
        level = req_params.get('level')
        units = req_params.get('units')

        data_points = WeatherDataPoint.objects.all()
        df = pd.DataFrame(data_points.values())
        df['date'] = pd.to_datetime(df['date'])

        # Date range filter
        start_dt_default = pd.to_datetime('2015-10-01')
        end_dt_default = pd.to_datetime('2015-12-31')
        # Must have both start_dt and end_dt
        if start_dt and end_dt:
            start_dt = pd.to_datetime(start_dt)
            end_dt = pd.to_datetime(end_dt)
            # Date range must be valid
            if start_dt < end_dt:
                df = df.loc[(df['date']>=start_dt) & (df['date']<=end_dt), :]
            else:
                # Revert to default range
                df = df.loc[(df['date']>=start_dt_default) & (df['date']<=end_dt_default), :]
        else:
            # Revert to default range
            df = df.loc[(df['date']>=start_dt_default) & (df['date']<=end_dt_default), :]

        # Daily vs. monthly data
        if level and level=="m":
            df = self.__get_monthly_data(df)

        # Convert fo degrees F if needed
        if units == "f":
            df = self.__convert_c_to_f(df)

        return Response(df)

    def __get_monthly_data(self, df):
        df['date'] = df['date'].to_numpy().astype('datetime64[M]')
        df = df.groupby('date', as_index = False).agg(temp = ('temp', 'mean'))
        return df

    def __convert_c_to_f(self, df):
        df['temp'] = df['temp'] * 9/5 + 32
        return df
