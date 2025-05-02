import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
//   ActivityIndicator,
} from 'react-native';
import { COLORS, Width } from '../../themes';
import Icon2 from 'react-native-vector-icons/Feather';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectWeatherData,
  selectWeatherError,
  selectWeatherLoading,
} from '../redux/selector';
import { getWeatherData } from '../redux/thunks'; 

export default function WeatherCard() {
  const dispatch = useDispatch();
  const loading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);
  const weather = useSelector(selectWeatherData);

  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(getWeatherData(city.trim()));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Enter city name"
            placeholderTextColor="#999"
            style={styles.input}
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon2 name="search" size={Width * 0.07} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          {loading ? (
            // <ActivityIndicator size="large" color={COLORS.primary} />
            <View></View>
          ) : error ? (
            <Text style={styles.city}>Error: {error}</Text>
          ) : weather && weather.name ? (
            <>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={{
                    uri:
                      'https://cdn-icons-png.flaticon.com/512/1163/1163661.png',
                  }}
                  style={styles.weatherIcon}
                />
                <Text style={styles.temperature}>
                  {weather?.main?.temp ? `${weather.main.temp}°C` : '--'}
                </Text>
                <Text style={styles.city}>{weather.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    {weather?.main?.humidity ? `${weather.main.humidity}%` : '--'}
                  </Text>
                  <Text style={styles.infoText}>Humidity</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    {weather?.wind?.speed ? `${weather.wind.speed} km/h` : '--'}
                  </Text>
                  <Text style={styles.infoText}>Wind</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.city}>Search for a city to see the weather</Text>
          )}
        </View>
      </View>
    </View>
  );
}
