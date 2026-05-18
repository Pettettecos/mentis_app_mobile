import { useState } from 'react';
import { Redirect } from 'expo-router';
import { AppSplashScreen } from '@/components';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <AppSplashScreen onFinish={handleSplashFinish} />;
  }

  return <Redirect href="/(auth)/login" />;
}
