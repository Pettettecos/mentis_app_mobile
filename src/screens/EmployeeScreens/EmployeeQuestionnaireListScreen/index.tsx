import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Button, Icon, Text, TouchableRipple } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { questionnaireService } from '@/services/api';
import type { QuestionnaireRead, SubmissionRead } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/theme/colors';
import { styles } from './style';

type SubmissionByQuestionnaire = Record<string, SubmissionRead>;

export function EmployeeQuestionnaireListScreen() {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const { refresh } = useLocalSearchParams<{ refresh?: string }>();
  const { user } = useAuth();
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireRead[]>([]);
  const [answeredSubmissions, setAnsweredSubmissions] =
    useState<SubmissionByQuestionnaire>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadQuestionnaires = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(false);

    try {
      const data = await questionnaireService.listQuestionnaires();
      const submissionsByQuestionnaire = await Promise.all(
        data.map(async (questionnaire) => {
          try {
            const submissions =
              await questionnaireService.listQuestionnaireSubmissions(
                questionnaire.id
              );
            const userSubmissions = submissions
              .filter((submission) => submission.user_id === user.id)
              .sort(
                (current, next) =>
                  new Date(next.created_at).getTime() -
                  new Date(current.created_at).getTime()
              );

            return [questionnaire.id, userSubmissions[0]] as const;
          } catch {
            return [questionnaire.id, undefined] as const;
          }
        })
      );

      setQuestionnaires(data);
      setAnsweredSubmissions(
        submissionsByQuestionnaire.reduce<SubmissionByQuestionnaire>(
          (current, [questionnaireId, submission]) => {
            if (submission) {
              current[questionnaireId] = submission;
            }
            return current;
          },
          {}
        )
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      void loadQuestionnaires();
    }, [loadQuestionnaires])
  );

  useEffect(() => {
    void loadQuestionnaires();
  }, [loadQuestionnaires, refresh]);

  const openQuestionnaire = (
    questionnaireId: string,
    submissionId?: string
  ) => {
    router.push({
      pathname: '/(protected)/(employee)/questionnaires/[id]',
      params: {
        id: questionnaireId,
        ...(submissionId ? { submissionId } : {}),
      },
    });
  };

  const goToTemporary = () => {
    router.push('/(protected)/(employee)/temporary');
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
        },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          onPress={goToTemporary}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
        >
          <Icon source="arrow-left" size={18} color={colors.textPrimary} />
          <Text style={styles.headerTitle}>
            {t('questionnaires.list.headerTitle')}
          </Text>
        </Pressable>
        <Text style={styles.headerBody}>
          {t('questionnaires.list.headerBody')}
        </Text>
      </View>

      {loading && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>
            {t('questionnaires.list.loadingTitle')}
          </Text>
          <Text style={styles.stateBody}>
            {t('questionnaires.list.loadingBody')}
          </Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>
            {t('questionnaires.list.errorTitle')}
          </Text>
          <Text style={styles.stateBody}>
            {t('questionnaires.list.errorBody')}
          </Text>
          <Button
            mode="contained"
            onPress={loadQuestionnaires}
            style={styles.retryButton}
          >
            {t('questionnaires.list.retry')}
          </Button>
        </View>
      )}

      {!loading && !error && questionnaires.length === 0 && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>
            {t('questionnaires.list.emptyTitle')}
          </Text>
          <Text style={styles.stateBody}>
            {t('questionnaires.list.emptyBody')}
          </Text>
        </View>
      )}

      {!loading &&
        !error &&
        questionnaires.map((questionnaire) => {
          const answeredSubmission = answeredSubmissions[questionnaire.id];
          const isAnswered = Boolean(answeredSubmission);

          return (
            <TouchableRipple
              key={questionnaire.id}
              borderless
              onPress={() =>
                openQuestionnaire(questionnaire.id, answeredSubmission?.id)
              }
              style={[
                styles.questionnaireCard,
                isAnswered && styles.questionnaireCardAnswered,
              ]}
            >
              <View style={styles.questionnaireContent}>
                <View
                  style={[
                    styles.questionnaireIconBg,
                    isAnswered && styles.questionnaireIconBgAnswered,
                  ]}
                >
                  <Icon
                    source={isAnswered ? 'check' : 'clipboard-text-outline'}
                    size={24}
                    color={isAnswered ? colors.success : colors.primary}
                  />
                </View>
                <View style={styles.questionnaireInfo}>
                  <View style={styles.questionnaireTitleRow}>
                    <Text style={styles.questionnaireName}>
                      {questionnaire.name}
                    </Text>
                    {isAnswered && (
                      <View style={styles.answeredBadge}>
                        <Text style={styles.answeredBadgeText}>
                          {t('questionnaires.list.answeredBadge')}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.questionnaireMeta}>
                    {t('questionnaires.list.createdAt', {
                      date: new Date(
                        questionnaire.created_at
                      ).toLocaleDateString(i18n.language),
                    })}
                  </Text>
                  {answeredSubmission && (
                    <Text style={styles.answeredMeta}>
                      {t('questionnaires.list.answeredAt', {
                        date: new Date(
                          answeredSubmission.created_at
                        ).toLocaleDateString(i18n.language),
                      })}
                    </Text>
                  )}
                </View>
                <Icon
                  source="chevron-right"
                  size={22}
                  color={isAnswered ? colors.success : colors.textMuted}
                />
              </View>
            </TouchableRipple>
          );
        })}
    </ScrollView>
  );
}
