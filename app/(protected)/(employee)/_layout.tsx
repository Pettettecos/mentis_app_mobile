import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomNav, TopBar } from '@/components';

export default function EmployeeLayout() {
  const { t } = useTranslation();
  const navItems = [
    {
      key: 'home',
      label: t('employeeDashboard.navHome'),
      icon: 'home-outline',
      activeIcon: 'home',
      route: '/dashboard',
      matches: ['/dashboard'],
    },
    {
      key: 'journey',
      label: t('employeeDashboard.navJourney'),
      icon: 'map',
      activeIcon: 'map',
      route: '/questionnaires',
      matches: ['/questionnaires'],
    },
    {
      key: 'support',
      label: t('employeeDashboard.navSupport'),
      icon: 'brain',
      activeIcon: 'brain',
      route: '/chat',
      matches: ['/chat'],
    },
    {
      key: 'settings',
      label: t('employeeDashboard.navSettings'),
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
    backgroundColor: '#F6F9FC',
    flex: 1,
    position: 'relative',
  },
});
