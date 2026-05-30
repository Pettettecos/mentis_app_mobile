export type ChatBubbleRole = 'human' | 'ai';

export interface ChatBubble {
  id: string;
  role: ChatBubbleRole;
  content: string;
  createdAt: string;
  pending?: boolean;
  showTimestamp?: boolean;
}
