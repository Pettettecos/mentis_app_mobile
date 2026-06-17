import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { managerService } from '@/services/api';
import type { ManagerRiskAlertItem } from '@/services/api';
import { colors } from '../../../theme/colors';
import { styles } from './styles';

function formatRiskAlertDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function ManagerRiskAlertsScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<ManagerRiskAlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadAlerts = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await managerService.getManagerRiskAlerts();
      setAlerts(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAlerts();
  }, [loadAlerts]);

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
        <IconButton
          icon="arrow-left"
          iconColor={colors.textPrimary}
          onPress={() => router.back()}
          size={24}
          style={styles.backButton}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>
            {t('managerDashboard.riskAlertsDetailsTitle')}
          </Text>
          <Text style={styles.subtitle}>
            {t('managerDashboard.riskAlertsDetailsBody')}
          </Text>
        </View>
      </View>

      <View style={styles.listCard}>
        {loading && (
          <View style={styles.stateContent}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.stateText}>
              {t('managerDashboard.loading')}
            </Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.stateContent}>
            <Text style={styles.stateText}>{t('managerDashboard.error')}</Text>
            <Button mode="contained" onPress={loadAlerts}>
              {t('managerDashboard.retry')}
            </Button>
          </View>
        )}

        {!loading && !error && alerts.length === 0 && (
          <View style={styles.stateContent}>
            <Text style={styles.stateText}>
              {t('managerDashboard.riskAlertsEmpty')}
            </Text>
          </View>
        )}

        {!loading && !error && alerts.length > 0 && (
          <View style={styles.list}>
            {alerts.map((alert) => (
              <View key={alert.id} style={styles.alertRow}>
                <View style={styles.alertTopRow}>
                  <View style={styles.alertBadge}>
                    <Text style={styles.alertBadgeText}>{alert.insight}</Text>
                  </View>
                </View>
                <Text style={styles.alertUser}>{alert.user_name}</Text>

                <Text style={styles.alertMeta}>
                  {t('managerDashboard.riskAlertsDepartment')}:{' '}
                  {alert.department}
                </Text>
                <Text style={styles.alertMeta}>
                  {t('managerDashboard.riskAlertsCreatedAt', {
                    date: formatRiskAlertDate(alert.created_at),
                  })}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
