import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(public)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
