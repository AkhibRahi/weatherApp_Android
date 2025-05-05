// __tests__/ModeTogglerButton.test.tsx

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ModeTogglerButton from '../src/ui/ModeTogglerButton';
import {toggleTheme} from '../src/screens/redux/slices/themeSlices';

// Mock the toggleTheme action
jest.mock('../src/screens/redux/slices/themeSlices', () => ({
  toggleTheme: jest.fn().mockReturnValue({type: 'theme/toggleTheme'}),
}));

// Mock the vector icons
jest.mock('react-native-vector-icons/Feather', () => 'Feather');
jest.mock('react-native-vector-icons/Octicons', () => 'Octicons');

// Mock Redux hooks
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn().mockImplementation(() => {
    // We'll control this in our tests
    return {mode: 'light'};
  }),
}));

describe('ModeTogglerButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch toggleTheme when pressed', () => {
    // Render the component
    const {getByTestId} = render(<ModeTogglerButton />);

    // Press the button
    fireEvent.press(getByTestId('theme-toggle-button'));

    // Verify that toggleTheme was called and dispatched
    expect(toggleTheme).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({type: 'theme/toggleTheme'});
  });

  it('should show different icons based on theme mode', () => {
    // First test with light mode
    const useSelector = require('react-redux').useSelector;

    // Mock light mode
    useSelector.mockReturnValue({mode: 'light'});
    const lightResult = render(<ModeTogglerButton />);

    // In light mode, expect the moon icon to be rendered
    expect(
      lightResult.UNSAFE_getByType(
        require('react-native-vector-icons/Feather'),
      ),
    ).toBeTruthy();
    expect(lightResult.UNSAFE_queryByType(require('react-native-vector-icons/Octicons'))).toBeNull();

    // Cleanup
    lightResult.unmount();

    // Mock dark mode
    useSelector.mockReturnValue({mode: 'dark'});
    const darkResult = render(<ModeTogglerButton />);

    // In dark mode, expect the sun icon to be rendered
    expect(
      darkResult.UNSAFE_getByType(require('react-native-vector-icons/Octicons'))
    ).toBeTruthy();
    expect(darkResult.UNSAFE_queryByType(require('react-native-vector-icons/Feather'))).toBeNull();
  });

  it('should have correct styles', () => {
    const {getByTestId} = render(<ModeTogglerButton />);
    const button = getByTestId('theme-toggle-button');

    // Check that the button has expected styles
    expect(button.props.style).toMatchObject({
      marginVertical: 10,
      alignSelf: 'flex-end',
    });
  });
});
