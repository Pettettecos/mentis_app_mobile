import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button, Card, Icon, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { colors } from '@/theme/colors';

export function EmployeeDashboardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 100 },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.greetingSection}>
        <Text style={styles.greetingTitle}>
          {t('employeeDashboard.greetingTitle')}
        </Text>
        <Text style={styles.greetingSubtitle}>
          {t('employeeDashboard.greetingSubtitle')}
        </Text>
      </View>

      <Button
        mode="contained"
        icon={() => <Icon source="emoticon-happy-outline" size={28} color="#FFFFFF" />}
        onPress={() => {}}
        contentStyle={styles.checkinButtonContent}
        labelStyle={styles.checkinButtonLabel}
        style={styles.checkinButton}
      >
        {t('employeeDashboard.checkinButton')}
      </Button>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statCardContent}>
            <View style={[styles.statIconBg, styles.statIconBgGreen]}>
              <Icon source="calendar-check" size={20} color="#059669" />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>
              {t('employeeDashboard.consecutiveWeeks')}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statCardContent}>
            <View style={[styles.statIconBg, styles.statIconBgBlue]}>
              <Icon source="emoticon-excited-outline" size={20} color="#2563EB" />
            </View>
            <Text style={styles.statValue}>7.8</Text>
            <Text style={styles.statLabel}>
              {t('employeeDashboard.avgMood')}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statCardContent}>
            <View style={[styles.statIconBg, styles.statIconBgPurple]}>
              <Icon source="fire" size={20} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>84</Text>
            <Text style={styles.statLabel}>
              {t('employeeDashboard.activeDays')}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>
              {t('employeeDashboard.moodHistory')}
            </Text>
            <Text style={styles.chartBadge}>
              {t('employeeDashboard.last30Days')}
            </Text>
          </View>
          <View style={styles.chartPlaceholder}>
            <Icon source="chart-line" size={48} color={colors.iconMuted} />
            <Text style={styles.chartPlaceholderText}>
              {t('employeeDashboard.chartPlaceholder')}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>
          {t('employeeDashboard.aiInsights')}
        </Text>
        <View style={styles.insightItem}>
          <View style={styles.insightIcon}>
            <Icon source="trending-up" size={20} color={colors.success} />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>
              {t('employeeDashboard.insight1Title')}
            </Text>
            <Text style={styles.insightBody}>
              {t('employeeDashboard.insight1Body')}
            </Text>
          </View>
        </View>
        <View style={[styles.insightItem, styles.insightItemLast]}>
          <View style={styles.insightIcon}>
            <Icon source="lightbulb-on" size={20} color="#F59E0B" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>
              {t('employeeDashboard.insight2Title')}
            </Text>
            <Text style={styles.insightBody}>
              {t('employeeDashboard.insight2Body')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
