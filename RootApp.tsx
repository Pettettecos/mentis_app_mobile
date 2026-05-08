import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import Main from './src/Main';
import { AppSplashScreen } from './src/components';
import paperTheme from './src/theme';
import { colors } from './src/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function RootApp() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Futuramente: carregar fontes, autenticação, configs etc.
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, []);

  const handleRootLayout = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.root} onLayout={handleRootLayout}>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <StatusBar style="dark" backgroundColor={colors.background} />

          {showSplash ? (
            <AppSplashScreen onFinish={handleSplashFinish} />
          ) : (
            <Main />
          )}
        </PaperProvider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
