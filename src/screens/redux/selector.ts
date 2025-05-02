const selectWeatherData = (state: any) => state.weatherReducer.weatherData;
const selectWeatherLoading = (state: any) => state.weatherReducer.loading;
const selectWeatherError = (state: any) => state.weatherReducer.error;

export {selectWeatherData, selectWeatherLoading, selectWeatherError};
