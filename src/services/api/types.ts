export type UserRole = 'ADMIN' | 'MANAGER' | 'PSYCHOLOGIST' | 'EMPLOYEE';

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
  tasks?: string[];
}

export interface ManagerUserCreate {
  username: string;
  email: string;
  phone_number: string;
  document?: string | null;
  role: UserRole;
  sponsor_team_id?: string | null;
}

export interface UserRead {
  id: string;
  sponsor_id: string | null;
  sponsor_team_id: string | null;
  username: string;
  email: string;
  phone_number: string;
  document: string | null;
  role: UserRole;
  tasks: string[];
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface ManagerUserCreateResponse {
  user: UserRead;
  temporary_password: string;
}

export interface UserUpdate {
  username?: string | null;
  email?: string | null;
  phone_number?: string | null;
  document?: string | null;
  role?: UserRole | null;
  tasks?: string[] | null;
}

export interface ManagerUserTeamUpdate {
  sponsor_team_id?: string | null;
}

export interface SponsorTeamCreate {
  name: string;
  sponsor_id: string;
}

export interface SponsorTeamRead {
  id: string;
  name: string;
  sponsor_id: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface SponsorUserCreate {
  sponsor_id?: string | null;
  username: string;
  email: string;
  phone_number: string;
  document?: string | null;
  password: string;
  role?: UserRole;
  tasks?: string[];
}

export interface SponsorCreate {
  name: string;
  cnpj: string;
  logo: string;
  user: SponsorUserCreate;
}

export interface SponsorRead {
  id: string;
  name: string;
  cnpj: string | null;
  logo: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface UserTeamCreate {
  user_id: string;
  sponsor_team_id: string;
  is_leader?: boolean;
}

export interface UserTeamRead {
  id: string;
  user_id: string;
  sponsor_team_id: string;
  is_leader: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
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

export interface ActiveUsersDay {
  label: string;
  value: number;
}

export interface DepartmentUsage {
  label: string;
  value: number;
}

export interface ManagerDashboardMetrics {
  health_index: number;
  active_users_total: number;
  active_users_percentage: number;
  active_users_by_day: ActiveUsersDay[];
  risk_alerts_count: number;
  department_usage: DepartmentUsage[];
}

export interface ManagerAIInsightResponse {
  insight: string;
}

export interface ManagerRiskAlertItem {
  id: string;
  user_name: string;
  insight: string;
  department: string;
  created_at: string;
}

export interface ReportParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface ReportCardBlock {
  type: 'card';
  variant: 'attention' | 'positive' | 'action' | 'trend';
  title: string;
  body: string;
}

export type ReportBlock = ReportParagraphBlock | ReportCardBlock;

export interface ManagerAIReportResponse {
  title: string;
  summary: string;
  blocks: ReportBlock[];
}

export interface AdminDashboardMetrics {
  total_sponsors: number;
  total_users: number;
  total_active_users: number;
  recent_sponsors: {
    id: string;
    name: string;
    logo: string;
    created_at: string;
  }[];
  alerts: {
    id: string;
    type: string;
    title: string;
    body: string;
    created_at: string;
  }[];
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
