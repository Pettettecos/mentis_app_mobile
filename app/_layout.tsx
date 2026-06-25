import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { AuthProvider } from '@/context/AuthContext';
import { getInitialLanguage } from '@/i18n';
import paperTheme from '@/theme';
import { useEffect, useState } from 'react';
import i18n from '@/i18n';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const lang = await getInitialLanguage();
      await i18n.changeLanguage(lang);
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <StatusBar style="dark" />
          <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
