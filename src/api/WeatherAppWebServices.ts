import {HttpClient} from './http_client';
import Config from 'react-native-config';

console.log(Config);
export default class WeatherWebServices extends HttpClient {
  private static classInstance?: WeatherWebServices;

  constructor(baseURL: string) {
    super(baseURL);
  }

  public static getInstance(baseURL: string) {
    if (!this.classInstance) {
      this.classInstance = new WeatherWebServices(baseURL);
    }

    return this.classInstance;
  }

  public getWeather(city: string) {
    const apiKey = Config.OPENWEATHER_API_KEY;
    return new Promise((resolve, reject) => {
      this.instance
        .get(`/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
          console.info(`Weather Data: ${JSON.stringify(response)}`);
          resolve(response);
        })
        .catch(error => {
          console.error(`Weather API Error: ${error}`);
          reject(error);
        });
    });
  }
}
