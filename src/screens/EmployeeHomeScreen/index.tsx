import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  Text,
  TextInput,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TopBar } from '@/components';
import { useAuth } from '@/context/AuthContext';
import {
  appointmentService,
  moodCheckinService,
  questionnaireService,
} from '@/services/api';
import type { Appointment } from '@/services/api/appointments';
import type { MoodCheckIn, MoodCheckInMood } from '@/services/api/moodCheckins';
import type {
  QuestionnaireAssignment,
  SubmissionAnswerCreate,
} from '@/services/api/questionnaires';
import { colors } from '@/theme/colors';

import { styles } from './styles';

const moods = [
  { key: 'great', label: 'Muito bem', icon: 'emoticon-excited-outline' },
  { key: 'good', label: 'Bem', icon: 'emoticon-happy-outline' },
  { key: 'neutral', label: 'Neutro', icon: 'emoticon-neutral-outline' },
  { key: 'low', label: 'Cansado', icon: 'emoticon-sad-outline' },
];

function formatAppointmentDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatCheckInDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function EmployeeHomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [questionnaires, setQuestionnaires] = useState<
    QuestionnaireAssignment[]
  >([]);
  const [activeQuestionnaire, setActiveQuestionnaire] =
    useState<QuestionnaireAssignment | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [savingMood, setSavingMood] = useState(false);
  const [questionnaireError, setQuestionnaireError] = useState<string | null>(
    null
  );
  const [moodCheckIns, setMoodCheckIns] = useState<MoodCheckIn[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodError, setMoodError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const [appointmentRows, questionnaireRows, moodRows] = await Promise.all([
          appointmentService.listMyAppointments(),
          questionnaireService.listMyQuestionnaireAssignments(),
          moodCheckinService.listMyMoodCheckIns(),
        ]);
        setAppointments(appointmentRows);
        setQuestionnaires(questionnaireRows);
        setMoodCheckIns(moodRows);
        setSelectedMood(
          moodRows.find((entry) => entry.checked_in_for === todayKey())?.mood ??
            null
        );
      } catch {
        setError('Não foi possível carregar seus atendimentos.');
      } finally {
        setLoading(false);
      }
    };

    void loadHome();
  }, []);

  const firstName = user?.username.split(' ')[0] || 'Colaborador';
  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.time).getTime() >= Date.now()
  );
  const nextAppointment = upcomingAppointments[0];
  const pendingQuestionnaires = questionnaires.filter(
    (questionnaire) => questionnaire.status === 'PENDING'
  );
  const completedQuestionnaires = questionnaires.filter(
    (questionnaire) => questionnaire.status === 'COMPLETED'
  );
  const activeQuestion = activeQuestionnaire?.questions?.[questionIndex];
  const currentAnswer = activeQuestion ? answers[activeQuestion.id] || '' : '';
  const canAdvance = Boolean(currentAnswer.trim());
  const todayCheckIn =
    moodCheckIns.find((entry) => entry.checked_in_for === todayKey()) ?? null;
  const currentMood = selectedMood ?? todayCheckIn?.mood ?? null;

  const openQuestionnaire = (questionnaire: QuestionnaireAssignment) => {
    setActiveQuestionnaire(questionnaire);
    setQuestionIndex(0);
    setAnswers({});
    setQuestionnaireError(null);
  };

  const handleMoodCheckIn = async (mood: MoodCheckInMood) => {
    if (savingMood) return;

    setSavingMood(true);
    setMoodError(null);
    try {
      const savedMood = await moodCheckinService.createMyMoodCheckIn({ mood });
      setMoodCheckIns((current) => [
        savedMood,
        ...current.filter(
          (item) => item.checked_in_for !== savedMood.checked_in_for
        ),
      ]);
      setSelectedMood(savedMood.mood);
    } catch {
      setMoodError('Nao foi possivel salvar seu check-in de humor.');
    } finally {
      setSavingMood(false);
    }
  };

  const handleSubmitQuestionnaire = async () => {
    if (!activeQuestionnaire?.questions) return;

    const payload: SubmissionAnswerCreate[] = activeQuestionnaire.questions.map(
      (question) =>
        question.question_type === 'CLOSED_ENDED'
          ? { question_id: question.id, option_id: answers[question.id] }
          : {
              question_id: question.id,
              text_answer: answers[question.id]?.trim(),
            }
    );

    setSubmitting(true);
    setQuestionnaireError(null);
    try {
      await questionnaireService.submitQuestionnaire(
        activeQuestionnaire.questionnaire_id,
        payload
      );
      setQuestionnaires(
        await questionnaireService.listMyQuestionnaireAssignments()
      );
      setActiveQuestionnaire(null);
      setAnswers({});
      setQuestionIndex(0);
    } catch {
      setQuestionnaireError(
        'Nao foi possivel enviar suas respostas. Tente novamente.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <TopBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 48 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <LinearGradient
            colors={['#087C9F', '#24B5C5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroGlow} />
            <View style={styles.heroIcon}>
              <Icon source="weather-sunset-up" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.heroEyebrow}>SEU ESPACO DE BEM-ESTAR</Text>
            <Text style={styles.heroTitle}>Olá, {firstName}</Text>
            <Text style={styles.heroBody}>
              Reserve alguns minutos para perceber como você está se sentindo
              hoje.
            </Text>
          </LinearGradient>

          <View style={styles.grid}>
            <Card style={[styles.card, styles.moodCard]}>
              <Card.Content>
                <Text style={styles.cardTitle}>Como você está hoje?</Text>
                <Text style={styles.cardBody}>
                  Seu check-in ajuda a acompanhar sua jornada ao longo do tempo.
                </Text>
                {moodError && <Text style={styles.errorText}>{moodError}</Text>}
                <View style={styles.moodOptions}>
                  {moods.map((mood) => {
                    const selected = currentMood === mood.key;
                    return (
                      <TouchableOpacity
                        key={mood.key}
                        disabled={savingMood}
                        onPress={() =>
                          handleMoodCheckIn(mood.key as MoodCheckInMood)
                        }
                        style={[
                          styles.moodOption,
                          selected && styles.moodOptionSelected,
                          savingMood && { opacity: 0.7 },
                        ]}
                      >
                        <Icon
                          source={mood.icon}
                          size={28}
                          color={selected ? colors.primary : colors.textMuted}
                        />
                        <Text
                          style={[
                            styles.moodLabel,
                            selected && styles.moodLabelSelected,
                          ]}
                        >
                          {mood.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {currentMood && (
                  <View style={styles.feedback}>
                    <Icon
                      source="check-circle-outline"
                      size={18}
                      color={colors.success}
                    />
                    <Text style={styles.feedbackText}>
                      Check-in salvo
                      {moodCheckIns[0]?.created_at
                        ? ` em ${formatCheckInDate(moodCheckIns[0].created_at)}`
                        : ''}.
                    </Text>
                  </View>
                )}
              </Card.Content>
            </Card>

            <Card style={[styles.card, styles.nextCard]}>
              <Card.Content>
                <View style={styles.cardHeading}>
                  <View style={styles.calendarIcon}>
                    <Icon
                      source="calendar-heart"
                      size={22}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.cardTitle}>Próximo atendimento</Text>
                </View>

                {loading ? (
                  <ActivityIndicator
                    color={colors.primary}
                    style={styles.loader}
                  />
                ) : error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : nextAppointment ? (
                  <View style={styles.nextAppointment}>
                    <Text style={styles.appointmentTitle}>
                      {nextAppointment.title}
                    </Text>
                    <Text style={styles.appointmentDate}>
                      {formatAppointmentDate(nextAppointment.time)}
                    </Text>
                    <View style={styles.badges}>
                      <View style={styles.badge}>
                        <Icon
                          source={
                            nextAppointment.type === 'Online'
                              ? 'video-outline'
                              : 'map-marker-outline'
                          }
                          size={16}
                          color={colors.tipText}
                        />
                        <Text style={styles.badgeText}>
                          {nextAppointment.type || 'Atendimento'}
                        </Text>
                      </View>
                    </View>
                    {nextAppointment.description && (
                      <Text style={styles.appointmentDescription}>
                        {nextAppointment.description}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View style={styles.emptyState}>
                    <Icon
                      source="calendar-blank-outline"
                      size={36}
                      color={colors.textMuted}
                    />
                    <Text style={styles.emptyTitle}>
                      Nenhum atendimento agendado
                    </Text>
                    <Text style={styles.emptyBody}>
                      Quando a psicóloga criar um horário para você, ele
                      aparecerá aqui.
                    </Text>
                  </View>
                )}
              </Card.Content>
            </Card>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Questionarios pendentes</Text>
              <Text style={styles.questionnaireSubtitle}>
                Responda com calma. Suas respostas ficam restritas a equipe
                autorizada.
              </Text>
            </View>
            <Text style={styles.pendingCount}>
              {pendingQuestionnaires.length} pendente
              {pendingQuestionnaires.length === 1 ? '' : 's'}
            </Text>
          </View>

          {questionnaireError && (
            <Text style={styles.errorText}>{questionnaireError}</Text>
          )}

          {activeQuestionnaire && activeQuestion ? (
            <Card style={styles.questionnaireFormCard}>
              <Card.Content>
                <View style={styles.questionnaireProgressHeader}>
                  <View style={styles.questionnaireProgressText}>
                    <Text style={styles.questionnaireEyebrow}>
                      {activeQuestionnaire.questionnaire_name}
                    </Text>
                    <Text style={styles.questionnaireProgress}>
                      Pergunta {questionIndex + 1} de{' '}
                      {activeQuestionnaire.questions?.length}
                    </Text>
                  </View>
                  <Button
                    compact
                    mode="text"
                    onPress={() => setActiveQuestionnaire(null)}
                  >
                    Sair
                  </Button>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${
                          ((questionIndex + 1) /
                            (activeQuestionnaire.questions?.length || 1)) *
                          100
                        }%`,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.questionText}>
                  {activeQuestion.question}
                </Text>

                {activeQuestion.question_type === 'OPEN_ENDED' ? (
                  <TextInput
                    mode="outlined"
                    label="Sua resposta"
                    multiline
                    numberOfLines={5}
                    value={currentAnswer}
                    onChangeText={(value) =>
                      setAnswers((current) => ({
                        ...current,
                        [activeQuestion.id]: value,
                      }))
                    }
                    style={styles.answerInput}
                  />
                ) : (
                  <View style={styles.answerOptions}>
                    {(activeQuestion.options || []).map((option) => {
                      const selected = currentAnswer === option.id;
                      return (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            styles.answerOption,
                            selected && styles.answerOptionSelected,
                          ]}
                          onPress={() =>
                            setAnswers((current) => ({
                              ...current,
                              [activeQuestion.id]: option.id,
                            }))
                          }
                        >
                          <View
                            style={[
                              styles.answerRadio,
                              selected && styles.answerRadioSelected,
                            ]}
                          />
                          <Text
                            style={[
                              styles.answerOptionText,
                              selected && styles.answerOptionTextSelected,
                            ]}
                          >
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                <View style={styles.questionActions}>
                  <Button
                    mode="outlined"
                    disabled={questionIndex === 0 || submitting}
                    onPress={() => setQuestionIndex((current) => current - 1)}
                  >
                    Voltar
                  </Button>
                  {questionIndex <
                  (activeQuestionnaire.questions?.length || 0) - 1 ? (
                    <Button
                      mode="contained"
                      disabled={!canAdvance}
                      onPress={() => setQuestionIndex((current) => current + 1)}
                    >
                      Proxima pergunta
                    </Button>
                  ) : (
                    <Button
                      mode="contained"
                      loading={submitting}
                      disabled={!canAdvance || submitting}
                      onPress={handleSubmitQuestionnaire}
                    >
                      Enviar respostas
                    </Button>
                  )}
                </View>
              </Card.Content>
            </Card>
          ) : pendingQuestionnaires.length === 0 ? (
            <Card style={styles.questionnaireEmptyCard}>
              <Card.Content style={styles.emptyState}>
                <Icon
                  source="clipboard-check-outline"
                  size={38}
                  color={colors.success}
                />
                <Text style={styles.emptyTitle}>Tudo em dia</Text>
                <Text style={styles.emptyBody}>
                  Voce nao possui questionarios pendentes.
                </Text>
              </Card.Content>
            </Card>
          ) : (
            pendingQuestionnaires.map((questionnaire) => (
              <Card key={questionnaire.id} style={styles.questionnaireCard}>
                <Card.Content style={styles.questionnaireRow}>
                  <View style={styles.questionnaireIcon}>
                    <Icon
                      source="clipboard-text-outline"
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.questionnaireInfo}>
                    <Text style={styles.appointmentTitle}>
                      {questionnaire.questionnaire_name}
                    </Text>
                    <Text style={styles.questionnaireMeta}>
                      {questionnaire.questions?.length || 0} perguntas
                    </Text>
                  </View>
                  <Button
                    mode="contained"
                    compact
                    onPress={() => openQuestionnaire(questionnaire)}
                  >
                    Responder
                  </Button>
                </Card.Content>
              </Card>
            ))
          )}

          {completedQuestionnaires.length > 0 && (
            <>
              <View style={styles.completedHeader}>
                <Text style={styles.completedTitle}>Concluidos</Text>
                <Text style={styles.sectionCount}>
                  {completedQuestionnaires.length}
                </Text>
              </View>
              {completedQuestionnaires.map((questionnaire) => (
                <View key={questionnaire.id} style={styles.completedRow}>
                  <Icon
                    source="check-circle"
                    size={20}
                    color={colors.success}
                  />
                  <Text style={styles.completedName}>
                    {questionnaire.questionnaire_name}
                  </Text>
                  <Text style={styles.completedDate}>
                    {questionnaire.completed_at
                      ? new Intl.DateTimeFormat('pt-BR').format(
                          new Date(questionnaire.completed_at)
                        )
                      : ''}
                  </Text>
                </View>
              ))}
            </>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Minha agenda</Text>
            <Text style={styles.sectionCount}>
              {upcomingAppointments.length}{' '}
              {upcomingAppointments.length === 1
                ? 'atendimento'
                : 'atendimentos'}
            </Text>
          </View>

          {!loading &&
            !error &&
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} style={styles.appointmentCard}>
                <Card.Content style={styles.appointmentRow}>
                  <View style={styles.dateTile}>
                    <Text style={styles.dateDay}>
                      {new Date(appointment.time).getDate()}
                    </Text>
                    <Text style={styles.dateMonth}>
                      {new Intl.DateTimeFormat('pt-BR', {
                        month: 'short',
                      })
                        .format(new Date(appointment.time))
                        .replace('.', '')}
                    </Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentTitle}>
                      {appointment.title}
                    </Text>
                    <Text style={styles.appointmentDate}>
                      {formatAppointmentDate(appointment.time)}
                    </Text>
                    <Text style={styles.appointmentMeta}>
                      {appointment.type || 'Atendimento psicologico'}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}

          <View style={styles.privacyNote}>
            <Icon source="shield-lock-outline" size={20} color="#52616A" />
            <Text style={styles.privacyText}>
              Seus dados de atendimento são privados e acessíveis apenas por
              você e pela equipe autorizada.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
