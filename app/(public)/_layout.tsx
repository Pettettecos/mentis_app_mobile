import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function PublicLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Redirect href="/(protected)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
