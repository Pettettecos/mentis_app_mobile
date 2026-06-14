import { Redirect } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import { getDashboardRoute } from '@/navigation/roleRoutes';
import { EmployeeHomeScreen } from '@/screens';

export default function HomeScreen() {
  const { user } = useAuth();
  const dashboardRoute = getDashboardRoute(user?.role);

  if (dashboardRoute) {
    return <Redirect href={dashboardRoute} />;
  }

  return <EmployeeHomeScreen />;
}
