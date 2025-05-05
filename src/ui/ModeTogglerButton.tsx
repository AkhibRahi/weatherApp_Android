// src/components/ModeTogglerButton.tsx
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../screens/redux/slices/themeSlices';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

const ModeTogglerButton = () => {
  const dispatch = useDispatch();
  const {mode} = useSelector((state: any) => state.theme);

  const styles = StyleSheet.create({
    switchContainer: {
      marginVertical: 10,
      alignSelf: 'flex-end',
    },
  });

  return (
    <TouchableOpacity
      style={styles.switchContainer}
      onPress={() => dispatch(toggleTheme())}
      testID="theme-toggle-button">
      {mode === 'dark' ? (
        <Octicons testID="sun-icon" name="sun" color="#fff" size={24} />
      ) : (
        <Feather testID="moon-icon" name="moon" color="#000" size={24} />
      )}
    </TouchableOpacity>
  );
};

export default ModeTogglerButton;
