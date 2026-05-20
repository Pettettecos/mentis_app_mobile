import { Redirect } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function ProtectedIndex() {
  const { user } = useAuth();

  if (user?.role === 'MANAGER') {
    return <Redirect href="/(protected)/(manager)/dashboard" />;
  }

  return <Redirect href="/(protected)/home" />;
}
