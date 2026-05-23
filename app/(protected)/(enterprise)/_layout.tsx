import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomNav, TopBar } from '@/components';

export default function EnterpriseLayout() {
  const { t } = useTranslation();
  const navItems = [
    {
      key: 'home',
      label: t('enterpriseDashboard.navHome'),
      icon: 'home-outline',
      activeIcon: 'home',
      route: '/dashboard',
      matches: ['/dashboard'],
    },
    {
      key: 'settings',
      label: t('enterpriseDashboard.navSettings'),
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
