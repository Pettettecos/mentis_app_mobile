import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { managerService } from '@/services/api';
import type { ManagerDashboardMetrics } from '@/services/api';
import { ActiveUsersBarChart } from './components/ActiveUsersBarChart';
import { SentimentTrendChart } from './components/SentimentTrendChart';
import { styles } from './styles';
import { colors } from '../../../theme/colors';

const sentimentChartData = [
  { value: 115, frontColor: '#1186AC', spacing: 3 },
  { value: 77, frontColor: 'rgba(0, 100, 130, 0.6)', spacing: 3 },
  { value: 48, frontColor: 'rgba(0, 100, 130, 0.3)', spacing: 3 },
  { value: 29, frontColor: 'rgba(0, 105, 115, 0.4)', spacing: 12 },
  { value: 106, frontColor: '#1186AC', spacing: 3 },
  { value: 86, frontColor: 'rgba(0, 100, 130, 0.6)', spacing: 3 },
  { value: 67, frontColor: 'rgba(0, 100, 130, 0.3)', spacing: 3 },
  { value: 39, frontColor: 'rgba(0, 105, 115, 0.4)', spacing: 12 },
  { value: 144, frontColor: '#1186AC', spacing: 3 },
  { value: 115, frontColor: 'rgba(0, 100, 130, 0.6)', spacing: 3 },
  { value: 29, frontColor: 'rgba(0, 100, 130, 0.3)', spacing: 3 },
  { value: 19, frontColor: 'rgba(0, 105, 115, 0.4)', spacing: 12 },
  { value: 163, frontColor: '#1186AC', spacing: 3 },
  { value: 134, frontColor: 'rgba(0, 100, 130, 0.6)', spacing: 3 },
  { value: 19, frontColor: 'rgba(0, 100, 130, 0.3)', spacing: 3 },
  { value: 10, frontColor: 'rgba(0, 105, 115, 0.4)', spacing: 0 },
];

const maxSentimentValue = 170;

interface ManagerDashboardScreenProps {
  errorText?: string;
  headerBody?: string;
  headerTitle?: string;
  riskAlertsRoute?: string;
  reportRoute?: string | null;
}

