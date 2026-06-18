import { Redirect, Slot } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { BottomNav, TopBar } from '@/components';
import { useAuth } from '@/context/AuthContext';

export default function PsychologistLayout() {
  const { t } = useTranslation();
  const { user } = useAuth();

  if (user?.role !== 'PSYCHOLOGIST') {
    return <Redirect href="/(protected)" />;
  }

  const navItems = [
    {
      key: 'dashboard',
      label: t('psychologistDashboard.navDashboard'),
      icon: 'view-dashboard-outline',
      activeIcon: 'view-dashboard',
      route: '/(protected)/(psychologist)/dashboard',
      matches: ['/dashboard', '/(protected)/(psychologist)/dashboard'],
    },
    {
      key: 'questionnaires',
      label: t('psychologistDashboard.navQuestionnaires'),
      icon: 'clipboard-text-outline',
      activeIcon: 'clipboard-text',
      route: '/(protected)/(psychologist)/questionnaires',
      matches: [
        '/questionnaires',
        '/(protected)/(psychologist)/questionnaires',
      ],
    },
    {
      key: 'appointments',
      label: t('psychologistDashboard.navAppointments'),
      icon: 'calendar-blank-outline',
      activeIcon: 'calendar-blank',
      route: '/(protected)/(psychologist)/appointments',
      matches: ['/appointments', '/(protected)/(psychologist)/appointments'],
    },
    {
      key: 'settings',
      label: t('psychologistDashboard.navSettings'),
      icon: 'cog-outline',
      activeIcon: 'cog',
      route: '/(protected)/(psychologist)/settings',
      matches: ['/settings', '/(protected)/(psychologist)/settings'],
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
