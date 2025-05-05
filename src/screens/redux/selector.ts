import {RootState} from '../../store/store';

const selectWeatherData = (state: RootState) =>
  state.weatherReducer.weatherData;
const selectWeatherLoading = (state: RootState) => state.weatherReducer.loading;
const selectWeatherError = (state: RootState) => state.weatherReducer.error;

export {selectWeatherData, selectWeatherLoading, selectWeatherError};
