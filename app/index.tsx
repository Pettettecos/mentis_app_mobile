import { Redirect } from 'expo-router';
import { AppSplashScreen } from '../src/components';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppSplashScreen onFinish={() => {}} />;
  }

  return <Redirect href={user ? '/(protected)' : '/(public)/login'} />;
}
