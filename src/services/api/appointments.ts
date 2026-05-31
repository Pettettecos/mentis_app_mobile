type Appointment = {
  id: string;
  time: string;
  title: string;
  description?: string;
  type?: string;
};

const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    time: '2026-06-01T09:00:00Z',
    title: 'Sessão com Julia Ramos',
    description: 'Acompanhamento de ansiedade social',
    type: 'Online',
  },
  {
    id: 'a2',
    time: '2026-06-01T11:00:00Z',
    title: 'Avaliação inicial - Ana Luiza',
    description: 'Triagem inicial',
    type: 'Presencial',
  },
];

export async function listAppointments(): Promise<Appointment[]> {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 150));
  return mockAppointments;
}

export async function createAppointment(payload: {
  time: string;
  title: string;
  description?: string;
  type?: string;
}): Promise<Appointment> {
  await new Promise((r) => setTimeout(r, 150));

  const newItem: Appointment = {
    id: `a${Math.floor(Math.random() * 10000)}`,
    ...payload,
  };

  mockAppointments.push(newItem);
  return newItem;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 120));
  const idx = mockAppointments.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  mockAppointments.splice(idx, 1);
  return true;
}

export type { Appointment };
