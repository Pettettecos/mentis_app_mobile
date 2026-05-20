import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button, Card, Icon, Text, TouchableRipple } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { colors } from '@/theme/colors';
import { useRouter } from 'expo-router';

const mockCompanies = [
  { name: 'Luminal Solutions', type: 'Enterprise', employees: '1,200' },
  { name: 'Aether Tech', type: 'Startup', employees: '45' },
  { name: 'Global Dynamics', type: 'Global', employees: '15,000' },
];

export function EnterpriseDashboardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 100 },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('enterpriseDashboard.headerTitle')}
        </Text>
        <Text style={styles.headerBody}>
          {t('enterpriseDashboard.headerBody')}
        </Text>
      </View>

      <Button
        mode="contained"
        icon={() => <Icon source="store-plus" size={28} color="#FFFFFF" />}
        onPress={() => router.push('/(protected)/(enterprise)/new-company')}
        contentStyle={styles.createButtonContent}
        labelStyle={styles.createButtonLabel}
        style={styles.createButton}
      >
        {t('enterpriseDashboard.createCompany')}
      </Button>

      <Card style={styles.statCard}>
        <Card.Content>
          <View style={styles.statCardHeader}>
            <View style={[styles.statIconBg, styles.statIconBgBlue]}>
              <Icon source="office-building" size={24} color="#2563EB" />
            </View>
            <View style={styles.statGrowth}>
              <Icon source="trending-up" size={16} color={colors.success} />
              <Text style={styles.statGrowthText}>8%</Text>
            </View>
          </View>
          <Text style={styles.statLabel}>
            {t('enterpriseDashboard.registeredCompanies')}
          </Text>
          <Text style={styles.statValue}>142</Text>
          <Text style={styles.statCaption}>
            {t('enterpriseDashboard.vsLastMonth')}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.statCard}>
        <Card.Content>
          <View style={styles.statCardHeader}>
            <View style={[styles.statIconBg, styles.statIconBgPurple]}>
              <Icon source="account-group" size={24} color={colors.accent} />
            </View>
            <View style={styles.statGrowth}>
              <Icon source="trending-up" size={16} color={colors.success} />
              <Text style={styles.statGrowthText}>15%</Text>
            </View>
          </View>
          <Text style={styles.statLabel}>
            {t('enterpriseDashboard.activeUsers')}
          </Text>
          <Text style={styles.statValue}>12.840</Text>
          <Text style={styles.statCaption}>
            {t('enterpriseDashboard.vsLastMonth')}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.recentCard}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>
            {t('enterpriseDashboard.recentCompanies')}
          </Text>
          <TouchableRipple>
            <Text style={styles.recentSeeAll}>
              {t('enterpriseDashboard.seeAll')}
            </Text>
          </TouchableRipple>
        </View>
        {mockCompanies.map((company) => (
          <View key={company.name} style={styles.companyItem}>
            <View style={styles.companyLogo}>
              <Icon source="domain" size={22} color={colors.iconMuted} />
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.companyMeta}>
                {company.type} • {company.employees}{' '}
                {t('enterpriseDashboard.collaborators')}
              </Text>
            </View>
            <Icon source="chevron-right" size={20} color={colors.textMuted} />
          </View>
        ))}
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>
          {t('enterpriseDashboard.platformInsights')}
        </Text>
        <View style={styles.insightRow}>
          <View style={styles.insightLabelRow}>
            <Text style={styles.insightLabel}>
              {t('enterpriseDashboard.storageUsage')}
            </Text>
            <Text style={styles.insightValue}>64%</Text>
          </View>
          <View style={styles.insightTrack}>
            <View style={[styles.insightFill, { width: '64%' }]} />
          </View>
        </View>
        <View style={styles.insightRow}>
          <View style={styles.insightLabelRow}>
            <Text style={styles.insightLabel}>
              {t('enterpriseDashboard.apiRequests')}
            </Text>
            <Text style={styles.insightValue}>2.4M</Text>
          </View>
          <View style={styles.insightTrack}>
            <View style={[styles.insightFill, { width: '78%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.alertsCard}>
        <Text style={styles.alertsTitle}>
          {t('enterpriseDashboard.recentAlerts')}
        </Text>
        <View style={styles.alertItem}>
          <View style={styles.alertIcon}>
            <Icon
              source="alert-circle-outline"
              size={20}
              color={colors.error}
            />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>
              {t('enterpriseDashboard.licenseExpiring')}
            </Text>
            <Text style={styles.alertBody}>
              {t('enterpriseDashboard.licenseExpiringBody')}
            </Text>
          </View>
        </View>
        <View style={[styles.alertItem, styles.alertItemLast]}>
          <View style={styles.alertIcon}>
            <Icon
              source="information-outline"
              size={20}
              color={colors.primary}
            />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>
              {t('enterpriseDashboard.newRoleRequest')}
            </Text>
            <Text style={styles.alertBody}>
              {t('enterpriseDashboard.newRoleRequestBody')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
