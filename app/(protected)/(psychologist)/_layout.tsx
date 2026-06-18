import { Redirect, Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { TopBar } from '@/components';
import { useAuth } from '@/context/AuthContext';

export default function PsychologistLayout() {
  const { user } = useAuth();

  if (user?.role !== 'PSYCHOLOGIST') {
    return <Redirect href="/(protected)/home" />;
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6FAFD',
    flex: 1,
  },
});
