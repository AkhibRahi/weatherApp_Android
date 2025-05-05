import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

const systemColorScheme = Appearance.getColorScheme() || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: systemColorScheme,
    isSystemTheme: true,
  },
  reducers: {
    toggleTheme: state => {
      state.isSystemTheme = false;
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLightTheme: state => {
      state.isSystemTheme = false;
      state.mode = 'light';
    },
    setDarkTheme: state => {
      state.isSystemTheme = false;
      state.mode = 'dark';
    },
    useSystemTheme: state => {
      state.isSystemTheme = true;
      state.mode = Appearance.getColorScheme() || 'light';
    },
  },
});

export const {toggleTheme, setLightTheme, setDarkTheme, useSystemTheme} =
  themeSlice.actions;
export default themeSlice.reducer;
