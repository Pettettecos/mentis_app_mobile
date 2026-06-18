import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  ScrollView,
  type ScrollView as ScrollViewType,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Button, Icon, RadioButton, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { questionnaireService } from '@/services/api';
import type {
  OpenQuestionRead,
  QuestionRead,
  QuestionnaireRead,
  SubmissionCreate,
  SubmissionRead,
} from '@/services/api';
import { colors } from '@/theme/colors';
import { styles } from './style';

type AnswersByQuestion = Record<string, string>;

interface EmployeeQuestionnaireScreenProps {
  questionnaireId: string;
  submissionId?: string;
}

export function EmployeeQuestionnaireScreen({
  questionnaireId,
  submissionId,
}: EmployeeQuestionnaireScreenProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollViewType>(null);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireRead | null>(
    null
  );
  const [answers, setAnswers] = useState<AnswersByQuestion>({});
  const [isWritingAnswer, setIsWritingAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [questionLayouts, setQuestionLayouts] = useState<
    Record<string, number>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const readOnly = Boolean(submissionId) || submitted;

  const loadQuestionnaire = useCallback(async () => {
    setLoading(true);
    setError(false);
    setSubmitted(false);
    setAnswers({});

    try {
      const [data, submission] = await Promise.all([
        questionnaireService.getQuestionnaire(questionnaireId),
        submissionId
          ? questionnaireService.getQuestionnaireSubmission(
              questionnaireId,
              submissionId,
              true
            )
          : Promise.resolve<SubmissionRead | null>(null),
      ]);

      setQuestionnaire(data);
      if (submission?.answers) {
        setAnswers(
          submission.answers.reduce<AnswersByQuestion>((current, answer) => {
            current[answer.question_id] =
              answer.option_id ?? answer.text_answer ?? '';
            return current;
          }, {})
        );
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [questionnaireId, submissionId]);

  useEffect(() => {
    void loadQuestionnaire();
  }, [loadQuestionnaire]);

  const questions = useMemo(
    () =>
      [...(questionnaire?.questions ?? [])].sort(
        (current, next) => current.position - next.position
      ),
    [questionnaire?.questions]
  );

  const answeredCount = questions.filter((question) =>
    answers[question.id]?.trim()
  ).length;
  const canSubmit =
    questions.length > 0 &&
    answeredCount === questions.length &&
    !submitting &&
    !submitted;

  const updateAnswer = (questionId: string, answer: string) => {
    if (readOnly) return;

    setSubmitted(false);
    setAnswers((current) => ({
      ...current,
      [questionId]: answer,
    }));
  };

  const buildSubmissionPayload = (): SubmissionCreate => ({
    answers: questions.map((question) => {
      const answer = answers[question.id]?.trim() ?? '';

      if (question.question_type === 'CLOSED_ENDED') {
        return {
          question_id: question.id,
          option_id: answer,
        };
      }

      return {
        question_id: question.id,
        text_answer: answer,
      };
    }),
  });

  const goToQuestionnaireList = () => {
    router.replace({
      pathname: '/(protected)/(employee)/questionnaires',
      params: {
        refresh: Date.now().toString(),
      },
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError(false);

    try {
      const submission = await questionnaireService.submitQuestionnaire(
        questionnaireId,
        buildSubmissionPayload()
      );
      if (submission.answers) {
        setAnswers(
          submission.answers.reduce<AnswersByQuestion>((current, answer) => {
            current[answer.question_id] =
              answer.option_id ?? answer.text_answer ?? '';
            return current;
          }, {})
        );
      }
      setSubmitted(true);
      goToQuestionnaireList();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuestionLayout =
    (questionId: string) => (event: LayoutChangeEvent) => {
      const questionY = event.nativeEvent.layout.y;

      setQuestionLayouts((current) => ({
        ...current,
        [questionId]: questionY,
      }));
    };

  const handleTextInputFocus = (question: OpenQuestionRead) => {
    setIsWritingAnswer(true);

    const questionY = questionLayouts[question.id];
    if (questionY === undefined) return;

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        animated: true,
        y: Math.max(questionY - 16, 0),
      });
    }, 250);
  };

  const renderQuestionInput = (question: QuestionRead) => {
    if (question.question_type === 'CLOSED_ENDED') {
      return (
        <View style={styles.optionsList}>
          {[...question.options]
            .sort((current, next) => current.position - next.position)
            .map((option) => {
              const selected = answers[question.id] === option.id;

              return (
                <RadioButton.Item
                  key={option.id}
                  label={option.label}
                  value={option.id}
                  status={selected ? 'checked' : 'unchecked'}
                  onPress={() => updateAnswer(question.id, option.id)}
                  disabled={readOnly}
                  color={colors.primary}
                  uncheckedColor={colors.textMuted}
                  labelStyle={[
                    styles.optionLabel,
                    selected && styles.optionLabelSelected,
                  ]}
                  style={[
                    styles.optionItem,
                    selected && styles.optionItemSelected,
                  ]}
                />
              );
            })}
        </View>
      );
    }

    return (
      <TextInput
        value={answers[question.id] ?? ''}
        onChangeText={(value) => updateAnswer(question.id, value)}
        onFocus={() => handleTextInputFocus(question)}
        onBlur={() => setIsWritingAnswer(false)}
        editable={!readOnly}
        placeholder={t('questionnaires.detail.answerPlaceholder')}
        mode="flat"
        multiline
        numberOfLines={4}
        style={styles.textInput}
        contentStyle={styles.textInputContent}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
      />
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
        },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      stickyHeaderIndices={
        !loading && !error && questions.length > 0 && !isWritingAnswer
          ? [1]
          : []
      }
    >
      <View style={styles.header}>
        <Button
          mode="text"
          icon="arrow-left"
          onPress={goToQuestionnaireList}
          compact
          labelStyle={styles.backButtonLabel}
          style={styles.backButton}
        >
          {t('questionnaires.detail.backToList')}
        </Button>
        <Text style={styles.headerTitle}>
          {questionnaire?.name ?? t('questionnaires.detail.fallbackTitle')}
        </Text>
        <Text style={styles.headerBody}>
          {readOnly
            ? t('questionnaires.detail.readOnlyDescription')
            : t('questionnaires.detail.editableDescription')}
        </Text>
      </View>

      {!loading && !error && questions.length > 0 && (
        <View
          style={[styles.stickyProgressWrapper, { paddingTop: insets.top }]}
        >
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>
                {t('questionnaires.detail.progressTitle')}
              </Text>
              <Text style={styles.progressValue}>
                {answeredCount}/{questions.length}
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(answeredCount / questions.length) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>
      )}

      {loading && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>
            {t('questionnaires.detail.loadingTitle')}
          </Text>
          <Text style={styles.stateBody}>
            {t('questionnaires.detail.loadingBody')}
          </Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>
            {t('questionnaires.detail.errorTitle')}
          </Text>
          <Text style={styles.stateBody}>
            {t('questionnaires.detail.errorBody')}
          </Text>
          <Button
            mode="contained"
            onPress={loadQuestionnaire}
            style={styles.stateButton}
          >
            {t('questionnaires.detail.retry')}
          </Button>
        </View>
      )}

      {!loading && !error && questions.length === 0 && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>
            {t('questionnaires.detail.emptyTitle')}
          </Text>
          <Text style={styles.stateBody}>
            {t('questionnaires.detail.emptyBody')}
          </Text>
          <Button
            mode="contained"
            onPress={goToQuestionnaireList}
            style={styles.stateButton}
          >
            {t('questionnaires.detail.backToList')}
          </Button>
        </View>
      )}

      {!loading &&
        !error &&
        questions.map((question) => (
          <View
            key={question.id}
            onLayout={handleQuestionLayout(question.id)}
            style={styles.questionCard}
          >
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>
                {t('questionnaires.detail.questionNumber', {
                  number: question.position,
                })}
              </Text>
              <View style={styles.questionTypeBadge}>
                <Text style={styles.questionTypeText}>
                  {question.question_type === 'CLOSED_ENDED'
                    ? t('questionnaires.detail.questionTypeClosed')
                    : t('questionnaires.detail.questionTypeOpen')}
                </Text>
              </View>
            </View>

            <Text style={styles.questionText}>{question.question}</Text>
            {renderQuestionInput(question)}
          </View>
        ))}

      {readOnly && (
        <View style={styles.successCard}>
          <View style={styles.successIconBg}>
            <Icon source="check" size={22} color="#FFFFFF" />
          </View>
          <View style={styles.successContent}>
            <Text style={styles.successTitle}>
              {t('questionnaires.detail.successTitle')}
            </Text>
            <Text style={styles.successBody}>
              {submissionId
                ? t('questionnaires.detail.successReadOnlyBody')
                : t('questionnaires.detail.successSubmittedBody')}
            </Text>
          </View>
        </View>
      )}

      {!loading && !error && questions.length > 0 && !readOnly && (
        <Button
          mode="contained"
          icon={() => <Icon source="send" size={22} color="#FFFFFF" />}
          onPress={handleSubmit}
          loading={submitting}
          disabled={!canSubmit}
          contentStyle={styles.submitButtonContent}
          labelStyle={styles.submitButtonLabel}
          style={[
            styles.submitButton,
            !canSubmit && styles.submitButtonDisabled,
          ]}
        >
          {t('questionnaires.detail.submitButton')}
        </Button>
      )}
    </ScrollView>
  );
}
