import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { managerService } from '@/services/api';
import type { ManagerAIReportResponse, ReportCardBlock } from '@/services/api';
import { colors } from '../../../theme/colors';
import { styles } from './styles';

const cardLabelByVariant: Record<ReportCardBlock['variant'], string> = {
  action: 'Ação recomendada',
  attention: 'Ponto de atenção',
  positive: 'Sinal positivo',
  trend: 'Tendência',
};

export function ManagerAiReportScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [report, setReport] = useState<ManagerAIReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadReport = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await managerService.generateManagerAIReport();
      setReport(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReport();
  }, [loadReport]);

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
          <Text style={styles.title}>{t('managerDashboard.reportTitle')}</Text>
          <Text style={styles.subtitle}>
            {t('managerDashboard.reportBody')}
          </Text>
        </View>
      </View>

      <View style={styles.reportCard}>
        {loading && (
          <View style={styles.stateContent}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.stateText}>
              {t('managerDashboard.reportLoading')}
            </Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.stateContent}>
            <Text style={styles.stateText}>
              {t('managerDashboard.reportError')}
            </Text>
            <Button mode="contained" onPress={loadReport}>
              {t('managerDashboard.reportRetry')}
            </Button>
          </View>
        )}

        {!loading && !error && report && (
          <View style={styles.reportContent}>
            <Text style={styles.reportHeading}>{report.title}</Text>
            <Text style={styles.reportSummary}>{report.summary}</Text>

            {report.blocks.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <Text
                    key={`${block.type}-${index}`}
                    style={styles.reportText}
                  >
                    {block.text}
                  </Text>
                );
              }

              return (
                <View
                  key={`${block.type}-${block.variant}-${index}`}
                  style={styles.insightCard}
                >
                  <View style={styles.insightCardMetaRow}>
                    <Text
                      style={[
                        styles.insightCardLabel,
                        styles[`${block.variant}Label`],
                      ]}
                    >
                      {cardLabelByVariant[block.variant]}
                    </Text>
                  </View>
                  <View style={styles.insightCardText}>
                    <Text style={styles.insightCardTitle}>{block.title}</Text>
                    <Text style={styles.insightCardBody}>{block.body}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
