import { Redirect, Stack, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();

  const needsPasswordReset = user?.tasks.includes('resetPassword') ?? false;
  const isResetPasswordRoute =
    segments[segments.length - 1] === 'reset-password';

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(public)/login" />;
  }

  if (needsPasswordReset && !isResetPasswordRoute) {
    return <Redirect href="/(protected)/reset-password" />;
  }

  if (!needsPasswordReset && isResetPasswordRoute) {
    return <Redirect href="/(protected)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
