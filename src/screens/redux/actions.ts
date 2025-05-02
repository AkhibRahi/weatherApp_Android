import action_types from './action_types';

export const weatherDataRequest = () => ({
  type: action_types.WEATHER_DATA_REQUEST,
});

export const weatherDataResponse = (payload: any) => ({
  type: action_types.WEATHER_DATA_RESPONSE,
  payload,
});

export const weatherDataError = (payload: any) => ({
  type: action_types.WEATHER_DATA_ERROR,
  payload,
});
