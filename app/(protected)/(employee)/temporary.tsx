import { Link } from 'expo-router';
import { View } from 'react-native';

export default function TemporaryEmployeeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/(protected)/(employee)/questionnaires">
        Go to questionnaires
      </Link>
      <Link href="/(protected)/(employee)/chat">Go to chat</Link>
    </View>
  );
}
