import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import {
  Button,
  Checkbox,
  Icon,
  IconButton,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import { questionnaireService, userService } from '@/services/api';
import type {
  QuestionRead,
  QuestionCreate,
  QuestionnaireRead,
  SubmissionAnswerRead,
  SubmissionRead,
  UserRead,
} from '@/services/api';
import { colors } from '@/theme/colors';
import { styles } from './styles';

type ModalMode = 'create' | 'edit' | null;

type SubmissionWithAnswers = SubmissionRead & {
  answers: SubmissionAnswerRead[];
};

interface DraftQuestion {
  id: string;
  question: string;
  type: 'OPEN_ENDED' | 'CLOSED_ENDED';
  optionsText: string;
}

function defaultQuestion(): DraftQuestion {
  return {
    id: String(Date.now()),
    question: '',
    type: 'OPEN_ENDED',
    optionsText: 'Nunca\nRaramente\nÀs vezes\nFrequentemente',
  };
}

function buildDescription(questionnaire: QuestionnaireRead): string {
  if (questionnaire.is_template) {
    return 'Modelo clínico disponível para atribuição e acompanhamento.';
  }
  return 'Questionário personalizado criado para acompanhamento dos colaboradores.';
}

function buildQuestionPayload(questions: DraftQuestion[]): QuestionCreate[] {
  return questions
    .map((question, index) => {
      const text = question.question.trim();
      if (!text) {
        return null;
      }

      if (question.type === 'CLOSED_ENDED') {
        const options = question.optionsText
          .split('\n')
          .map((option) => option.trim())
          .filter(Boolean)
          .map((option, optionIndex) => ({
            label: option,
            value: option.toLowerCase().replace(/\s+/g, '_'),
            position: optionIndex + 1,
          }));

        if (options.length === 0) {
          return null;
        }

        return {
          question_type: 'CLOSED_ENDED',
          question: text,
          position: index + 1,
          options,
        } satisfies QuestionCreate;
      }

      return {
        question_type: 'OPEN_ENDED',
        question: text,
        position: index + 1,
      } satisfies QuestionCreate;
    })
    .filter((question): question is QuestionCreate => question !== null);
}

function formatSubmittedAt(value: string): string {
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

function getAnswerText(
  answer: SubmissionAnswerRead | undefined,
  question: QuestionRead
): string {
  if (!answer) {
    return 'Sem resposta registrada';
  }

  if (answer.text_answer) {
    return answer.text_answer;
  }

  if (question.question_type === 'CLOSED_ENDED') {
    return (
      question.options.find((option) => option.id === answer.option_id)
        ?.label ?? 'Opção não encontrada'
    );
  }

  return 'Sem resposta registrada';
}

export function PsychologistQuestionnairesScreen() {
  const insets = useSafeAreaInsets();
  const editorActionSheetRef = useRef<ActionSheetRef>(null);
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireRead[]>([]);
  const [employees, setEmployees] = useState<UserRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<QuestionnaireRead | null>(null);
  const [assigningQuestionnaire, setAssigningQuestionnaire] =
    useState<QuestionnaireRead | null>(null);
  const [responsesQuestionnaire, setResponsesQuestionnaire] =
    useState<QuestionnaireRead | null>(null);
  const [responsesQuestionnaireDetails, setResponsesQuestionnaireDetails] =
    useState<QuestionnaireRead | null>(null);
  const [responses, setResponses] = useState<SubmissionWithAnswers[]>([]);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [responsesError, setResponsesError] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [isTemplate, setIsTemplate] = useState(true);
  const [questions, setQuestions] = useState<DraftQuestion[]>([
    defaultQuestion(),
  ]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const [questionnairesResponse, usersResponse] = await Promise.all([
        questionnaireService.listQuestionnaires(),
        userService.listUsers(),
      ]);
      setQuestionnaires(questionnairesResponse);
      setEmployees(usersResponse.filter((user) => user.role === 'EMPLOYEE'));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadData();
    }, [loadData])
  );

  const openCreateModal = () => {
    setSelectedQuestionnaire(null);
    setName('');
    setIsTemplate(true);
    setQuestions([defaultQuestion()]);
    setModalMode('create');
    editorActionSheetRef.current?.show();
  };

  const openEditModal = (questionnaire: QuestionnaireRead) => {
    setSelectedQuestionnaire(questionnaire);
    setName(questionnaire.name);
    setIsTemplate(questionnaire.is_template);
    setQuestions([defaultQuestion()]);
    setModalMode('edit');
    editorActionSheetRef.current?.show();
  };

  const closeModal = () => {
    if (saving) {
      return;
    }
    setModalMode(null);
    setSelectedQuestionnaire(null);
    editorActionSheetRef.current?.hide();
  };

  const saveQuestionnaire = async () => {
    if (!name.trim()) {
      Alert.alert('Nome obrigatório', 'Informe um nome para o questionário.');
      return;
    }

    setSaving(true);
    try {
      if (modalMode === 'edit' && selectedQuestionnaire) {
        const updated = await questionnaireService.updateQuestionnaire(
          selectedQuestionnaire.id,
          { name: name.trim(), is_template: isTemplate }
        );
        setQuestionnaires((current) =>
          current.map((item) => (item.id === updated.id ? updated : item))
        );
      } else {
        const payloadQuestions = buildQuestionPayload(questions);
        if (payloadQuestions.length === 0) {
          Alert.alert(
            'Pergunta obrigatória',
            'Adicione pelo menos uma pergunta válida.'
          );
          return;
        }
        const created = await questionnaireService.createQuestionnaire({
          name: name.trim(),
          is_template: isTemplate,
          questions: payloadQuestions,
        });
        setQuestionnaires((current) => [created, ...current]);
      }
      closeModal();
    } catch {
      Alert.alert(
        'Não foi possível salvar',
        'Revise os dados e tente novamente.'
      );
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (questionnaire: QuestionnaireRead) => {
    Alert.alert(
      'Excluir questionário',
      `Deseja excluir "${questionnaire.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            void deleteQuestionnaire(questionnaire.id);
          },
        },
      ]
    );
  };

  const deleteQuestionnaire = async (questionnaireId: string) => {
    try {
      await questionnaireService.deleteQuestionnaire(questionnaireId);
      setQuestionnaires((current) =>
        current.filter((item) => item.id !== questionnaireId)
      );
    } catch {
      Alert.alert('Erro ao excluir', 'Tente novamente em instantes.');
    }
  };

  const openAssignModal = (questionnaire: QuestionnaireRead) => {
    setAssigningQuestionnaire(questionnaire);
    setSelectedEmployees([]);
  };

  const closeResponsesModal = () => {
    if (responsesLoading) {
      return;
    }

    setResponsesQuestionnaire(null);
    setResponsesQuestionnaireDetails(null);
    setResponses([]);
    setResponsesError(false);
  };

  const openResponsesModal = async (questionnaire: QuestionnaireRead) => {
    setResponsesQuestionnaire(questionnaire);
    setResponsesQuestionnaireDetails(null);
    setResponses([]);
    setResponsesLoading(true);
    setResponsesError(false);

    try {
      const [questionnaireDetails, submissions] = await Promise.all([
        questionnaireService.getQuestionnaire(questionnaire.id),
        questionnaireService.listQuestionnaireSubmissions(questionnaire.id),
      ]);
      const submissionsWithAnswers = await Promise.all(
        submissions.map((submission) =>
          questionnaireService.getQuestionnaireSubmission(
            questionnaire.id,
            submission.id,
            true
          )
        )
      );

      setResponsesQuestionnaireDetails(questionnaireDetails);
      setResponses(
        submissionsWithAnswers.map((submission) => ({
          ...submission,
          answers: submission.answers ?? [],
        }))
      );
    } catch {
      setResponsesError(true);
    } finally {
      setResponsesLoading(false);
    }
  };

  const assignQuestionnaire = async () => {
    if (!assigningQuestionnaire || selectedEmployees.length === 0) {
      Alert.alert('Selecione colaboradores', 'Escolha ao menos uma pessoa.');
      return;
    }

    setSaving(true);
    try {
      await questionnaireService.assignQuestionnaire(
        assigningQuestionnaire.id,
        {
          user_ids: selectedEmployees,
        }
      );
      setAssigningQuestionnaire(null);
      setSelectedEmployees([]);
      Alert.alert('Questionário atribuído', 'A atribuição foi registrada.');
    } catch {
      Alert.alert('Erro ao atribuir', 'Tente novamente em instantes.');
    } finally {
      setSaving(false);
    }
  };

  const toggleEmployee = (employeeId: string) => {
    setSelectedEmployees((current) =>
      current.includes(employeeId)
        ? current.filter((id) => id !== employeeId)
        : [...current, employeeId]
    );
  };

  const updateQuestion = (
    questionId: string,
    updates: Partial<DraftQuestion>
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId ? { ...question, ...updates } : question
      )
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: 32, paddingBottom: insets.bottom + 140 },
        ]}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Gerenciar{'\n'}Questionários</Text>
          <View style={styles.eyebrowRow}>
            <Text style={styles.eyebrow}>Plataforma</Text>
            <Text style={styles.brand}>MentisTech</Text>
          </View>
          <Button
            icon="plus"
            mode="contained"
            onPress={openCreateModal}
            contentStyle={styles.createButtonContent}
            labelStyle={styles.createButtonLabel}
            style={styles.createButton}
          >
            Criar Novo Modelo
          </Button>
        </View>

        {loading && (
          <View style={styles.stateCard}>
            <View style={styles.stateContent}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.stateText}>Carregando questionários...</Text>
            </View>
          </View>
        )}

        {!loading && error && (
          <View style={styles.stateCard}>
            <View style={styles.stateContent}>
              <Text style={styles.stateText}>
                Não foi possível carregar os modelos.
              </Text>
              <Button mode="contained" onPress={loadData}>
                Tentar novamente
              </Button>
            </View>
          </View>
        )}

        {!loading && !error && (
          <View style={styles.list}>
            {questionnaires.map((questionnaire) => (
              <View key={questionnaire.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.iconBubble}>
                    <Icon
                      source="clipboard-pulse-outline"
                      size={24}
                      color="#007EA4"
                    />
                  </View>
                  <View style={styles.actions}>
                    <IconButton
                      icon="account-plus-outline"
                      onPress={() => openAssignModal(questionnaire)}
                      size={20}
                      style={styles.iconButton}
                    />
                    <IconButton
                      icon="eye-outline"
                      onPress={() => {
                        void openResponsesModal(questionnaire);
                      }}
                      size={20}
                      style={styles.iconButton}
                    />
                    <IconButton
                      icon="pencil-outline"
                      onPress={() => openEditModal(questionnaire)}
                      size={20}
                      style={styles.iconButton}
                    />
                    <IconButton
                      icon="trash-can-outline"
                      onPress={() => confirmDelete(questionnaire)}
                      size={20}
                      style={styles.iconButton}
                    />
                  </View>
                </View>
                <Text style={styles.cardTitle}>{questionnaire.name}</Text>
                <Text style={styles.cardDescription}>
                  {buildDescription(questionnaire)}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.lastUse}>Modelo ativo</Text>
                  <View style={styles.countPill}>
                    <Text style={styles.countText}>
                      {(questionnaire.questions?.length ?? 0).toString()}{' '}
                      PERGUNTAS
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            <Pressable onPress={openCreateModal} style={styles.customCard}>
              <View style={styles.iconBubble}>
                <Icon source="plus" size={18} color="#6E787F" />
              </View>
              <Text style={styles.customTitle}>
                Novo Questionário Personalizado
              </Text>
              <Text style={styles.customBody}>
                Defina suas próprias métricas
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <ActionSheet
        ref={editorActionSheetRef}
        gestureEnabled
        closeOnPressBack
        keyboardHandlerEnabled
        drawUnderStatusBar={false}
        containerStyle={styles.sheetContainer}
        indicatorStyle={styles.sheetIndicator}
        onClose={() => {
          if (!saving) {
            setModalMode(null);
            setSelectedQuestionnaire(null);
          }
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
        >
          <ScrollView
            contentContainerStyle={[
              styles.sheetContent,
              { paddingBottom: insets.bottom + 24 },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>
              {modalMode === 'edit' ? 'Editar modelo' : 'Criar novo modelo'}
            </Text>
            <TextInput
              label="Nome"
              mode="outlined"
              onChangeText={setName}
              style={styles.input}
              value={name}
            />
            <View style={styles.employeeRow}>
              <Text style={styles.employeeText}>Modelo reutilizável</Text>
              <Switch value={isTemplate} onValueChange={setIsTemplate} />
            </View>

            {modalMode === 'create' &&
              questions.map((question, index) => (
                <View key={question.id} style={styles.questionBox}>
                  <Text style={styles.lastUse}>Pergunta {index + 1}</Text>
                  <TextInput
                    label="Texto da pergunta"
                    mode="outlined"
                    onChangeText={(value) =>
                      updateQuestion(question.id, { question: value })
                    }
                    style={styles.input}
                    value={question.question}
                  />
                  <View style={styles.row}>
                    <Button
                      mode={
                        question.type === 'OPEN_ENDED'
                          ? 'contained'
                          : 'outlined'
                      }
                      onPress={() =>
                        updateQuestion(question.id, { type: 'OPEN_ENDED' })
                      }
                      style={styles.rowButton}
                    >
                      Aberta
                    </Button>
                    <Button
                      mode={
                        question.type === 'CLOSED_ENDED'
                          ? 'contained'
                          : 'outlined'
                      }
                      onPress={() =>
                        updateQuestion(question.id, { type: 'CLOSED_ENDED' })
                      }
                      style={styles.rowButton}
                    >
                      Fechada
                    </Button>
                  </View>
                  {question.type === 'CLOSED_ENDED' && (
                    <TextInput
                      label="Opções, uma por linha"
                      mode="outlined"
                      multiline
                      numberOfLines={4}
                      onChangeText={(value) =>
                        updateQuestion(question.id, { optionsText: value })
                      }
                      style={styles.input}
                      value={question.optionsText}
                    />
                  )}
                </View>
              ))}

            {modalMode === 'create' && (
              <Button
                icon="plus"
                mode="outlined"
                onPress={() =>
                  setQuestions((current) => [...current, defaultQuestion()])
                }
              >
                Adicionar pergunta
              </Button>
            )}

            <View style={styles.row}>
              <Button
                mode="outlined"
                onPress={closeModal}
                style={styles.rowButton}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={saveQuestionnaire}
                style={styles.rowButton}
                loading={saving}
                disabled={saving}
              >
                Salvar
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ActionSheet>

      <Modal
        transparent
        visible={assigningQuestionnaire !== null}
        animationType="slide"
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Atribuir questionário</Text>
            <Text style={styles.stateText}>{assigningQuestionnaire?.name}</Text>
            <ScrollView style={styles.selectorList}>
              {employees.map((employee) => {
                const checked = selectedEmployees.includes(employee.id);
                return (
                  <Pressable
                    key={employee.id}
                    onPress={() => toggleEmployee(employee.id)}
                    style={[
                      styles.employeeRow,
                      checked && styles.employeeRowSelected,
                    ]}
                  >
                    <Checkbox status={checked ? 'checked' : 'unchecked'} />
                    <Text style={styles.employeeText}>{employee.username}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.row}>
              <Button
                mode="outlined"
                onPress={() => setAssigningQuestionnaire(null)}
                style={styles.rowButton}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={assignQuestionnaire}
                style={styles.rowButton}
                loading={saving}
                disabled={saving}
              >
                Atribuir
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={responsesQuestionnaire !== null}
        animationType="slide"
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Respostas dos pacientes</Text>
            <Text style={styles.stateText}>{responsesQuestionnaire?.name}</Text>

            {responsesLoading && (
              <View style={styles.stateContent}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.stateText}>Carregando respostas...</Text>
              </View>
            )}

            {!responsesLoading && responsesError && (
              <View style={styles.stateContent}>
                <Text style={styles.stateText}>
                  Não foi possível carregar as respostas.
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    if (responsesQuestionnaire) {
                      void openResponsesModal(responsesQuestionnaire);
                    }
                  }}
                >
                  Tentar novamente
                </Button>
              </View>
            )}

            {!responsesLoading && !responsesError && responses.length === 0 && (
              <View style={styles.stateContent}>
                <Text style={styles.stateText}>
                  Nenhum paciente respondeu este questionário ainda.
                </Text>
              </View>
            )}

            {!responsesLoading && !responsesError && responses.length > 0 && (
              <ScrollView style={styles.responsesList}>
                {responses.map((submission) => {
                  const patientName =
                    employees.find(
                      (employee) => employee.id === submission.user_id
                    )?.username ?? 'Paciente';
                  const answersByQuestion = new Map(
                    submission.answers.map((answer) => [
                      answer.question_id,
                      answer,
                    ])
                  );

                  return (
                    <View key={submission.id} style={styles.responseCard}>
                      <Text style={styles.responsePatient}>{patientName}</Text>
                      <Text style={styles.responseDate}>
                        Enviado em {formatSubmittedAt(submission.created_at)}
                      </Text>

                      {(responsesQuestionnaireDetails?.questions ?? [])
                        .slice()
                        .sort(
                          (first, second) => first.position - second.position
                        )
                        .map((question) => (
                          <View key={question.id} style={styles.answerBox}>
                            <Text style={styles.answerQuestion}>
                              {question.position}. {question.question}
                            </Text>
                            <Text style={styles.answerText}>
                              {getAnswerText(
                                answersByQuestion.get(question.id),
                                question
                              )}
                            </Text>
                          </View>
                        ))}
                    </View>
                  );
                })}
              </ScrollView>
            )}

            <Button
              mode="outlined"
              onPress={closeResponsesModal}
              disabled={responsesLoading}
            >
              Fechar
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}
