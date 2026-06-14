import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import {
  appointmentService,
  moodCheckinService,
  questionnaireService,
  userService,
  type UserRead,
} from '../../services/api';
import type {
  Appointment,
  AppointmentCreate,
} from '../../services/api/appointments';
import type { MoodCheckIn } from '../../services/api/moodCheckins';
import type {
  QuestionCreate,
  Questionnaire,
  QuestionnaireAssignment,
} from '../../services/api/questionnaires';
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

const morningSlots = ['08:00', '09:00', '10:00', '11:00'];
const afternoonSlots = ['13:30', '14:30', '15:30', '16:30', '17:30'];

function toLocalDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getUpcomingDates(): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
}

function getDefaultAppointmentDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toLocalDateValue(tomorrow);
}

function formatMoodCheckInDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function moodLabel(mood: MoodCheckIn['mood']): string {
  switch (mood) {
    case 'great':
      return 'Muito bem';
    case 'good':
      return 'Bem';
    case 'neutral':
      return 'Neutro';
    case 'low':
      return 'Cansado';
    default:
      return mood;
  }
}

function moodIcon(mood: MoodCheckIn['mood']): string {
  switch (mood) {
    case 'great':
      return 'emoticon-excited-outline';
    case 'good':
      return 'emoticon-happy-outline';
    case 'neutral':
      return 'emoticon-neutral-outline';
    case 'low':
      return 'emoticon-sad-outline';
    default:
      return 'emoticon-outline';
  }
}

export function PsychologistAreaScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<PsychologistTab>('dashboard');

  return (
    <View style={styles.root}>
      <View style={styles.container}>
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
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [questionnairesCount, setQuestionnairesCount] = useState(0);
  const [pendingAssignmentsCount, setPendingAssignmentsCount] = useState(0);
  const [completedAssignmentsCount, setCompletedAssignmentsCount] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);
  const [moodCheckIns, setMoodCheckIns] = useState<MoodCheckIn[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const [employeeRows, questionnaireRows, appointmentRows, moodRows] =
          await Promise.all([
            userService.listEmployees(),
            questionnaireService.listQuestionnaires(),
            appointmentService.listAppointments(),
            moodCheckinService.listSponsorMoodCheckIns(),
          ]);

        const assignmentRows = (
          await Promise.all(
            questionnaireRows.map((questionnaire) =>
              questionnaireService.listQuestionnaireAssignments(
                questionnaire.id
              )
            )
          )
        ).flat();

        const now = Date.now();
        setEmployeesCount(employeeRows.length);
        setQuestionnairesCount(questionnaireRows.length);
        setPendingAssignmentsCount(
          assignmentRows.filter((assignment) => assignment.status === 'PENDING')
            .length
        );
        setCompletedAssignmentsCount(
          assignmentRows.filter(
            (assignment) => assignment.status === 'COMPLETED'
          ).length
        );
        setUpcomingAppointments(
          appointmentRows
            .filter(
              (appointment) => new Date(appointment.time).getTime() >= now
            )
            .sort((a, b) => {
              return new Date(a.time).getTime() - new Date(b.time).getTime();
            })
            .slice(0, 3)
        );
        setMoodCheckIns(
          moodRows
            .sort((a, b) => {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            })
            .slice(0, 3)
        );
      } catch {
        setError('Nao foi possivel carregar os dados do painel.');
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const completionRate =
    pendingAssignmentsCount + completedAssignmentsCount > 0
      ? Math.round(
          (completedAssignmentsCount /
            (pendingAssignmentsCount + completedAssignmentsCount)) *
            100
        )
      : 0;
  const firstName = user?.username.split(' ')[0] || 'Dra.';

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        Bem-vinda, {firstName}
      </Text>

      <Text style={styles.description}>
        Aqui esta o resumo real da sua operacao: equipe ativa, questionarios em
        andamento e atendimentos proximos.
      </Text>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : error ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.errorText}>{error}</Text>
          </Card.Content>
        </Card>
      ) : (
        <>
          <View style={styles.dashboardGrid}>
            <Card style={[styles.card, styles.dashboardMetricCard]}>
              <Card.Content>
                <Text style={styles.dashboardMetricLabel}>Colaboradores</Text>
                <Text style={styles.dashboardMetricValue}>
                  {employeesCount}
                </Text>
                <Text style={styles.dashboardMetricHint}>
                  ativos no seu sponsor
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.card, styles.dashboardMetricCard]}>
              <Card.Content>
                <Text style={styles.dashboardMetricLabel}>Questionarios</Text>
                <Text style={styles.dashboardMetricValue}>
                  {questionnairesCount}
                </Text>
                <Text style={styles.dashboardMetricHint}>
                  cadastrados e disponiveis
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.card, styles.dashboardMetricCard]}>
              <Card.Content>
                <Text style={styles.dashboardMetricLabel}>Pendentes</Text>
                <Text style={styles.dashboardMetricValue}>
                  {pendingAssignmentsCount}
                </Text>
                <Text style={styles.dashboardMetricHint}>
                  respostas aguardando envio
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.card, styles.dashboardMetricCard]}>
              <Card.Content>
                <Text style={styles.dashboardMetricLabel}>Concluidos</Text>
                <Text style={styles.dashboardMetricValue}>
                  {completedAssignmentsCount}
                </Text>
                <Text style={styles.dashboardMetricHint}>
                  fluxo ja finalizado
                </Text>
              </Card.Content>
            </Card>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.dashboardSectionHeader}>
                <Text style={styles.cardTitle}>Resumo de acompanhamento</Text>
                <Text style={styles.dashboardPill}>{completionRate}%</Text>
              </View>
              <Text style={styles.description}>
                Taxa de conclusao dos questionarios enviados na base atual.
              </Text>
              <View style={styles.dashboardProgressTrack}>
                <View
                  style={[
                    styles.dashboardProgressFill,
                    { width: `${completionRate}%` },
                  ]}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.dashboardSectionHeader}>
                <Text style={styles.cardTitle}>Pedidos de atendimento</Text>
                <Text style={styles.dashboardPill}>
                  {upcomingAppointments.length}
                </Text>
              </View>

              {upcomingAppointments.length === 0 ? (
                <Text style={styles.description}>
                  Nenhum atendimento futuro agendado no momento.
                </Text>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <View key={appointment.id} style={styles.dashboardRequestRow}>
                    <View style={styles.dashboardRequestDot} />
                    <View style={styles.dashboardRequestInfo}>
                      <Text style={styles.itemTitle}>{appointment.title}</Text>
                      <Text style={styles.dashboardRequestMeta}>
                        {appointment.user_name} ·{' '}
                        {new Intl.DateTimeFormat('pt-BR', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }).format(new Date(appointment.time))}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.dashboardSectionHeader}>
                <Text style={styles.cardTitle}>Ultimos check-ins</Text>
                <Text style={styles.dashboardPill}>{moodCheckIns.length}</Text>
              </View>

              {moodCheckIns.length === 0 ? (
                <Text style={styles.description}>
                  Nenhum check-in de humor registrado ainda.
                </Text>
              ) : (
                moodCheckIns.map((checkIn) => (
                  <View key={checkIn.id} style={styles.moodCheckInRow}>
                    <View style={styles.moodCheckInIcon}>
                      <Icon
                        source={moodIcon(checkIn.mood)}
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                    <View style={styles.moodCheckInInfo}>
                      <View style={styles.moodCheckInHeader}>
                        <Text style={styles.itemTitle}>
                          {checkIn.user_name}
                        </Text>
                        <Text style={styles.moodCheckInBadge}>
                          {moodLabel(checkIn.mood)}
                        </Text>
                      </View>
                      <Text style={styles.dashboardRequestMeta}>
                        {formatMoodCheckInDate(checkIn.created_at)}
                      </Text>
                      {checkIn.note ? (
                        <Text style={styles.moodCheckInNote}>
                          {checkIn.note}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                ))
              )}
            </Card.Content>
          </Card>
        </>
      )}
    </>
  );
}

