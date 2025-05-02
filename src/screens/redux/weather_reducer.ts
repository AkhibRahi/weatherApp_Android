import action_types from './action_types';

const initialState = {
  weatherData: null,
  loading: false,
  error: null,
};

export default function weatherReducer(state = initialState, action: any) {
  switch (action.type) {
    case action_types.WEATHER_DATA_REQUEST:
      return {...state, loading: true, error: null};
    case action_types.WEATHER_DATA_RESPONSE:
      return {...state, loading: false, weatherData: action.payload};
    case action_types.WEATHER_DATA_ERROR:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}
