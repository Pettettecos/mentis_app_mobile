import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Checkbox,
  Icon,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { appointmentService, userService } from '@/services/api';
import type {
  AppointmentRead,
  AppointmentRequestRead,
  UserRead,
} from '@/services/api';
import { colors } from '@/theme/colors';
import { styles } from './styles';

interface DayItem {
  date: Date;
  key: string;
  week: string;
  number: string;
}

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function nextDays(): DayItem[] {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return {
      date,
      key: dateKey(date),
      week: formatter.format(date).replace('.', '').toUpperCase(),
      number: String(date.getDate()).padStart(2, '0'),
    };
  });
}

function timeLabel(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function PsychologistAppointmentsScreen() {
  const insets = useSafeAreaInsets();
  const days = useMemo(() => nextDays(), []);
  const [selectedDay, setSelectedDay] = useState(
    days[0]?.key ?? dateKey(new Date())
  );
  const [appointments, setAppointments] = useState<AppointmentRead[]>([]);
  const [appointmentRequests, setAppointmentRequests] = useState<
    AppointmentRequestRead[]
  >([]);
  const [employees, setEmployees] = useState<UserRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [title, setTitle] = useState('Acolhimento individual');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('acolhimento');
  const [time, setTime] = useState('09:00');
  const [saving, setSaving] = useState(false);
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(
    null
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const [appointmentsResponse, requestsResponse, usersResponse] =
        await Promise.all([
          appointmentService.listMyAppointments(),
          appointmentService.listPsychologistAppointmentRequests(),
          userService.listUsers(),
        ]);
      setAppointments(appointmentsResponse);
      setAppointmentRequests(requestsResponse);
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

  const appointmentsByDay = useMemo(() => {
    return appointments.reduce<Record<string, AppointmentRead[]>>(
      (acc, appointment) => {
        const key = dateKey(new Date(appointment.time));
        acc[key] = [...(acc[key] ?? []), appointment].sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        return acc;
      },
      {}
    );
  }, [appointments]);

  const selectedAppointments = appointmentsByDay[selectedDay] ?? [];
  const pendingRequests = appointmentRequests.filter(
    (request) => request.status === 'PENDING'
  );

  const openModal = () => {
    setSelectedEmployeeId(employees[0]?.id ?? '');
    setTitle('Acolhimento individual');
    setDescription('');
    setType('acolhimento');
    setTime('09:00');
    setModalVisible(true);
  };

  const closeModal = () => {
    if (!saving) {
      setModalVisible(false);
    }
  };

  const createAppointment = async () => {
    if (!selectedEmployeeId) {
      Alert.alert('Selecione um colaborador', 'Escolha uma pessoa da lista.');
      return;
    }
    if (!title.trim()) {
      Alert.alert(
        'Título obrigatório',
        'Informe um título para o acolhimento.'
      );
      return;
    }

    const [hour, minute] = time.split(':').map(Number);
    if (
      Number.isNaN(hour) ||
      Number.isNaN(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      Alert.alert('Horário inválido', 'Use o formato HH:mm.');
      return;
    }

    const day = new Date(`${selectedDay}T00:00:00`);
    day.setHours(hour, minute, 0, 0);

    setSaving(true);
    try {
      const created = await appointmentService.createAppointment({
        user_id: selectedEmployeeId,
        time: day.toISOString(),
        title: title.trim(),
        description: description.trim() || null,
        type: type.trim() || null,
      });
      setAppointments((current) => [...current, created]);
      closeModal();
    } catch {
      Alert.alert('Erro ao criar agenda', 'Tente novamente em instantes.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (appointment: AppointmentRead) => {
    Alert.alert(
      'Remover acolhimento',
      `Deseja remover "${appointment.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            void deleteAppointment(appointment.id);
          },
        },
      ]
    );
  };

  const deleteAppointment = async (appointmentId: string) => {
    try {
      await appointmentService.deleteAppointment(appointmentId);
      setAppointments((current) =>
        current.filter((item) => item.id !== appointmentId)
      );
    } catch {
      Alert.alert('Erro ao remover', 'Tente novamente em instantes.');
    }
  };

  const approveRequest = async (requestId: string) => {
    setUpdatingRequestId(requestId);
    try {
      const updated =
        await appointmentService.approveAppointmentRequest(requestId);
      setAppointmentRequests((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      );
      const refreshedAppointments =
        await appointmentService.listMyAppointments();
      setAppointments(refreshedAppointments);
    } catch {
      Alert.alert('Erro ao aprovar', 'Tente novamente em instantes.');
    } finally {
      setUpdatingRequestId(null);
    }
  };

  const rejectRequest = async (requestId: string) => {
    setUpdatingRequestId(requestId);
    try {
      const updated =
        await appointmentService.rejectAppointmentRequest(requestId);
      setAppointmentRequests((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch {
      Alert.alert('Erro ao rejeitar', 'Tente novamente em instantes.');
    } finally {
      setUpdatingRequestId(null);
    }
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
          <Text style={styles.title}>Gerenciar Agenda</Text>
          <Text style={styles.subtitle}>
            Controle sua disponibilidade e valide novos acolhimentos.
          </Text>
          <Button
            icon="calendar-plus"
            mode="contained"
            onPress={openModal}
            contentStyle={styles.createButtonContent}
            style={styles.createButton}
          >
            Novo acolhimento
          </Button>
        </View>

        {loading && (
          <View style={styles.stateCard}>
            <View style={styles.stateContent}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.stateText}>Carregando agenda...</Text>
            </View>
          </View>
        )}

        {!loading && error && (
          <View style={styles.stateCard}>
            <View style={styles.stateContent}>
              <Text style={styles.stateText}>
                Não foi possível carregar sua agenda.
              </Text>
              <Button mode="contained" onPress={loadData}>
                Tentar novamente
              </Button>
            </View>
          </View>
        )}

        {!loading && !error && (
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.panelTitle}>Próximos 7 dias</Text>
                <Text style={styles.stateText}>Visão semanal</Text>
              </View>
              <View style={styles.todayPill}>
                <Text style={styles.todayPillText}>HOJE</Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.daysList}
              contentContainerStyle={styles.daysContent}
            >
              {days.map((day) => {
                const active = day.key === selectedDay;
                const count = appointmentsByDay[day.key]?.length ?? 0;
                return (
                  <Pressable
                    key={day.key}
                    onPress={() => setSelectedDay(day.key)}
                    style={[styles.dayCard, active && styles.dayCardActive]}
                  >
                    <Text
                      style={[styles.dayWeek, active && styles.dayTextActive]}
                    >
                      {day.week}
                    </Text>
                    <Text
                      style={[styles.dayNumber, active && styles.dayTextActive]}
                    >
                      {day.number}
                    </Text>
                    <Text
                      style={[styles.dayCount, active && styles.dayTextActive]}
                    >
                      {count} agenda{count === 1 ? '' : 's'}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {pendingRequests.length > 0 && (
              <View style={styles.requestsSection}>
                <Text style={styles.panelTitle}>Solicitações pendentes</Text>
                {pendingRequests.map((request) => (
                  <View key={request.id} style={styles.requestCard}>
                    <View style={styles.appointmentTop}>
                      <View style={styles.timeBox}>
                        <Text style={styles.timeText}>
                          {timeLabel(request.preferred_time)}
                        </Text>
                      </View>
                      <View style={styles.appointmentMain}>
                        <Text style={styles.appointmentTitle}>
                          {request.user_name}
                        </Text>
                        <Text style={styles.appointmentMeta}>
                          {new Intl.DateTimeFormat('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                          }).format(new Date(request.preferred_time))}
                        </Text>
                        {!!request.message && (
                          <Text style={styles.appointmentMeta}>
                            {request.message}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.requestActions}>
                      <Button
                        mode="outlined"
                        onPress={() => rejectRequest(request.id)}
                        loading={updatingRequestId === request.id}
                        disabled={updatingRequestId !== null}
                        style={styles.requestActionButton}
                      >
                        Rejeitar
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => approveRequest(request.id)}
                        loading={updatingRequestId === request.id}
                        disabled={updatingRequestId !== null}
                        style={styles.requestActionButton}
                      >
                        Aprovar
                      </Button>
                    </View>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.appointmentList}>
              {selectedAppointments.length === 0 ? (
                <View style={styles.emptyBox}>
                  <Icon source="calendar-blank" size={28} color="#6E787F" />
                  <Text style={styles.stateText}>
                    Nenhum acolhimento marcado para este dia.
                  </Text>
                </View>
              ) : (
                selectedAppointments.map((appointment) => (
                  <View key={appointment.id} style={styles.appointmentCard}>
                    <View style={styles.appointmentTop}>
                      <View style={styles.timeBox}>
                        <Text style={styles.timeText}>
                          {timeLabel(appointment.time)}
                        </Text>
                      </View>
                      <View style={styles.appointmentMain}>
                        <Text style={styles.appointmentTitle}>
                          {appointment.title}
                        </Text>
                        <Text style={styles.appointmentMeta}>
                          {appointment.user_name}
                        </Text>
                        {!!appointment.description && (
                          <Text style={styles.appointmentMeta}>
                            {appointment.description}
                          </Text>
                        )}
                      </View>
                      <IconButton
                        icon="trash-can-outline"
                        onPress={() => confirmDelete(appointment)}
                        size={20}
                      />
                    </View>
                    {!!appointment.type && (
                      <View style={styles.typePill}>
                        <Text style={styles.typePillText}>
                          {appointment.type}
                        </Text>
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalBackdrop}>
          <ScrollView contentContainerStyle={styles.modalCard}>
            <Text style={styles.modalTitle}>Novo acolhimento</Text>
            <TextInput
              label="Título"
              mode="outlined"
              onChangeText={setTitle}
              style={styles.input}
              value={title}
            />
            <TextInput
              label="Horário (HH:mm)"
              mode="outlined"
              onChangeText={setTime}
              placeholder="09:00"
              style={styles.input}
              value={time}
            />
            <TextInput
              label="Tipo"
              mode="outlined"
              onChangeText={setType}
              style={styles.input}
              value={type}
            />
            <TextInput
              label="Descrição"
              mode="outlined"
              multiline
              numberOfLines={3}
              onChangeText={setDescription}
              style={styles.input}
              value={description}
            />

            <Text style={styles.panelTitle}>Colaborador</Text>
            <ScrollView style={styles.employeeList}>
              {employees.map((employee) => {
                const checked = employee.id === selectedEmployeeId;
                return (
                  <Pressable
                    key={employee.id}
                    onPress={() => setSelectedEmployeeId(employee.id)}
                    style={[
                      styles.employeeRow,
                      checked && styles.employeeRowSelected,
                    ]}
                  >
                    <Checkbox status={checked ? 'checked' : 'unchecked'} />
                    <Text style={styles.employeeName}>{employee.username}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

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
                onPress={createAppointment}
                style={styles.rowButton}
                loading={saving}
                disabled={saving}
              >
                Criar
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