function CollaboratorsContent() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collaborators, setCollaborators] = useState<UserRead[]>([]);
  const [collaboratorStats, setCollaboratorStats] = useState<
    Record<
      string,
      {
        pendingQuestionnaires: number;
        completedQuestionnaires: number;
        nextAppointment: Appointment | null;
      }
    >
  >({});

  useEffect(() => {
    const loadCollaborators = async () => {
      setLoading(true);
      setError(null);
      try {
        const [employeeRows, appointmentRows, questionnaireRows] =
          await Promise.all([
            userService.listEmployees(),
            appointmentService.listAppointments(),
            questionnaireService.listQuestionnaires(),
          ]);

        const assignmentRows = (
          await Promise.all(
            questionnaireRows.map((questionnaire) =>
              questionnaireService.listQuestionnaireAssignments(
                questionnaire.id
              )
            )
          )
        ).flat();

        const nextAppointmentByEmployee = new Map<string, Appointment>();
        const now = Date.now();
        appointmentRows
          .filter((appointment) => new Date(appointment.time).getTime() >= now)
          .sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          )
          .forEach((appointment) => {
            if (!nextAppointmentByEmployee.has(appointment.user_id)) {
              nextAppointmentByEmployee.set(appointment.user_id, appointment);
            }
          });

        const stats = employeeRows.reduce<
          Record<
            string,
            {
              pendingQuestionnaires: number;
              completedQuestionnaires: number;
              nextAppointment: Appointment | null;
            }
          >
        >((acc, employee) => {
          const employeeAssignments = assignmentRows.filter(
            (assignment) => assignment.user_id === employee.id
          );
          acc[employee.id] = {
            pendingQuestionnaires: employeeAssignments.filter(
              (assignment) => assignment.status === 'PENDING'
            ).length,
            completedQuestionnaires: employeeAssignments.filter(
              (assignment) => assignment.status === 'COMPLETED'
            ).length,
            nextAppointment: nextAppointmentByEmployee.get(employee.id) ?? null,
          };
          return acc;
        }, {});

        setCollaborators(employeeRows);
        setCollaboratorStats(stats);
      } catch {
        setError('Nao foi possivel carregar os colaboradores.');
      } finally {
        setLoading(false);
      }
    };

    void loadCollaborators();
  }, []);

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        {t('psychologistArea.collaborators.title')}
      </Text>

      <Text style={styles.description}>
        {t('psychologistArea.collaborators.description')}
      </Text>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : error ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.errorText}>{error}</Text>
          </Card.Content>
        </Card>
      ) : collaborators.length === 0 ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.emptyText}>
              Nenhum colaborador encontrado para este sponsor.
            </Text>
          </Card.Content>
        </Card>
      ) : (
        <>
          <View style={styles.collaboratorsSummaryGrid}>
            <Card style={[styles.card, styles.collaboratorSummaryCard]}>
              <Card.Content>
                <Text style={styles.dashboardMetricLabel}>
                  Colaboradores ativos
                </Text>
                <Text style={styles.dashboardMetricValue}>
                  {collaborators.length}
                </Text>
              </Card.Content>
            </Card>
            <Card style={[styles.card, styles.collaboratorSummaryCard]}>
              <Card.Content>
                <Text style={styles.dashboardMetricLabel}>
                  Pendentes na equipe
                </Text>
                <Text style={styles.dashboardMetricValue}>
                  {Object.values(collaboratorStats).reduce(
                    (total, item) => total + item.pendingQuestionnaires,
                    0
                  )}
                </Text>
              </Card.Content>
            </Card>
          </View>

          {collaborators.map((collaborator) => {
            const stats = collaboratorStats[collaborator.id];
            const nextAppointment = stats?.nextAppointment;

            return (
              <Card key={collaborator.id} style={styles.card}>
                <Card.Content>
                  <View style={styles.collaboratorRow}>
                    <View style={styles.collaboratorAvatar}>
                      <Text style={styles.collaboratorAvatarText}>
                        {collaborator.username
                          .split(' ')
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.collaboratorInfo}>
                      <Text style={styles.itemTitle}>
                        {collaborator.username}
                      </Text>
                      <Text style={styles.description}>
                        {collaborator.email}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.collaboratorChips}>
                    <Text style={styles.collaboratorChip}>
                      {collaborator.role}
                    </Text>
                    <Text style={styles.collaboratorChip}>
                      {stats?.pendingQuestionnaires ?? 0} pendente
                      {(stats?.pendingQuestionnaires ?? 0) === 1 ? '' : 's'}
                    </Text>
                    <Text style={styles.collaboratorChip}>
                      {stats?.completedQuestionnaires ?? 0} concluido
                      {(stats?.completedQuestionnaires ?? 0) === 1 ? '' : 's'}
                    </Text>
                  </View>

                  {nextAppointment ? (
                    <View style={styles.collaboratorStatusBox}>
                      <Text style={styles.collaboratorStatusLabel}>
                        Proximo atendimento
                      </Text>
                      <Text style={styles.collaboratorStatusValue}>
                        {nextAppointment.title}
                      </Text>
                      <Text style={styles.collaboratorStatusMeta}>
                        {new Intl.DateTimeFormat('pt-BR', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }).format(new Date(nextAppointment.time))}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.collaboratorStatusBox}>
                      <Text style={styles.collaboratorStatusLabel}>
                        Acompanhamento
                      </Text>
                      <Text style={styles.collaboratorStatusMeta}>
                        Sem atendimento futuro agendado.
                      </Text>
                    </View>
                  )}
                </Card.Content>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
}

function QuestionnairesContent() {
  const { t } = useTranslation();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [employees, setEmployees] = useState<UserRead[]>([]);
  const [assignments, setAssignments] = useState<
    Record<string, QuestionnaireAssignment[]>
  >({});
  const [selectedEmployees, setSelectedEmployees] = useState<
    Record<string, string[]>
  >({});
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [result, setResult] = useState<QuestionnaireAssignment | null>(null);
  const [resultLoadingId, setResultLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [isTemplate, setIsTemplate] = useState(false);
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    createQuestionDraft(),
  ]);

  const loadQuestionnaires = async () => {
    setLoading(true);
    setError(null);
    try {
      const [questionnaireRows, employeeRows] = await Promise.all([
        questionnaireService.listQuestionnaires(),
        userService.listEmployees(),
      ]);
      setQuestionnaires(questionnaireRows);
      setEmployees(employeeRows);
      const assignmentRows = await Promise.all(
        questionnaireRows.map(async (questionnaire) => [
          questionnaire.id,
          await questionnaireService.listQuestionnaireAssignments(
            questionnaire.id
          ),
        ])
      );
      setAssignments(Object.fromEntries(assignmentRows));
    } catch {
      setError('Não foi possível carregar os questionários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadQuestionnaires();
  }, []);

  const resetForm = () => {
    setName('');
    setIsTemplate(false);
    setQuestions([createQuestionDraft()]);
  };

  const updateQuestion = (
    questionId: string,
    update: Partial<QuestionDraft>
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId ? { ...question, ...update } : question
      )
    );
  };

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === optionIndex ? value : option
              ),
            }
          : question
      )
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? { ...question, options: [...question.options, ''] }
          : question
      )
    );
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (_, index) => index !== optionIndex
              ),
            }
          : question
      )
    );
  };

  const handleCreate = async () => {
    setError(null);
    setSuccess(null);
    if (!name.trim()) {
      setError('Informe o nome do questionário.');
      return;
    }
    if (questions.some((question) => !question.text.trim())) {
      setError('Preencha o texto de todas as perguntas.');
      return;
    }
    if (
      questions.some(
        (question) =>
          question.type === 'CLOSED_ENDED' &&
          (question.options.length < 2 ||
            question.options.some((option) => !option.trim()))
      )
    ) {
      setError('Perguntas de múltipla escolha precisam de duas alternativas.');
      return;
    }

    const payloadQuestions: QuestionCreate[] = questions.map(
      (question, index) => {
        if (question.type === 'OPEN_ENDED') {
          return {
            question_type: 'OPEN_ENDED',
            question: question.text.trim(),
            position: index + 1,
          };
        }

        return {
          question_type: 'CLOSED_ENDED',
          question: question.text.trim(),
          position: index + 1,
          options: question.options.map((option, optionIndex) => ({
            label: option.trim(),
            value: String(optionIndex + 1),
            position: optionIndex + 1,
          })),
        };
      }
    );

    setSaving(true);
    try {
      const created = await questionnaireService.createQuestionnaire({
        name: name.trim(),
        is_template: isTemplate,
        questions: payloadQuestions,
      });
      setQuestionnaires((current) => [...current, created]);
      setSuccess(`Questionário "${created.name}" criado com sucesso.`);
      resetForm();
      setShowForm(false);
    } catch {
      setError(
        'Não foi possível criar o questionário. Verifique se o nome já existe.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (questionnaireId: string) => {
    setDeletingId(questionnaireId);
    setError(null);
    setSuccess(null);
    try {
      await questionnaireService.deleteQuestionnaire(questionnaireId);
      setQuestionnaires((current) =>
        current.filter((questionnaire) => questionnaire.id !== questionnaireId)
      );
    } catch {
      setError('Não foi possível excluir o questionário.');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleEmployee = (questionnaireId: string, userId: string) => {
    setSelectedEmployees((current) => {
      const selected = current[questionnaireId] || [];
      return {
        ...current,
        [questionnaireId]: selected.includes(userId)
          ? selected.filter((id) => id !== userId)
          : [...selected, userId],
      };
    });
  };

  const handleAssign = async (questionnaireId: string) => {
    const userIds = selectedEmployees[questionnaireId] || [];
    if (userIds.length === 0) {
      setError('Selecione ao menos um colaborador.');
      return;
    }

    setAssigningId(questionnaireId);
    setError(null);
    setSuccess(null);
    try {
      const rows = await questionnaireService.assignQuestionnaire(
        questionnaireId,
        userIds
      );
      setAssignments((current) => ({ ...current, [questionnaireId]: rows }));
      setSelectedEmployees((current) => ({
        ...current,
        [questionnaireId]: [],
      }));
      setSuccess('Questionario atribuido com sucesso.');
    } catch {
      setError('Nao foi possivel atribuir o questionario.');
    } finally {
      setAssigningId(null);
    }
  };

  const handleViewResult = async (
    questionnaireId: string,
    assignmentId: string
  ) => {
    setResultLoadingId(assignmentId);
    setError(null);
    try {
      setResult(
        await questionnaireService.getQuestionnaireAssignmentResult(
          questionnaireId,
          assignmentId
        )
      );
    } catch {
      setError('Nao foi possivel carregar as respostas.');
    } finally {
      setResultLoadingId(null);
    }
  };

  return (
    <>
      <View style={styles.scheduleHeader}>
        <Text variant="headlineMedium" style={styles.title}>
          {t('psychologistArea.questionnaires.title')}
        </Text>
        <Button
          mode="contained"
          onPress={() => setShowForm((current) => !current)}
          buttonColor={colors.accent}
        >
          {showForm ? 'Cancelar' : 'Novo questionário'}
        </Button>
      </View>

      <Text style={styles.description}>
        {t('psychologistArea.questionnaires.description')}
      </Text>

      {showForm && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Criar questionário
            </Text>
            <Text style={styles.description}>
              Defina o título e monte as perguntas na ordem em que serão
              respondidas.
            </Text>

            <TextInput
              mode="outlined"
              label="Nome do questionário"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <View style={styles.templateRow}>
              <View style={styles.templateText}>
                <Text style={styles.fieldLabel}>Salvar como modelo</Text>
                <Text style={styles.helperText}>
                  Permite reutilizar este questionário posteriormente.
                </Text>
              </View>
              <Switch
                value={isTemplate}
                onValueChange={setIsTemplate}
                color={colors.primary}
              />
            </View>

            {questions.map((question, questionIndex) => (
              <Card key={question.id} style={styles.questionCard}>
                <Card.Content>
                  <View style={styles.questionHeader}>
                    <View style={styles.questionNumber}>
                      <Text style={styles.questionNumberText}>
                        {questionIndex + 1}
                      </Text>
                    </View>
                    <Text style={styles.questionHeading}>
                      Pergunta {questionIndex + 1}
                    </Text>
                    {questions.length > 1 && (
                      <Button
                        compact
                        mode="text"
                        textColor={colors.error}
                        onPress={() =>
                          setQuestions((current) =>
                            current.filter(
                              (currentQuestion) =>
                                currentQuestion.id !== question.id
                            )
                          )
                        }
                      >
                        Remover
                      </Button>
                    )}
                  </View>

                  <TextInput
                    mode="outlined"
                    label="Digite a pergunta"
                    value={question.text}
                    onChangeText={(text) =>
                      updateQuestion(question.id, { text })
                    }
                    style={styles.input}
                    multiline
                  />

                  <Text style={styles.fieldLabel}>Tipo de resposta</Text>
                  <View style={styles.typeOptions}>
                    {[
                      { value: 'OPEN_ENDED', label: 'Resposta aberta' },
                      { value: 'CLOSED_ENDED', label: 'Múltipla escolha' },
                    ].map((type) => (
                      <TouchableOpacity
                        key={type.value}
                        style={[
                          styles.typeOption,
                          question.type === type.value &&
                            styles.typeOptionSelected,
                        ]}
                        onPress={() =>
                          updateQuestion(question.id, {
                            type: type.value as QuestionDraft['type'],
                            options:
                              type.value === 'CLOSED_ENDED' &&
                              question.options.length < 2
                                ? ['', '']
                                : question.options,
                          })
                        }
                      >
                        <Text
                          style={[
                            styles.typeOptionText,
                            question.type === type.value &&
                              styles.typeOptionTextSelected,
                          ]}
                        >
                          {type.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {question.type === 'CLOSED_ENDED' && (
                    <>
                      <Text style={styles.fieldLabel}>Alternativas</Text>
                      {question.options.map((option, optionIndex) => (
                        <View
                          key={`${question.id}-${optionIndex}`}
                          style={styles.optionRow}
                        >
                          <TextInput
                            mode="outlined"
                            label={`Alternativa ${optionIndex + 1}`}
                            value={option}
                            onChangeText={(value) =>
                              updateOption(question.id, optionIndex, value)
                            }
                            style={styles.optionInput}
                            dense
                          />
                          {question.options.length > 2 && (
                            <Button
                              compact
                              mode="text"
                              textColor={colors.error}
                              onPress={() =>
                                removeOption(question.id, optionIndex)
                              }
                            >
                              Excluir
                            </Button>
                          )}
                        </View>
                      ))}
                      <Button
                        mode="outlined"
                        onPress={() => addOption(question.id)}
                        style={styles.secondaryButton}
                      >
                        Adicionar alternativa
                      </Button>
                    </>
                  )}
                </Card.Content>
              </Card>
            ))}

            <Button
              mode="outlined"
              onPress={() =>
                setQuestions((current) => [...current, createQuestionDraft()])
              }
              style={styles.addQuestionButton}
            >
              Adicionar pergunta
            </Button>

            <View style={styles.questionnaireSummary}>
              <Text style={styles.questionnaireSummaryTitle}>
                Resumo do questionário
              </Text>
              <Text style={styles.helperText}>
                {questions.length}{' '}
                {questions.length === 1 ? 'pergunta' : 'perguntas'} ·{' '}
                {
                  questions.filter(
                    (question) => question.type === 'CLOSED_ENDED'
                  ).length
                }{' '}
                de múltipla escolha
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleCreate}
              loading={saving}
              disabled={saving}
              buttonColor={colors.primary}
            >
              Salvar questionário
            </Button>
          </Card.Content>
        </Card>
      )}

      {success && <Text style={styles.successText}>{success}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : questionnaires.length === 0 ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.emptyText}>
              Nenhum questionário cadastrado.
            </Text>
          </Card.Content>
        </Card>
      ) : (
        questionnaires.map((questionnaire) => (
          <Card key={questionnaire.id} style={styles.card}>
            <Card.Content>
              <View style={styles.appointmentHeader}>
                <View style={styles.appointmentInfo}>
                  <View style={styles.questionnaireTitleRow}>
                    <Text style={styles.itemTitle}>{questionnaire.name}</Text>
                    {questionnaire.is_template && (
                      <Text style={styles.templateBadge}>Modelo</Text>
                    )}
                  </View>
                  <Text style={styles.description}>
                    Criado em{' '}
                    {new Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'medium',
                    }).format(new Date(questionnaire.created_at))}
                    {questionnaire.questions
                      ? ` · ${questionnaire.questions.length} perguntas`
                      : ''}
                  </Text>
                </View>
                <Button
                  mode="text"
                  textColor={colors.error}
                  loading={deletingId === questionnaire.id}
                  disabled={deletingId === questionnaire.id}
                  onPress={() => handleDelete(questionnaire.id)}
                >
                  Excluir
                </Button>
              </View>

              <View style={styles.assignmentSection}>
                <Text style={styles.fieldLabel}>Atribuir a colaboradores</Text>
                <View style={styles.employeeOptions}>
                  {employees.map((employee) => {
                    const alreadyAssigned = (
                      assignments[questionnaire.id] || []
                    ).some((item) => item.user_id === employee.id);
                    const selected = (
                      selectedEmployees[questionnaire.id] || []
                    ).includes(employee.id);

                    return (
                      <TouchableOpacity
                        key={employee.id}
                        disabled={alreadyAssigned}
                        style={[
                          styles.employeeOption,
                          selected && styles.employeeOptionSelected,
                          alreadyAssigned && styles.employeeOptionDisabled,
                        ]}
                        onPress={() =>
                          toggleEmployee(questionnaire.id, employee.id)
                        }
                      >
                        <Text
                          style={[
                            styles.employeeOptionText,
                            selected && styles.employeeOptionTextSelected,
                          ]}
                        >
                          {employee.username}
                          {alreadyAssigned ? ' - atribuido' : ''}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Button
                  mode="contained"
                  compact
                  buttonColor={colors.primary}
                  loading={assigningId === questionnaire.id}
                  disabled={
                    assigningId === questionnaire.id ||
                    !(selectedEmployees[questionnaire.id] || []).length
                  }
                  onPress={() => handleAssign(questionnaire.id)}
                >
                  Enviar questionario
                </Button>

                <Text style={styles.assignmentTitle}>Acompanhamento</Text>
                {(assignments[questionnaire.id] || []).length === 0 ? (
                  <Text style={styles.helperText}>
                    Este questionario ainda nao foi enviado.
                  </Text>
                ) : (
                  (assignments[questionnaire.id] || []).map((assignment) => (
                    <View key={assignment.id} style={styles.assignmentRow}>
                      <View style={styles.assignmentInfo}>
                        <Text style={styles.assignmentName}>
                          {assignment.user_name}
                        </Text>
                        <Text
                          style={[
                            styles.assignmentStatus,
                            assignment.status === 'COMPLETED' &&
                              styles.assignmentStatusCompleted,
                          ]}
                        >
                          {assignment.status === 'COMPLETED'
                            ? 'Concluido'
                            : 'Pendente'}
                        </Text>
                      </View>
                      {assignment.status === 'COMPLETED' && (
                        <Button
                          compact
                          mode="outlined"
                          loading={resultLoadingId === assignment.id}
                          onPress={() =>
                            handleViewResult(questionnaire.id, assignment.id)
                          }
                        >
                          Ver resultado
                        </Button>
                      )}
                    </View>
                  ))
                )}
              </View>
            </Card.Content>
          </Card>
        ))
      )}

      {result && (
        <Card style={[styles.card, styles.resultCard]}>
          <Card.Content>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentInfo}>
                <Text style={styles.cardTitle}>Resultado individual</Text>
                <Text style={styles.description}>
                  {result.user_name} - {result.questionnaire_name}
                </Text>
              </View>
              <Button mode="text" onPress={() => setResult(null)}>
                Fechar
              </Button>
            </View>
            {(result.answers || []).map((answer, index) => (
              <View key={answer.question_id} style={styles.resultAnswer}>
                <Text style={styles.resultQuestion}>
                  {index + 1}. {answer.question}
                </Text>
                <Text style={styles.resultValue}>
                  {answer.option_label || answer.text_answer || 'Sem resposta'}
                </Text>
              </View>
            ))}
            <Text style={styles.privacyHelper}>
              Acesso restrito a profissional autorizada. As respostas nao sao
              exibidas para gestores ou outros colaboradores.
            </Text>
          </Card.Content>
        </Card>
      )}
    </>
  );
}

type QuestionDraft = {
  id: string;
  text: string;
  type: 'OPEN_ENDED' | 'CLOSED_ENDED';
  options: string[];
};

let questionDraftSequence = 0;

function createQuestionDraft(): QuestionDraft {
  questionDraftSequence += 1;
  return {
    id: `question-${questionDraftSequence}`,
    text: '',
    type: 'OPEN_ENDED',
    options: ['', ''],
  };
}

function ScheduleContent() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [employees, setEmployees] = useState<UserRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upcomingDates] = useState(getUpcomingDates);
  const [form, setForm] = useState({
    userId: '',
    date: getDefaultAppointmentDate(),
    time: '09:00',
    title: '',
    description: '',
    type: 'Online',
  });

  const loadSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentRows, employeeRows] = await Promise.all([
        appointmentService.listAppointments(),
        userService.listEmployees(),
      ]);
      setAppointments(appointmentRows);
      setEmployees(employeeRows);
    } catch {
      setError('Não foi possível carregar a agenda.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSchedule();
  }, []);

  const resetForm = () => {
    setForm({
      userId: '',
      date: getDefaultAppointmentDate(),
      time: '09:00',
      title: '',
      description: '',
      type: 'Online',
    });
  };

  const handleCreate = async () => {
    setError(null);
    if (!form.userId || !form.date || !form.time || !form.title.trim()) {
      setError('Preencha colaborador, data, horário e título.');
      return;
    }

    const appointmentTime = new Date(`${form.date}T${form.time}:00`);
    if (Number.isNaN(appointmentTime.getTime())) {
      setError('Informe uma data e um horário válidos.');
      return;
    }

    const payload: AppointmentCreate = {
      user_id: form.userId,
      time: appointmentTime.toISOString(),
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      type: form.type,
    };

    setSaving(true);
    try {
      const created = await appointmentService.createAppointment(payload);
      setAppointments((current) =>
        [...current, created].sort(
          (left, right) =>
            new Date(left.time).getTime() - new Date(right.time).getTime()
        )
      );
      resetForm();
      setShowForm(false);
    } catch {
      setError('Não foi possível criar o agendamento.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    setDeletingId(appointmentId);
    setError(null);
    try {
      await appointmentService.deleteAppointment(appointmentId);
      setAppointments((current) =>
        current.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch {
      setError('Não foi possível excluir o agendamento.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <View style={styles.scheduleHeader}>
        <Text variant="headlineMedium" style={styles.title}>
          {t('psychologistArea.schedule.title')}
        </Text>
        <Button
          mode="contained"
          onPress={() => setShowForm((current) => !current)}
          buttonColor={colors.accent}
        >
          {showForm ? 'Cancelar' : 'Novo agendamento'}
        </Button>
      </View>

      <Text style={styles.description}>
        {t('psychologistArea.schedule.description')}
      </Text>

      {showForm && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Novo agendamento
            </Text>

            <Text style={styles.fieldLabel}>Colaborador</Text>
            <View style={styles.employeeOptions}>
              {employees.map((employee) => (
                <TouchableOpacity
                  key={employee.id}
                  style={[
                    styles.employeeOption,
                    form.userId === employee.id &&
                      styles.employeeOptionSelected,
                  ]}
                  onPress={() =>
                    setForm((current) => ({
                      ...current,
                      userId: employee.id,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.employeeOptionText,
                      form.userId === employee.id &&
                        styles.employeeOptionTextSelected,
                    ]}
                  >
                    {employee.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {!loading && !error && employees.length === 0 && (
              <Text style={styles.emptyText}>
                Nenhum colaborador disponível para agendamento.
              </Text>
            )}

            <Text style={styles.fieldLabel}>Escolha o dia</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateOptions}
            >
              {upcomingDates.map((date, index) => {
                const dateValue = toLocalDateValue(date);
                const selected = form.date === dateValue;
                const shortLabel =
                  index === 0
                    ? 'Hoje'
                    : index === 1
                      ? 'Amanhã'
                      : new Intl.DateTimeFormat('pt-BR', {
                          weekday: 'short',
                        })
                          .format(date)
                          .replace('.', '');

                return (
                  <TouchableOpacity
                    key={dateValue}
                    style={[
                      styles.dateOption,
                      selected && styles.dateOptionSelected,
                    ]}
                    onPress={() => {
                      setError(null);
                      setForm((current) => ({
                        ...current,
                        date: dateValue,
                      }));
                    }}
                  >
                    <Text
                      style={[
                        styles.dateWeekday,
                        selected && styles.dateTextSelected,
                      ]}
                    >
                      {shortLabel}
                    </Text>
                    <Text
                      style={[
                        styles.dateDay,
                        selected && styles.dateTextSelected,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                    <Text
                      style={[
                        styles.dateMonth,
                        selected && styles.dateTextSelected,
                      ]}
                    >
                      {new Intl.DateTimeFormat('pt-BR', {
                        month: 'short',
                      })
                        .format(date)
                        .replace('.', '')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={styles.fieldLabel}>Escolha o horário</Text>
            <Text style={styles.slotPeriod}>Manhã</Text>
            <View style={styles.timeOptions}>
              {morningSlots.map((time) => (
                <TimeOption
                  key={time}
                  time={time}
                  selected={form.time === time}
                  onPress={() => {
                    setError(null);
                    setForm((current) => ({ ...current, time }));
                  }}
                />
              ))}
            </View>

            <Text style={styles.slotPeriod}>Tarde</Text>
            <View style={styles.timeOptions}>
              {afternoonSlots.map((time) => (
                <TimeOption
                  key={time}
                  time={time}
                  selected={form.time === time}
                  onPress={() => {
                    setError(null);
                    setForm((current) => ({ ...current, time }));
                  }}
                />
              ))}
            </View>

            <TextInput
              mode="outlined"
              label="Título"
              value={form.title}
              onChangeText={(title) =>
                setForm((current) => ({ ...current, title }))
              }
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="Descrição"
              value={form.description}
              onChangeText={(description) =>
                setForm((current) => ({ ...current, description }))
              }
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>Modalidade</Text>
            <View style={styles.typeOptions}>
              {['Online', 'Presencial'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeOption,
                    form.type === type && styles.typeOptionSelected,
                  ]}
                  onPress={() => setForm((current) => ({ ...current, type }))}
                >
                  <Text
                    style={[
                      styles.typeOptionText,
                      form.type === type && styles.typeOptionTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.scheduleSummary}>
              <Text style={styles.scheduleSummaryLabel}>Data selecionada</Text>
              <Text style={styles.scheduleSummaryValue}>
                {new Intl.DateTimeFormat('pt-BR', {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long',
                }).format(new Date(`${form.date}T${form.time}:00`))}
                {' às '}
                {form.time}
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleCreate}
              loading={saving}
              disabled={
                saving || loading || Boolean(error) || employees.length === 0
              }
              buttonColor={colors.primary}
            >
              Salvar agendamento
            </Button>
          </Card.Content>
        </Card>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : appointments.length === 0 ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.emptyText}>Nenhum agendamento cadastrado.</Text>
          </Card.Content>
        </Card>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id} style={styles.card}>
            <Card.Content>
              <View style={styles.appointmentHeader}>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.itemTitle}>{appointment.title}</Text>
                  <Text style={styles.appointmentPatient}>
                    {appointment.user_name}
                  </Text>
                </View>
                <Button
                  mode="text"
                  textColor={colors.error}
                  loading={deletingId === appointment.id}
                  disabled={deletingId === appointment.id}
                  onPress={() => handleDelete(appointment.id)}
                >
                  Excluir
                </Button>
              </View>
              <Text style={styles.appointmentDate}>
                {new Intl.DateTimeFormat('pt-BR', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(appointment.time))}
              </Text>
              <Text style={styles.description}>
                {[appointment.type, appointment.description]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            </Card.Content>
          </Card>
        ))
      )}
    </>
  );
}

function TimeOption({
  time,
  selected,
  onPress,
}: {
  time: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.timeOption, selected && styles.timeOptionSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.timeOptionText,
          selected && styles.timeOptionTextSelected,
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingTop: 16,
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
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  dashboardMetricCard: {
    flexGrow: 1,
    flexBasis: '47%',
    minWidth: 160,
  },
  dashboardMetricLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  dashboardMetricValue: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  dashboardMetricHint: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  dashboardSectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dashboardPill: {
    backgroundColor: colors.tipBg,
    borderRadius: 999,
    color: colors.tipText,
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dashboardProgressTrack: {
    backgroundColor: '#DCE8EB',
    borderRadius: 999,
    height: 8,
    marginTop: 12,
    overflow: 'hidden',
  },
  dashboardProgressFill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: '100%',
  },
  dashboardRequestRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  dashboardRequestDot: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 10,
    marginTop: 6,
    width: 10,
  },
  dashboardRequestInfo: {
    flex: 1,
  },
  dashboardRequestMeta: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  collaboratorsSummaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  collaboratorSummaryCard: {
    flexGrow: 1,
    flexBasis: '48%',
    minWidth: 160,
  },
  collaboratorRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  collaboratorAvatar: {
    alignItems: 'center',
    backgroundColor: '#E7F6FA',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  collaboratorAvatarText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  collaboratorInfo: {
    flex: 1,
  },
  collaboratorChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  collaboratorChip: {
    backgroundColor: colors.tipBg,
    borderRadius: 999,
    color: colors.tipText,
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  collaboratorStatusBox: {
    backgroundColor: '#F8FAFC',
    borderColor: colors.outline,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  collaboratorStatusLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  collaboratorStatusValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  collaboratorStatusMeta: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  moodCheckInRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  moodCheckInIcon: {
    alignItems: 'center',
    backgroundColor: '#E7F6FA',
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  moodCheckInIconText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  moodCheckInInfo: {
    flex: 1,
  },
  moodCheckInHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  moodCheckInBadge: {
    backgroundColor: colors.tipBg,
    borderRadius: 999,
    color: colors.tipText,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  moodCheckInNote: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
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
  scheduleHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    marginBottom: 12,
  },
  fieldLabel: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  helperText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  templateRow: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 14,
  },
  templateText: {
    flex: 1,
    paddingRight: 16,
  },
  questionCard: {
    backgroundColor: '#F8FAFC',
    borderColor: colors.outline,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 0,
    marginBottom: 16,
  },
  questionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  questionNumber: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  questionNumberText: {
    color: colors.surface,
    fontWeight: '800',
  },
  questionHeading: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  optionInput: {
    backgroundColor: colors.surface,
    flex: 1,
    marginBottom: 10,
  },
  secondaryButton: {
    borderColor: colors.primary,
    marginBottom: 8,
  },
  addQuestionButton: {
    borderColor: colors.accent,
    marginBottom: 20,
  },
  questionnaireSummary: {
    backgroundColor: colors.successBg,
    borderRadius: 14,
    marginBottom: 16,
    padding: 14,
  },
  questionnaireSummaryTitle: {
    color: colors.success,
    fontWeight: '800',
    marginBottom: 4,
  },
  questionnaireTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  templateBadge: {
    backgroundColor: colors.tipBg,
    borderRadius: 10,
    color: colors.tipText,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    textTransform: 'uppercase',
  },
  dateOptions: {
    gap: 10,
    paddingBottom: 20,
  },
  dateOption: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: colors.outline,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 76,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateWeekday: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  dateDay: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  dateMonth: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  dateTextSelected: {
    color: colors.surface,
  },
  slotPeriod: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  timeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  timeOption: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: colors.outline,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 76,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  timeOptionSelected: {
    backgroundColor: colors.tipBg,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  timeOptionText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  timeOptionTextSelected: {
    color: colors.primary,
  },
  employeeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  employeeOption: {
    borderColor: colors.outline,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  employeeOptionSelected: {
    backgroundColor: colors.tipBg,
    borderColor: colors.primary,
  },
  employeeOptionText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  employeeOptionTextSelected: {
    color: colors.primary,
  },
  employeeOptionDisabled: {
    opacity: 0.45,
  },
  assignmentSection: {
    borderTopColor: colors.outline,
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 18,
  },
  assignmentTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 20,
  },
  assignmentRow: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 12,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  assignmentStatus: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  assignmentStatusCompleted: {
    color: colors.success,
  },
  resultCard: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  resultAnswer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 10,
    padding: 14,
  },
  resultQuestion: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 6,
  },
  resultValue: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  privacyHelper: {
    backgroundColor: '#E7F6FA',
    borderRadius: 12,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    padding: 12,
  },
  typeOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  typeOption: {
    borderColor: colors.outline,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  typeOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeOptionText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  typeOptionTextSelected: {
    color: colors.surface,
  },
  scheduleSummary: {
    backgroundColor: colors.tipBg,
    borderColor: colors.tipBorder,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    padding: 14,
  },
  scheduleSummaryLabel: {
    color: colors.tipText,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  scheduleSummaryValue: {
    color: colors.tipTextDark,
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  appointmentHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentPatient: {
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 8,
  },
  appointmentDate: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    color: colors.error,
    marginBottom: 16,
    padding: 12,
  },
  successText: {
    backgroundColor: colors.successBg,
    borderRadius: 12,
    color: colors.success,
    fontWeight: '700',
    marginBottom: 16,
    padding: 12,
  },
  loader: {
    marginTop: 32,
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
