import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';

type PsychologistTab =
  | 'dashboard'
  | 'collaborators'
  | 'questionnaires'
  | 'schedule';

const tabs: { key: PsychologistTab; labelKey: string }[] = [
  { key: 'dashboard', labelKey: 'psychologistArea.tabs.dashboard' },
  { key: 'collaborators', labelKey: 'psychologistArea.tabs.collaborators' },
  { key: 'questionnaires', labelKey: 'psychologistArea.tabs.questionnaires' },
  { key: 'schedule', labelKey: 'psychologistArea.tabs.schedule' },
];

export function PsychologistAreaScreen() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PsychologistTab>('dashboard');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <Text variant="titleLarge" style={styles.brand}>
          {t('psychologistArea.brand')}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'collaborators' && <CollaboratorsContent />}
          {activeTab === 'questionnaires' && <QuestionnairesContent />}
          {activeTab === 'schedule' && <ScheduleContent />}
        </ScrollView>
      </View>

      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 8 }]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {t(tab.labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function DashboardContent() {
  const { t } = useTranslation();

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        {t('psychologistArea.dashboard.title')}
      </Text>

      <Text style={styles.description}>
        {t('psychologistArea.dashboard.description')}
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {t('psychologistArea.dashboard.insightsTitle')}
          </Text>

          <Text style={styles.metric}>
            {t('psychologistArea.dashboard.wellbeingMetric')}
          </Text>

          <Text style={styles.description}>
            {t('psychologistArea.dashboard.wellbeingLabel')}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {t('psychologistArea.dashboard.requestsTitle')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.dashboard.requestOneName')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.dashboard.requestOneDescription')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.dashboard.requestTwoName')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.dashboard.requestTwoDescription')}
          </Text>
        </Card.Content>
      </Card>
    </>
  );
}

function CollaboratorsContent() {
  const { t } = useTranslation();

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        {t('psychologistArea.collaborators.title')}
      </Text>

      <Text style={styles.description}>
        {t('psychologistArea.collaborators.description')}
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.itemTitle}>
            {t('psychologistArea.collaborators.collaboratorOneName')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.collaborators.collaboratorOneStatus')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.collaborators.collaboratorTwoName')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.collaborators.collaboratorTwoStatus')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.collaborators.collaboratorThreeName')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.collaborators.collaboratorThreeStatus')}
          </Text>
        </Card.Content>
      </Card>
    </>
  );
}

function QuestionnairesContent() {
  const { t } = useTranslation();

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        {t('psychologistArea.questionnaires.title')}
      </Text>

      <Text style={styles.description}>
        {t('psychologistArea.questionnaires.description')}
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.itemTitle}>
            {t('psychologistArea.questionnaires.gadTitle')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.questionnaires.gadDescription')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.questionnaires.phqTitle')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.questionnaires.phqDescription')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.questionnaires.moodTitle')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.questionnaires.moodDescription')}
          </Text>
        </Card.Content>
      </Card>
    </>
  );
}

function ScheduleContent() {
  const { t } = useTranslation();

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        {t('psychologistArea.schedule.title')}
      </Text>

      <Text style={styles.description}>
        {t('psychologistArea.schedule.description')}
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.itemTitle}>
            {t('psychologistArea.schedule.appointmentOneTitle')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.schedule.appointmentOneDescription')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.schedule.appointmentTwoTitle')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.schedule.appointmentTwoDescription')}
          </Text>

          <Text style={styles.itemTitle}>
            {t('psychologistArea.schedule.appointmentThreeTitle')}
          </Text>
          <Text style={styles.description}>
            {t('psychologistArea.schedule.appointmentThreeDescription')}
          </Text>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  brand: {
    color: colors.primary,
    fontWeight: '800',
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 8,
  },
  description: {
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    elevation: 0,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 12,
  },
  metric: {
    color: colors.accent,
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 4,
  },
  itemTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 4,
  },
  bottomNav: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    bottom: 16,
    elevation: 8,
    flexDirection: 'row',
    gap: 4,
    left: 16,
    paddingHorizontal: 8,
    paddingTop: 8,
    position: 'absolute',
    right: 16,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    paddingVertical: 10,
  },
  tabButtonActive: {
    backgroundColor: '#EFF6FF',
  },
  tabLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
