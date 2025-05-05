// __tests__/WeatherScreen.test.tsx

import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import WeatherScreen from '../src/screens/weatherScreen/WeatherScreen';
import * as thunkActions from '../src/screens/redux/thunks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as selectors from '../src/screens/redux/selector';
// import * as reactReduxModule from 'react-redux';

// Define proper type for useSelector
// type UseSelector = typeof reactReduxModule.useSelector;
// type UseDispatch = typeof reactReduxModule.useDispatch;

const mockUseSelector = jest.fn();
// const mockUseDispatch = jest.fn();
const mockDispatch = jest.fn();
const mockThunk = jest.fn();

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: 'NavigationContainer',
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(fn => mockUseSelector(fn)),
  useDispatch: () => mockDispatch,
}));

jest.mock('react-native-vector-icons/Feather', () => 'Feather');

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve(null)),
  multiRemove: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('../src/screens/redux/selector', () => ({
  selectWeatherData: jest.fn(),
  selectWeatherError: jest.fn(),
  selectWeatherLoading: jest.fn(),
}));

jest.mock('../src/ui/ModeTogglerButton', () => 'ModeTogglerButton');

// jest.mock('../../context/useThemeContext', () => ({
//   useTheme: () => ({
//     colors: {
//       background: '#fff',
//       text: '#000',
//     },
//   }),
// }));

// Mock Redux
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

// Type the mock getWeatherData function
jest.mock('../src/screens/redux/thunks', () => ({
  getWeatherData: jest.fn().mockImplementation(() => mockThunk),
}));

describe('WeatherScreen', () => {
  // Define proper types for the weather data
  interface WeatherData {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }

  const mockWeatherData: WeatherData = {
    name: 'London',
    main: {
      temp: 20,
      humidity: 70,
    },
    weather: [
      {
        description: 'Sunny',
        icon: '01d',
      },
    ],
    wind: {
      speed: 5,
    },
  };

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Default behavior for mockUseSelector
    mockUseSelector.mockImplementation((selector: Function) => {
      if (selector === selectors.selectWeatherData) return null;
      if (selector === selectors.selectWeatherLoading) return false;
      if (selector === selectors.selectWeatherError) return null;
      return null;
    });

    // Reset AsyncStorage mocks
    (AsyncStorage.getItem as jest.Mock).mockReset();
    (AsyncStorage.setItem as jest.Mock).mockReset();
  });

  it('should load last city from AsyncStorage on mount', async () => {
    // Setup AsyncStorage to return a saved city
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Berlin');

    render(<WeatherScreen />);

    // Wait for useEffect to run
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('LAST_CITY_KEY');
      expect(thunkActions.getWeatherData).toHaveBeenCalledWith('Berlin');
      expect(mockDispatch).toHaveBeenCalledWith(mockThunk);
    });
  });

  it('should update city input and trigger search on submit', () => {
    const {getByTestId} = render(<WeatherScreen />);
    const input = getByTestId('city-search');

    // Simulate typing
    fireEvent.changeText(input, 'London');

    // Simulate submit
    fireEvent(input, 'submitEditing');

    expect(thunkActions.getWeatherData).toHaveBeenCalledWith('London');
    expect(mockDispatch).toHaveBeenCalledWith(mockThunk);
  });

  it('should update city input and trigger search on button press', () => {
    const {getByTestId} = render(<WeatherScreen />);
    const input = getByTestId('city-search');
    const searchButton = getByTestId('search-button');

    // Simulate typing
    fireEvent.changeText(input, 'Paris');

    // Simulate button press
    fireEvent.press(searchButton);

    expect(thunkActions.getWeatherData).toHaveBeenCalledWith('Paris');
    expect(mockDispatch).toHaveBeenCalledWith(mockThunk);
  });

  it('should not search if city input is empty', () => {
    const {getByTestId} = render(<WeatherScreen />);
    const input = getByTestId('city-search');
    const searchButton = getByTestId('search-button');

    // Simulate typing empty string
    fireEvent.changeText(input, '  ');

    // Simulate button press
    fireEvent.press(searchButton);

    expect(thunkActions.getWeatherData).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should display loading indicator when loading weather data', () => {
    // Mock loading state
    mockUseSelector.mockImplementation((selector: Function) => {
      if (selector === selectors.selectWeatherLoading) return true;
      return null;
    });

    const {getByTestId} = render(<WeatherScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should display error message when there is an error', () => {
    // Mock error state
    mockUseSelector.mockImplementation((selector: Function) => {
      if (selector === selectors.selectWeatherError) return 'City not found';
      return null;
    });

    const {getByText} = render(<WeatherScreen />);

    expect(getByText('Error: City not found')).toBeTruthy();
  });

  it('should display weather data correctly', () => {
    // Mock weather data state
    mockUseSelector.mockImplementation((selector: Function) => {
      if (selector === selectors.selectWeatherData) return mockWeatherData;
      return null;
    });

    const {getByText} = render(<WeatherScreen />);

    expect(getByText('London')).toBeTruthy();
    expect(getByText('20°C')).toBeTruthy();
    expect(getByText('Sunny')).toBeTruthy();
    expect(getByText('70%')).toBeTruthy();
    expect(getByText('5 km/h')).toBeTruthy();
  });

  it('should save city to AsyncStorage when weather data is received', async () => {
    // Mock weather data state
    mockUseSelector.mockImplementation((selector: Function) => {
      if (selector === selectors.selectWeatherData) return mockWeatherData;
      return null;
    });

    render(<WeatherScreen />);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'LAST_CITY_KEY',
        'London',
      );
    });
  });

  it('should display initial message when no weather data is available', () => {
    const {getByText} = render(<WeatherScreen />);

    expect(getByText('Search for a city to see the weather')).toBeTruthy();
  });
});
