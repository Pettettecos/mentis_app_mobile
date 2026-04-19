import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Main from './src/Main';

export default function RootApp() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="dark" backgroundColor="#fff" />
        <Main />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
