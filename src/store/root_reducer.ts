import weatherReducer from '../screens/redux/weather_reducer';
import themeReducer from '../screens/redux/slices/themeSlices';

const rootReducer = {
  weatherReducer: weatherReducer,
  theme: themeReducer,
};

export default rootReducer;
