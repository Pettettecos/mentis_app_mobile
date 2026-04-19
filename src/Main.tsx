import { StyleSheet, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientText } from './components/GradientText';

export default function App() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
        },
      ]}
    >
      <GradientText
        text="MentisTech"
        style={[styles.title, { fontWeight: '700' }]}
      />

      <View style={[styles.divider, { backgroundColor: colors.secondary }]} />

      <Text variant="bodyMedium" style={styles.subtitle}>
        Evolução começa pela mente.
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        contentStyle={styles.buttonContent}
        onPress={() => undefined}
      >
        Iniciar Evolução
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  divider: {
    height: 4,
    width: 60,
    borderRadius: 2,
    marginVertical: 12,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
