import { api } from './client';
import type {
  AppointmentCreate,
  AppointmentRead,
  AppointmentRequestCreate,
  AppointmentRequestRead,
} from './types';

export async function listMyAppointments(): Promise<AppointmentRead[]> {
  const { data } = await api.get<AppointmentRead[]>('/api/v1/appointments');
  return data;
}

export async function listMyPatientAppointments(): Promise<AppointmentRead[]> {
  const { data } = await api.get<AppointmentRead[]>('/api/v1/appointments/me');
  return data;
}

export async function createAppointment(
  payload: AppointmentCreate
): Promise<AppointmentRead> {
  const { data } = await api.post<AppointmentRead>(
    '/api/v1/appointments',
    payload
  );
  return data;
}

export async function deleteAppointment(appointmentId: string): Promise<void> {
  await api.delete(`/api/v1/appointments/${appointmentId}`);
}

export async function createAppointmentRequest(
  payload: AppointmentRequestCreate
): Promise<AppointmentRequestRead> {
  const { data } = await api.post<AppointmentRequestRead>(
    '/api/v1/appointments/requests',
    payload
  );
  return data;
}

export async function listMyAppointmentRequests(): Promise<
  AppointmentRequestRead[]
> {
  const { data } = await api.get<AppointmentRequestRead[]>(
    '/api/v1/appointments/requests/me'
  );
  return data;
}

export async function listPsychologistAppointmentRequests(): Promise<
  AppointmentRequestRead[]
> {
  const { data } = await api.get<AppointmentRequestRead[]>(
    '/api/v1/appointments/requests'
  );
  return data;
}

export async function approveAppointmentRequest(
  requestId: string
): Promise<AppointmentRequestRead> {
  const { data } = await api.post<AppointmentRequestRead>(
    `/api/v1/appointments/requests/${requestId}/approve`
  );
  return data;
}

export async function rejectAppointmentRequest(
  requestId: string
): Promise<AppointmentRequestRead> {
  const { data } = await api.post<AppointmentRequestRead>(
    `/api/v1/appointments/requests/${requestId}/reject`
  );
  return data;
}
