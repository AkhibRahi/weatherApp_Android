import {StyleSheet} from 'react-native';
import {Width} from '../../themes';
import {ColorProps} from '../../themes/color';

export const useStyles = (colors: ColorProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    card: {
      flex: 2,
      flexDirection: 'column',
      backgroundColor: colors.background,
      padding: Width * 0.05,
      alignItems: 'center',
      elevation: 5,
    },
    searchRow: {
      flexDirection: 'row',
      // width: '100%',
      marginBottom: Width * 0.05,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      height: Width * 0.15,
      backgroundColor: '#f0f0f0',
      borderRadius: Width * 0.075,
      paddingHorizontal: Width * 0.05,
      marginRight: Width * 0.025,
      fontSize: Width * 0.05,
    },
    searchButton: {
      backgroundColor: '#fff',
      borderRadius: Width * 0.075,
      padding: Width * 0.0375,
      justifyContent: 'center',
      alignItems: 'center',
    },
    weatherWrapper: {flex: 1, justifyContent: 'space-evenly'},
    weatherIconContainer: {alignItems: 'center'},
    weatherIcon: {
      width: Width * 0.5,
      height: Width * 0.5,
      resizeMode: 'contain',
    },
    temperature: {
      fontSize: Width * 0.15,
      fontWeight: 'bold',
      color: colors.text,
    },
    city: {
      fontSize: Width * 0.09,
      color: colors.text1,
      marginBottom: Width * 0.0375,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Width * 0.9,
    },
    infoBox: {
      alignItems: 'center',
      flex: 1,
    },
    infoText: {
      fontSize: Width * 0.06,
      color: colors.text1,
      textAlign: 'center',
      marginTop: Width * 0.0125,
    },
    weatherDescription: {
      fontSize: 12,
      color: colors.text1,
      textAlign: 'center',
      marginTop: Width * 0.0125,
      // textTransform: 'capitalize',
    },
  });
