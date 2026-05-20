import { Slot, usePathname, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomNav } from '@/components';
import { EnterpriseTopBar } from '@/components/EnterpriseTopBar';

export default function EnterpriseLayout() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
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

  const isNewCompanyScreen = pathname.includes('new-company');
  const isDashboard = pathname === '/dashboard' || pathname === '/';

  return (
    <View style={styles.container}>
      <EnterpriseTopBar
        showTitle={!isDashboard && !isNewCompanyScreen}
        showLogout={!isNewCompanyScreen}
        showBackButtonRight={isNewCompanyScreen}
        onBackPress={() => router.back()}
      />
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
