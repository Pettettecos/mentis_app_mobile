export type UserRole =
  | 'ADMIN'
  | 'ENTERPRISE'
  | 'MANAGER'
  | 'PSYCHOLOGIST'
  | 'EMPLOYEE';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface UserCreate {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  sponsor_id?: string | null;
  document?: string | null;
  role?: UserRole;
  tasks?: Record<string, unknown>;
}

export interface UserRead {
  id: string;
  sponsor_id: string | null;
  username: string;
  email: string;
  phone_number: string;
  document: string | null;
  role: UserRole;
  tasks: Record<string, unknown>;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface UserUpdate {
  username?: string | null;
  email?: string | null;
  phone_number?: string | null;
  document?: string | null;
  role?: UserRole | null;
  tasks?: Record<string, unknown> | null;
}

export type QuestionType = 'OPEN_ENDED' | 'CLOSED_ENDED';

export interface QuestionOptionRead {
  id: string;
  label: string;
  value: string;
  position: number;
}

interface BaseQuestionRead {
  id: string;
  question_type: QuestionType;
  question: string;
  position: number;
}

export interface OpenQuestionRead extends BaseQuestionRead {
  question_type: 'OPEN_ENDED';
}

export interface ClosedQuestionRead extends BaseQuestionRead {
  question_type: 'CLOSED_ENDED';
  options: QuestionOptionRead[];
}

export type QuestionRead = OpenQuestionRead | ClosedQuestionRead;

export interface QuestionnaireRead {
  id: string;
  name: string;
  is_template: boolean;
  sponsor_id: string;
  created_by: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  questions: QuestionRead[] | null;
}

export type ChatRole = 'system' | 'human' | 'ai';

export interface ChatMessageRead {
  id: string;
  session_id: string;
  role: ChatRole;
  content: string;
  created_at: string;
}

export interface ChatSessionSummary {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSessionDetail extends ChatSessionSummary {
  messages: ChatMessageRead[];
}

export interface ChatSendRequest {
  session_id?: string | null;
  message: string;
}

export interface ChatSendResponse {
  session_id: string;
  answer: string;
}

export interface SubmissionAnswerCreate {
  question_id: string;
  option_id?: string | null;
  text_answer?: string | null;
}

export interface SubmissionCreate {
  answers: SubmissionAnswerCreate[];
}

export interface SubmissionAnswerRead extends SubmissionAnswerCreate {
  id: string;
  submission_id: string;
}

export interface SubmissionRead {
  id: string;
  answers: SubmissionAnswerRead[] | null;
  user_id: string;
  created_at: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}