export function ManagerDashboardScreen({
  errorText,
  headerBody,
  headerTitle,
  riskAlertsRoute = '/(protected)/(manager)/risk-alerts',
  reportRoute = '/(protected)/(manager)/report',
}: ManagerDashboardScreenProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<ManagerDashboardMetrics | null>(null);
  const [aiInsight, setAiInsight] = useState('');
  const [loading, setLoading] = useState(true);
  const [insightLoading, setInsightLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedActiveUserIndex, setSelectedActiveUserIndex] = useState<
    number | null
  >(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setInsightLoading(true);
    setError(false);

    try {
      const dashboardMetrics =
        await managerService.getManagerDashboardMetrics();
      setMetrics(dashboardMetrics);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }

    try {
      const response = await managerService.getManagerAIInsight();
      setAiInsight(response.insight);
    } catch {
      setAiInsight(t('managerDashboard.insightsFallback'));
    } finally {
      setInsightLoading(false);
    }
  }, [t]);

  useFocusEffect(
    useCallback(() => {
      void loadDashboard();
    }, [loadDashboard])
  );

  const activeUsersData = useMemo(
    () =>
      (metrics?.active_users_by_day ?? []).map((item) => ({
        value: item.value,
        frontColor: '#127680',
        label: item.label,
      })),
    [metrics?.active_users_by_day]
  );
  const activeUsersMaxValue = Math.max(
    1,
    ...activeUsersData.map((item) => item.value)
  );
  const healthIndex = metrics?.health_index ?? 0;
  const sentimentLegend = [
    { label: t('managerDashboard.sentimentLegendHappy'), color: '#1186AC' },
    {
      label: t('managerDashboard.sentimentLegendCalm'),
      color: 'rgba(0, 100, 130, 0.6)',
    },
    {
      label: t('managerDashboard.sentimentLegendTired'),
      color: 'rgba(0, 100, 130, 0.3)',
    },
    {
      label: t('managerDashboard.sentimentLegendStressed'),
      color: 'rgba(0, 105, 115, 0.4)',
    },
  ];
  const sentimentWeeks = [
    { label: t('managerDashboard.sentimentWeek1') },
    { label: t('managerDashboard.sentimentWeek2') },
    { label: t('managerDashboard.sentimentWeek3') },
    { label: t('managerDashboard.sentimentWeek4') },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: 20,
          paddingBottom: insets.bottom + 140,
        },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {headerTitle ?? t('managerDashboard.headerTitle')}
        </Text>
        <Text style={styles.headerBody}>
          {headerBody ?? t('managerDashboard.headerBody')}
        </Text>
      </View>

      {loading && (
        <Card style={styles.stateCard}>
          <Card.Content style={styles.stateContent}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.stateText}>
              {t('managerDashboard.loading')}
            </Text>
          </Card.Content>
        </Card>
      )}

      {error && (
        <Card style={styles.stateCard}>
          <Card.Content style={styles.stateContent}>
            <Text style={styles.stateText}>
              {errorText ?? t('managerDashboard.error')}
            </Text>
            <Button mode="contained" onPress={loadDashboard}>
              {t('managerDashboard.retry')}
            </Button>
          </Card.Content>
        </Card>
      )}

      <Card style={[styles.card, styles.topCard]}>
        <Card.Content style={[styles.cardContent, styles.topCardContent]}>
          <View style={styles.healthTitleGrid}>
            <Text style={styles.healthTitle}>
              {t('managerDashboard.healthTitle')}
            </Text>
            <View style={styles.heartIconBg}>
              <Icon
                source="heart-outline"
                size={30}
                color={colors.background}
              />
            </View>
          </View>
          <Text style={styles.healthIndexTotal}>
            <Text style={styles.healthIndex}>{healthIndex}</Text>/100
          </Text>
          <View style={styles.healthBar}>
            <LinearGradient
              colors={colors.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.healthValueBar,
                { width: `${Math.max(0, Math.min(100, healthIndex))}%` },
              ]}
            />
          </View>
          <Text style={styles.healthBody}>
            {t('managerDashboard.healthComparison')}
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.topCard]}>
        <Card.Content
          style={[
            styles.cardContent,
            styles.topCardContent,
            styles.usersCardContent,
          ]}
        >
          <View style={styles.cardTitleRow}>
            <View style={styles.usersIconBg}>
              <Icon source="account-group-outline" size={30} color="#0F5C69" />
            </View>
            <Text style={styles.cardTitle}>
              {t('managerDashboard.activeUsersTitle')}
            </Text>
          </View>

          <View style={styles.metricBlock}>
            <Text style={styles.metricValue}>
              {metrics?.active_users_total ?? 0}
            </Text>
            <Text style={styles.metricCaption}>
              {t('managerDashboard.activeUsersCaption', {
                percentage: metrics?.active_users_percentage ?? 0,
              })}
            </Text>
          </View>

          <View style={styles.chartContainer}>
            <ActiveUsersBarChart
              data={activeUsersData}
              maxValue={activeUsersMaxValue}
              selectedIndex={selectedActiveUserIndex}
              onSelect={(index) =>
                setSelectedActiveUserIndex((current) =>
                  current === index ? null : index
                )
              }
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.topCard]}>
        <Card.Content style={[styles.cardContent, styles.topCardContent]}>
          <View style={styles.cardTitleRow}>
            <View style={styles.alertIconBg}>
              <Icon source="alert-outline" size={30} color="#B10F14" />
            </View>
            <Text style={styles.cardTitle}>
              {t('managerDashboard.riskAlertsTitle')}
            </Text>
          </View>

          <View style={styles.metricBlock}>
            <Text style={styles.metricValue}>
              {String(metrics?.risk_alerts_count ?? 0).padStart(2, '0')}
            </Text>
            <Text style={styles.metricCaption}>
              {t('managerDashboard.riskAlertsCaption')}
            </Text>
          </View>

          <Button
            mode="contained-tonal"
            contentStyle={styles.alertButtonContent}
            labelStyle={styles.alertButtonLabel}
            style={styles.alertButton}
            onPress={() => router.push(riskAlertsRoute)}
          >
            {t('managerDashboard.riskAlertsButton')}
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.sentimentCard}>
        <View style={styles.sentimentHeader}>
          <View style={styles.sentimentHeaderText}>
            <Text style={styles.sentimentTitle}>
              {t('managerDashboard.sentimentTitle')}
            </Text>
            <Text style={styles.sentimentSubtitle}>
              {t('managerDashboard.sentimentSubtitle')}
            </Text>
          </View>

          <View style={styles.sentimentBadge}>
            <Text style={styles.sentimentBadgeText}>
              {t('managerDashboard.sentimentBadge')}
            </Text>
          </View>
        </View>

        <SentimentTrendChart
          data={sentimentChartData}
          legend={sentimentLegend}
          maxValue={maxSentimentValue}
          weeks={sentimentWeeks}
        />
      </View>

      <LinearGradient
        colors={['#8F3FF3', '#B04CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.4 }}
        style={styles.insightsCard}
      >
        <View style={styles.insightsGlow} />
        <View style={styles.insightsHeader}>
          <Icon source="creation-outline" size={14} color="#FFFFFF" />
          <Text style={styles.insightsEyebrow}>
            {t('managerDashboard.insightsTitle')}
          </Text>
        </View>

        {insightLoading ? (
          <View style={styles.insightsLoadingRow}>
            <ActivityIndicator color="#FFFFFF" />
            <Text style={styles.insightsBody}>
              {t('managerDashboard.insightsLoading')}
            </Text>
          </View>
        ) : (
          <Text style={styles.insightsBody}>{`"${aiInsight}"`}</Text>
        )}

        {reportRoute && (
          <Button
            mode="contained-tonal"
            contentStyle={styles.insightsButtonContent}
            labelStyle={styles.insightsButtonLabel}
            style={styles.insightsButton}
            onPress={() => router.push(reportRoute)}
          >
            {t('managerDashboard.insightsButton')}
          </Button>
        )}
      </LinearGradient>

      {(metrics?.department_usage ?? []).length > 0 && (
        <View style={styles.departmentCard}>
          <Text style={styles.departmentTitle}>
            {t('managerDashboard.departmentTitle')}
          </Text>

          <View style={styles.departmentList}>
            {(metrics?.department_usage ?? []).map((item) => (
              <View key={item.label} style={styles.departmentRow}>
                <Text style={styles.departmentLabel}>{item.label}</Text>
                <View style={styles.departmentTrack}>
                  <View
                    style={[
                      styles.departmentFill,
                      { width: `${Math.max(0, Math.min(100, item.value))}%` },
                    ]}
                  />
                </View>
                <Text style={styles.departmentValue}>{item.value}%</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
