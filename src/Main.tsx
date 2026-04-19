import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import paperTheme from './theme';
import { LoginScreen } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">{(props) => <LoginScreen />}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
