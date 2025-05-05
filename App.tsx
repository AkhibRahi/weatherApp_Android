import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigations/mainNavigation/MainNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {ThemeProvider} from './src/context/useThemeContext';
import Config from 'react-native-config';

console.log(Config);
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
