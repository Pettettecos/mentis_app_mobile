import { Redirect } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import { getDashboardRoute } from '@/navigation/roleRoutes';

export default function ProtectedIndex() {
  const { user } = useAuth();
  const dashboardRoute = getDashboardRoute(user?.role);

  if (dashboardRoute) {
    return <Redirect href={dashboardRoute} />;
  }

  return <Redirect href="/(protected)/home" />;
}
