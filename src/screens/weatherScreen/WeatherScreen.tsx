import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, Width} from '../../themes';
import Icon2 from 'react-native-vector-icons/Feather';
import {useStyles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectWeatherData,
  selectWeatherError,
  selectWeatherLoading,
} from '../redux/selector';
import {getWeatherData} from '../redux/thunks';
import {useTheme} from '../../context/useThemeContext';
import ModeTogglerButton from '../../ui/ModeTogglerButton';
import {SafeAreaView} from "react-native-safe-area-context";

export default function WeatherScreen() {
  const dispatch: any = useDispatch();
  const loading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);
  const weather = useSelector(selectWeatherData);
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [city, setCity] = useState('');

  useEffect(() => {
    const loadLastCity = async () => {
      try {
        const savedCity = await AsyncStorage.getItem('LAST_CITY_KEY');
        if (savedCity) {
          setCity(savedCity);
          dispatch(getWeatherData(savedCity));
        }
      } catch (loadError) {
        console.error('Failed to load last city:', loadError);
      }
    };

    loadLastCity();
  }, [dispatch]);

  useEffect(() => {
    if (weather && weather.name) {
      const saveCity = async () => {
        try {
          await AsyncStorage.setItem('LAST_CITY_KEY', weather.name);
        } catch (saveError) {
          console.error('Failed to save city:', saveError);
        }
      };

      saveCity();
    }
  }, [weather]);

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(getWeatherData(city.trim()));
    }
  };

  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Enter city name"
            placeholderTextColor="#999"
            style={styles.input}
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleSearch}
            testID="city-search"
          />
          <TouchableOpacity
            testID="search-button"
            style={styles.searchButton}
            onPress={handleSearch}>
            <Icon2 name="search" size={Width * 0.07} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.weatherWrapper}>
          {loading ? (
            <ActivityIndicator
              testID="loading-indicator"
              size="large"
              color={COLORS.primary}
            />
          ) : error ? (
            <Text style={styles.city}>Error: {error}</Text>
          ) : weather && weather.name ? (
            <>
              <View style={styles.weatherIconContainer}>
                {weather.weather && weather?.weather[0] && (
                  <>
                    <Image
                      source={{
                        uri: getWeatherIconUrl(weather.weather[0]?.icon),
                      }}
                      style={styles.weatherIcon}
                    />
                    <Text style={styles.weatherDescription}>
                      {weather.weather[0]?.description}
                    </Text>
                  </>
                )}
                <Text style={styles.temperature}>
                  {weather?.main?.temp ? `${weather.main.temp}°C` : '--'}
                </Text>
                <Text style={styles.city}>{weather.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    {weather?.main?.humidity
                      ? `${weather.main.humidity}%`
                      : '--'}
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
            <Text style={styles.city}>
              Search for a city to see the weather
            </Text>
          )}
        </View>
        <ModeTogglerButton />
      </View>
    </SafeAreaView>
  );
}
