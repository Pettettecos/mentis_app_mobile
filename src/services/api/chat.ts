import { api } from './client';
import type {
  ChatSendRequest,
  ChatSendResponse,
  ChatSessionDetail,
  ChatSessionSummary,
} from './types';

export async function listChatSessions(): Promise<ChatSessionSummary[]> {
  const { data } = await api.get<ChatSessionSummary[]>('/api/v1/chat/sessions');
  return data;
}

export async function getChatSession(
  sessionId: string
): Promise<ChatSessionDetail> {
  const { data } = await api.get<ChatSessionDetail>(
    `/api/v1/chat/sessions/${sessionId}`
  );
  return data;
}

export async function sendChatMessage(
  payload: ChatSendRequest
): Promise<ChatSendResponse> {
  const { data } = await api.post<ChatSendResponse>('/api/v1/chat', payload);
  return data;
}
