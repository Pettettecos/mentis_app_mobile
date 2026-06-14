import { Redirect } from 'expo-router';

import { getDashboardRoute } from '@/navigation/roleRoutes';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedIndex() {
  const { user } = useAuth();
  const dashboardRoute = getDashboardRoute(user?.role);

  if (dashboardRoute) {
    return <Redirect href={dashboardRoute} />;
  }

  return <Redirect href="/(protected)/home" />;
}
