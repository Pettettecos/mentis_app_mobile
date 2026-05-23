import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { AppSplashScreen } from '../src/components';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (splashVisible || loading) {
    return <AppSplashScreen onFinish={() => {}} />;
  }

  return <Redirect href={user ? '/(protected)' : '/(public)/login'} />;
}
