import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  weatherDataRequest,
  weatherDataResponse,
  weatherDataError,
} from './actions';
import endpoints from '../../utils/endpoint';
import WeatherWebServices from '../../api/WeatherAppWebServices';

export const getWeatherData = createAsyncThunk<void, string>(
  '/weather/get',
  async (city, {dispatch}) => {
    try {
      dispatch(weatherDataRequest());

      const baseUrl = endpoints.weatherBaseUrl;

      const response = await WeatherWebServices.getInstance(baseUrl).getWeather(
        city,
      );
      if (!response) {
        dispatch(weatherDataError('No weather data received'));
        return;
      }

      dispatch(weatherDataResponse(response));
    } catch (error: any) {
      dispatch(weatherDataError(error?.response?.data?.message));
    }
  },
);
