import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appRoutes from '../../utils/appRoutes';
import WeatherScreen from '../../screens/weatherScreen/WeatherScreen';


const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={appRoutes.WeatherScreen}
        component={WeatherScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
