import { api } from './client';

export interface Appointment {
  id: string;
  psychologist_id: string;
  user_id: string;
  user_name: string;
  time: string;
  title: string;
  description: string | null;
  type: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface AppointmentCreate {
  user_id: string;
  time: string;
  title: string;
  description?: string;
  type?: string;
}

export async function listAppointments(): Promise<Appointment[]> {
  const { data } = await api.get<Appointment[]>('/api/v1/appointments');
  return data;
}

export async function listMyAppointments(): Promise<Appointment[]> {
  const { data } = await api.get<Appointment[]>('/api/v1/appointments/me');
  return data;
}

export async function createAppointment(
  payload: AppointmentCreate
): Promise<Appointment> {
  const { data } = await api.post<Appointment>('/api/v1/appointments', payload);
  return data;
}

export async function deleteAppointment(id: string): Promise<void> {
  await api.delete(`/api/v1/appointments/${id}`);
}
