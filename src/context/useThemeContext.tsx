// src/theme/ThemeProvider.tsx
import React, {useEffect, ReactNode, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useSystemTheme} from '../screens/redux/slices/themeSlices';
import {ColorProps, darkColors, lightColors} from '../themes';
import {RootState} from '../store/store';

type ThemeMode = 'light' | 'dark';

// interface ThemeColors {
//   [key: string]: string;
// }

interface ThemeContextType {
  colors: ColorProps;
  mode: ThemeMode;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// Create a ThemeContext to easily access colors throughout the app
export const ThemeContext = React.createContext<ThemeContextType>({
  colors: lightColors,
  mode: 'light',
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const dispatch = useDispatch();
  const {mode, isSystemTheme} = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const systemThemeAction = useSystemTheme();

  useEffect(() => {
    if (isSystemTheme && systemColorScheme) {
      dispatch(systemThemeAction);
    }
  }, [isSystemTheme, systemColorScheme, dispatch, systemThemeAction]);

  const themeColors = mode === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{colors: themeColors, mode}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => useContext(ThemeContext);
