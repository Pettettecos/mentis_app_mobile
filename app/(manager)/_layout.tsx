import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomNav, TopBar } from '../../src/components';

export default function ManagerLayout() {
  const { t } = useTranslation();
  const navItems = [
    {
      key: 'dashboard',
      label: t('managerDashboard.navDashboard'),
      icon: 'view-dashboard-outline',
      activeIcon: 'view-dashboard',
      route: '/dashboard',
      matches: ['/dashboard'],
    },
    {
      key: 'users',
      label: t('managerDashboard.navUsers'),
      icon: 'account-group-outline',
      activeIcon: 'account-group',
      route: '/users',
      matches: ['/users'],
    },
    {
      key: 'settings',
      label: t('managerDashboard.navSettings'),
      icon: 'cog-outline',
      activeIcon: 'cog',
      route: '/settings',
      matches: ['/settings'],
    },
  ];

  return (
    <View style={styles.container}>
      <TopBar />
      <Slot />
      <BottomNav items={navItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6FAFD',
    flex: 1,
    position: 'relative',
  },
});
