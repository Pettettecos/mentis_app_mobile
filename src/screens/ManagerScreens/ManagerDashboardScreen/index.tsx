import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Button, Card, Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActiveUsersBarChart } from './components/ActiveUsersBarChart';
import { SentimentTrendChart } from './components/SentimentTrendChart';
import { styles } from './styles';
import { colors } from '../../../theme/colors';

const activeUsersValues = [22, 34, 31, 47, 55];

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
const activeUsersMaxValue = 60;
const mockAiInsight =
  "A equipe apresenta sinais de fadiga digital nas tardes de quarta-feira. Sugerimos implementar o 'Foco Silencioso' pós-almoço para reduzir o estresse cognitivo.";

export function ManagerDashboardScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedActiveUserIndex, setSelectedActiveUserIndex] = useState<
    number | null
  >(null);
  const activeUsersData = [
    {
      value: activeUsersValues[0],
      frontColor: '#127680',
      label: t('managerDashboard.dayMon'),
    },
    {
      value: activeUsersValues[1],
      frontColor: '#127680',
      label: t('managerDashboard.dayTue'),
    },
    {
      value: activeUsersValues[2],
      frontColor: '#127680',
      label: t('managerDashboard.dayWed'),
    },
    {
      value: activeUsersValues[3],
      frontColor: '#127680',
      label: t('managerDashboard.dayThu'),
    },
    {
      value: activeUsersValues[4],
      frontColor: '#127680',
      label: t('managerDashboard.dayFri'),
    },
  ];
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
  const departmentUsage = [
    { label: t('managerDashboard.departmentEngineering'), value: 78 },
    { label: t('managerDashboard.departmentDesign'), value: 92 },
    { label: t('managerDashboard.departmentSales'), value: 45 },
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
          {t('managerDashboard.headerTitle')}
        </Text>
        <Text style={styles.headerBody}>
          {t('managerDashboard.headerBody')}
        </Text>
      </View>

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
            <Text style={styles.healthIndex}>84</Text>/100
          </Text>
          <View style={styles.healthBar}>
            <LinearGradient
              colors={colors.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.healthValueBar}
            />
          </View>
          <Text style={styles.healthBody}>
            <Text style={styles.healthPorcent}>
              <Icon source="arrow-up-thick" size={16} color={colors.success} />
              12%
            </Text>{' '}
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
            <Text style={styles.metricValue}>142</Text>
            <Text style={styles.metricCaption}>
              {t('managerDashboard.activeUsersCaption')}
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
            <Text style={styles.metricValue}>03</Text>
            <Text style={styles.metricCaption}>
              {t('managerDashboard.riskAlertsCaption')}
            </Text>
          </View>

          <Button
            mode="contained-tonal"
            contentStyle={styles.alertButtonContent}
            labelStyle={styles.alertButtonLabel}
            style={styles.alertButton}
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

        <Text style={styles.insightsBody}>{`"${mockAiInsight}"`}</Text>

        <Button
          mode="contained-tonal"
          contentStyle={styles.insightsButtonContent}
          labelStyle={styles.insightsButtonLabel}
          style={styles.insightsButton}
        >
          {t('managerDashboard.insightsButton')}
        </Button>
      </LinearGradient>

      <View style={styles.departmentCard}>
        <Text style={styles.departmentTitle}>
          {t('managerDashboard.departmentTitle')}
        </Text>

        <View style={styles.departmentList}>
          {departmentUsage.map((item) => (
            <View key={item.label} style={styles.departmentRow}>
              <Text style={styles.departmentLabel}>{item.label}</Text>
              <View style={styles.departmentTrack}>
                <View
                  style={[styles.departmentFill, { width: `${item.value}%` }]}
                />
              </View>
              <Text style={styles.departmentValue}>{item.value}%</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
