import { MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';

const paperTheme = {
  ...MD3LightTheme,
  version: 3 as const,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,

    background: colors.background,
    surface: colors.surface,

    onPrimary: '#FFFFFF',
  },
  roundness: 10,
};

export default paperTheme;
