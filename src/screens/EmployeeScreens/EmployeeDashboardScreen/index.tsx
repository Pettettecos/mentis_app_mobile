import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button, Card, Icon, Text, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { styles } from './styles';
import { useAuth } from '@/context/AuthContext';
import {
  guidedExercises,
  journeyIcon,
  journeyIconColor,
  moodIconColor,
  moodOptions,
} from '../constants';
import { appointmentService, streakService, moodService } from '@/services/api';
import type {
  AppointmentRead,
  AppointmentRequestRead,
  UserStreakDto,
  MoodType,
} from '@/services/api';
import { colors } from '@/theme/colors';

const moodMap: Record<string, MoodType> = {
  'employeeDashboard.moodHappy': 'HAPPY',
  'employeeDashboard.moodCalm': 'CALM',
  'employeeDashboard.moodTired': 'TIRED',
  'employeeDashboard.moodStressed': 'STRESSED',
};

function localDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatAppointmentDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function EmployeeDashboardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const requestActionSheetRef = useRef<ActionSheetRef>(null);
  const { user } = useAuth();
  const [streak, setStreak] = useState<UserStreakDto | null>(null);
  const [appointments, setAppointments] = useState<AppointmentRead[]>([]);
  const [appointmentRequests, setAppointmentRequests] = useState<
    AppointmentRequestRead[]
  >([]);
  const [checkingIn, setCheckingIn] = useState(false);
  const [todayMood, setTodayMood] = useState<MoodType | null>(null);
  const [requestDate, setRequestDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return localDateKey(tomorrow);
  });
  const [requestTime, setRequestTime] = useState('09:00');
  const [requestMessage, setRequestMessage] = useState('');
  const [requestingAppointment, setRequestingAppointment] = useState(false);

  useEffect(() => {
    loadStreak();
    loadAppointments();
  }, []);

  const loadStreak = async () => {
    try {
      const data = await streakService.getUserStreak();
      setStreak(data);
    } catch {
      // Streak unavailable, show defaults
    }
  };

  const loadAppointments = async () => {
    try {
      const [appointmentsResponse, requestsResponse] = await Promise.all([
        appointmentService.listMyPatientAppointments(),
        appointmentService.listMyAppointmentRequests(),
      ]);
      setAppointments(appointmentsResponse);
      setAppointmentRequests(requestsResponse);
    } catch {
      // Agenda unavailable, keep dashboard usable.
    }
  };

  const upcomingAppointments = appointments
    .filter((appointment) => new Date(appointment.time).getTime() >= Date.now())
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    .slice(0, 3);

  const pendingRequests = appointmentRequests.filter(
    (request) => request.status === 'PENDING'
  );

  const requestAppointment = async () => {
    const [hour, minute] = requestTime.split(':').map(Number);
    if (
      Number.isNaN(hour) ||
      Number.isNaN(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      Toast.show({
        type: 'error',
        text1: 'Horário inválido',
        text2: 'Use o formato HH:mm.',
        position: 'top',
      });
      return;
    }

    const preferredTime = new Date(`${requestDate}T00:00:00`);
    if (Number.isNaN(preferredTime.getTime())) {
      Toast.show({
        type: 'error',
        text1: 'Data inválida',
        text2: 'Use o formato AAAA-MM-DD.',
        position: 'top',
      });
      return;
    }
    preferredTime.setHours(hour, minute, 0, 0);

    setRequestingAppointment(true);
    try {
      const created = await appointmentService.createAppointmentRequest({
        preferred_time: preferredTime.toISOString(),
        message: requestMessage.trim() || null,
      });
      setAppointmentRequests((current) => [created, ...current]);
      requestActionSheetRef.current?.hide();
      Toast.show({
        type: 'success',
        text1: 'Solicitação enviada',
        text2: 'A psicóloga poderá aprovar o horário.',
        position: 'top',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível solicitar',
        text2: 'Tente novamente em instantes.',
        position: 'top',
      });
    } finally {
      setRequestingAppointment(false);
    }
  };

  const handleCheckin = async (mood: MoodType) => {
    if (checkingIn) return;
    setCheckingIn(true);
    try {
      await moodService.registerMood({ mood });
      setTodayMood(mood);
      await loadStreak();
      Toast.show({
        type: 'success',
        text1: t('employeeDashboard.checkinSuccessTitle'),
        text2: t('employeeDashboard.checkinSuccessBody'),
        position: 'top',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: t('employeeDashboard.checkinErrorTitle'),
        text2: t('employeeDashboard.checkinErrorBody'),
        position: 'top',
      });
    } finally {
      setCheckingIn(false);
    }
  };

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
          {t('employeeDashboard.greetingTitle', {
            username: user?.username,
          })}
        </Text>
        <Text style={styles.greetingSubtitle}>
          {t('employeeDashboard.greetingSubtitle')}
        </Text>
      </View>

      <Card style={styles.checkinCard}>
        <View style={styles.checkinBadge}>
          <Text style={styles.checkinBadgeText}>
            {t('employeeDashboard.today')}
          </Text>
        </View>
        <Card.Content style={styles.checkinCardContent}>
          <Text style={styles.checkinTitle}>
            {t('employeeDashboard.checkinTitle')}
          </Text>
          <View style={styles.moodOptions}>
            {moodOptions.map((mood) => {
              const isSelected = todayMood === moodMap[mood.label];
              return (
                <TouchableOpacity
                  key={mood.label}
                  style={[
                    styles.moodButton,
                    isSelected && styles.moodButtonSelected,
                  ]}
                  onPress={() => handleCheckin(moodMap[mood.label])}
                  disabled={checkingIn}
                >
                  <Icon
                    source={mood.icon}
                    size={32}
                    color={isSelected ? '#FFFFFF' : moodIconColor}
                  />
                  <Text
                    style={[
                      styles.moodLabel,
                      isSelected && styles.moodLabelSelected,
                    ]}
                  >
                    {t(mood.label)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.journeyCard}>
        <Card.Content style={styles.journeyCardContent}>
          <View style={styles.journeyHeader}>
            <View style={styles.journeyIconBg}>
              <Icon source={journeyIcon} size={28} color={journeyIconColor} />
            </View>
            <View style={styles.journeyTextGroup}>
              <Text style={styles.journeyLabel}>
                {t('employeeDashboard.yourJourney')}
              </Text>
              <Text style={styles.journeyTitle}>
                {t('employeeDashboard.journeyTitle')}
              </Text>
            </View>
          </View>

          <View style={styles.journeyStats}>
            <View style={styles.journeyStatBox}>
              <Text style={styles.journeyStatLabel}>
                {t('employeeDashboard.currentStreak')}
              </Text>
              <Text
                style={[styles.journeyStatValue, styles.journeyStatValuePurple]}
              >
                {streak
                  ? `${streak.current_streak} ${t('employeeDashboard.days')}`
                  : t('employeeDashboard.currentStreakValue')}
              </Text>
            </View>

            <View style={styles.journeyStatBox}>
              <Text style={styles.journeyStatLabel}>
                {t('employeeDashboard.longestStreak')}
              </Text>
              <Text style={styles.journeyStatValue}>
                {streak
                  ? `${streak.longest_streak} ${t('employeeDashboard.days')}`
                  : t('employeeDashboard.longestStreakValue')}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.appointmentsCard}>
        <Card.Content style={styles.appointmentsContent}>
          <View style={styles.appointmentsHeader}>
            <View style={styles.appointmentIconBg}>
              <Icon source="calendar-clock" size={26} color={colors.primary} />
            </View>
            <View style={styles.appointmentsTitleGroup}>
              <Text style={styles.appointmentsLabel}>Agenda clínica</Text>
              <Text style={styles.appointmentsTitle}>Seus agendamentos</Text>
            </View>
          </View>

          {upcomingAppointments.length === 0 ? (
            <View style={styles.appointmentEmptyBox}>
              <Text style={styles.appointmentEmptyText}>
                Nenhum acolhimento agendado no momento.
              </Text>
            </View>
          ) : (
            upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentRow}>
                <View style={styles.appointmentDatePill}>
                  <Text style={styles.appointmentDateText}>
                    {formatAppointmentDate(appointment.time)}
                  </Text>
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentTitle}>
                    {appointment.title}
                  </Text>
                  <Text style={styles.appointmentMeta}>
                    {appointment.psychologist_name}
                  </Text>
                </View>
              </View>
            ))
          )}

          {pendingRequests.length > 0 && (
            <Text style={styles.pendingRequestText}>
              {pendingRequests.length} solicitação
              {pendingRequests.length === 1 ? '' : 'ões'} pendente
              {pendingRequests.length === 1 ? '' : 's'}
            </Text>
          )}

          <Button
            icon="calendar-plus"
            mode="contained"
            onPress={() => requestActionSheetRef.current?.show()}
            style={styles.requestButton}
          >
            Solicitar agendamento
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.exercisesSection}>
        <Text style={styles.exercisesTitle}>
          {t('employeeDashboard.guidedExercises')}
        </Text>

        {guidedExercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => exercise.route && router.push(exercise.route)}
          >
            <Image source={exercise.image} style={styles.exerciseImage} />
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseCategory}>
                <Icon
                  source={exercise.icon}
                  size={16}
                  color={exercise.categoryColor}
                />
                <Text
                  style={[
                    styles.exerciseCategoryText,
                    { color: exercise.categoryColor },
                  ]}
                >
                  {t(exercise.category)}
                </Text>
              </View>
              <Text style={styles.exerciseTitle}>{t(exercise.title)}</Text>
              <Text style={styles.exerciseSubtitle}>
                {t(exercise.subtitle)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ActionSheet
        ref={requestActionSheetRef}
        gestureEnabled
        closeOnPressBack
        keyboardHandlerEnabled
        drawUnderStatusBar={false}
        containerStyle={styles.sheetContainer}
        indicatorStyle={styles.sheetIndicator}
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
            <Text style={styles.modalTitle}>Solicitar agendamento</Text>
            <TextInput
              label="Data preferida (AAAA-MM-DD)"
              mode="outlined"
              onChangeText={setRequestDate}
              style={styles.modalInput}
              value={requestDate}
            />
            <TextInput
              label="Horário preferido (HH:mm)"
              mode="outlined"
              onChangeText={setRequestTime}
              style={styles.modalInput}
              value={requestTime}
            />
            <TextInput
              label="Mensagem opcional"
              mode="outlined"
              multiline
              numberOfLines={4}
              onChangeText={setRequestMessage}
              style={styles.modalInput}
              value={requestMessage}
            />
            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={() => requestActionSheetRef.current?.hide()}
                disabled={requestingAppointment}
                style={styles.modalActionButton}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={requestAppointment}
                loading={requestingAppointment}
                disabled={requestingAppointment}
                style={styles.modalActionButton}
              >
                Enviar
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ActionSheet>
    </ScrollView>
  );
}
