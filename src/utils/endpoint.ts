import Config from 'react-native-config';

const endpoints = {
  weatherBaseUrl: 'https://api.openweathermap.org/data/2.5',

  weather: (city: string, apiKey: string) =>
    `/weather?q=${city}&appid=${apiKey}&units=metric`,
};

export default endpoints;
