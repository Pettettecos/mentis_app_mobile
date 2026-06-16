import { View, ActivityIndicator, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button, Card, Icon, Text, TouchableRipple } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import { adminService } from '@/services/api';
import type { AdminDashboardMetrics } from '@/services/api';

export function AdminDashboardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminDashboardMetrics | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await adminService.getAdminDashboard();
      setData(result);
    } catch {
      // Em caso de erro, mantém null e mostra mensagem
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingCenter]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const sponsorsCount = data?.total_sponsors ?? 0;
  const activeUsers = data?.total_active_users ?? 0;
  const totalUsers = data?.total_users ?? 0;
  const recentCompanies = data?.recent_sponsors ?? [];

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
          {t('adminDashboard.headerTitle')}
        </Text>
        <Text style={styles.headerBody}>{t('adminDashboard.headerBody')}</Text>
      </View>

      <Button
        mode="contained"
        icon={() => <Icon source="store-plus" size={28} color="#FFFFFF" />}
        onPress={() => router.push('/(protected)/(admin)/new-company')}
        contentStyle={styles.createButtonContent}
        labelStyle={styles.createButtonLabel}
        style={styles.createButton}
      >
        {t('adminDashboard.createCompany')}
      </Button>

      <Card style={styles.statCard}>
        <Card.Content>
          <View style={styles.statCardHeader}>
            <View style={[styles.statIconBg, styles.statIconBgBlue]}>
              <Icon source="office-building" size={24} color="#2563EB" />
            </View>
            <View style={styles.statGrowth}>
              <Icon source="trending-up" size={16} color={colors.success} />
              <Text style={styles.statGrowthText}>
                {totalUsers > 0
                  ? Math.round((sponsorsCount / totalUsers) * 100)
                  : 0}
                %
              </Text>
            </View>
          </View>
          <Text style={styles.statLabel}>
            {t('adminDashboard.registeredCompanies')}
          </Text>
          <Text style={styles.statValue}>{sponsorsCount}</Text>
          <Text style={styles.statCaption}>
            {t('adminDashboard.vsLastMonth')}
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
              <Text style={styles.statGrowthText}>
                {totalUsers > 0
                  ? Math.round((activeUsers / totalUsers) * 100)
                  : 0}
                %
              </Text>
            </View>
          </View>
          <Text style={styles.statLabel}>
            {t('adminDashboard.activeUsers')}
          </Text>
          <Text style={styles.statValue}>{activeUsers.toLocaleString()}</Text>
          <Text style={styles.statCaption}>
            {t('adminDashboard.vsLastMonth')}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.recentCard}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>
            {t('adminDashboard.recentCompanies')}
          </Text>
          <TouchableRipple>
            <Text style={styles.recentSeeAll}>
              {t('adminDashboard.seeAll')}
            </Text>
          </TouchableRipple>
        </View>
        {recentCompanies.length === 0 ? (
          <Text style={styles.emptyText}>
            {t('adminDashboard.noCompanies')}
          </Text>
        ) : (
          recentCompanies.map((company) => (
            <View key={company.id} style={styles.companyItem}>
              <View style={styles.companyLogo}>
                {company.logo ? (
                  <Image
                    source={{ uri: `data:image/png;base64,${company.logo}` }}
                    style={styles.companyLogoImage}
                  />
                ) : (
                  <Icon source="domain" size={22} color={colors.iconMuted} />
                )}
              </View>
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{company.name}</Text>
                <Text style={styles.companyMeta}>
                  {new Date(company.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Icon source="chevron-right" size={20} color={colors.textMuted} />
            </View>
          ))
        )}
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>
          {t('adminDashboard.platformInsights')}
        </Text>
        <View style={styles.insightRow}>
          <View style={styles.insightLabelRow}>
            <Text style={styles.insightLabel}>
              {t('adminDashboard.storageUsage')}
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
              {t('adminDashboard.apiRequests')}
            </Text>
            <Text style={styles.insightValue}>2.4M</Text>
          </View>
          <View style={styles.insightTrack}>
            <View style={[styles.insightFill, { width: '78%' }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
