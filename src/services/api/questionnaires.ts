import { api } from './client';

export type QuestionType = 'OPEN_ENDED' | 'CLOSED_ENDED';

export interface QuestionOptionCreate {
  label: string;
  value: string;
  position: number;
}

export interface OpenQuestionCreate {
  question_type: 'OPEN_ENDED';
  question: string;
  position: number;
}

export interface ClosedQuestionCreate {
  question_type: 'CLOSED_ENDED';
  question: string;
  position: number;
  options: QuestionOptionCreate[];
}

export type QuestionCreate = OpenQuestionCreate | ClosedQuestionCreate;

export interface QuestionRead {
  id: string;
  question_type: QuestionType;
  question: string;
  position: number;
  options?: Array<QuestionOptionCreate & { id: string }>;
}

export interface QuestionnaireCreate {
  name: string;
  is_template: boolean;
  questions: QuestionCreate[];
}

export interface Questionnaire {
  id: string;
  name: string;
  is_template: boolean;
  sponsor_id: string;
  created_by: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  questions?: QuestionRead[] | null;
}

export interface QuestionnaireAssignmentAnswer {
  question_id: string;
  question: string;
  option_id: string | null;
  option_label: string | null;
  text_answer: string | null;
}

export interface QuestionnaireAssignment {
  id: string;
  questionnaire_id: string;
  questionnaire_name: string;
  user_id: string;
  user_name: string;
  assigned_by: string;
  assigned_at: string;
  completed_at: string | null;
  submission_id: string | null;
  status: 'PENDING' | 'COMPLETED';
  questions?: QuestionRead[] | null;
  answers?: QuestionnaireAssignmentAnswer[] | null;
}

export interface SubmissionAnswerCreate {
  question_id: string;
  option_id?: string;
  text_answer?: string;
}

export async function listQuestionnaires(): Promise<Questionnaire[]> {
  const { data } = await api.get<Questionnaire[]>('/api/v1/questionnaires');
  return data;
}

export async function createQuestionnaire(
  payload: QuestionnaireCreate
): Promise<Questionnaire> {
  const { data } = await api.post<Questionnaire>(
    '/api/v1/questionnaires',
    payload
  );
  return data;
}

export async function deleteQuestionnaire(id: string): Promise<void> {
  await api.delete(`/api/v1/questionnaires/${id}`);
}

export async function assignQuestionnaire(
  questionnaireId: string,
  userIds: string[]
): Promise<QuestionnaireAssignment[]> {
  const { data } = await api.post<QuestionnaireAssignment[]>(
    `/api/v1/questionnaires/${questionnaireId}/assignments`,
    { user_ids: userIds }
  );
  return data;
}

export async function listQuestionnaireAssignments(
  questionnaireId: string
): Promise<QuestionnaireAssignment[]> {
  const { data } = await api.get<QuestionnaireAssignment[]>(
    `/api/v1/questionnaires/${questionnaireId}/assignments`
  );
  return data;
}

export async function listMyQuestionnaireAssignments(): Promise<
  QuestionnaireAssignment[]
> {
  const { data } = await api.get<QuestionnaireAssignment[]>(
    '/api/v1/questionnaires/assignments/me'
  );
  return data;
}

export async function getQuestionnaireAssignmentResult(
  questionnaireId: string,
  assignmentId: string
): Promise<QuestionnaireAssignment> {
  const { data } = await api.get<QuestionnaireAssignment>(
    `/api/v1/questionnaires/${questionnaireId}/assignments/${assignmentId}`
  );
  return data;
}

export async function submitQuestionnaire(
  questionnaireId: string,
  answers: SubmissionAnswerCreate[]
): Promise<void> {
  await api.post(`/api/v1/questionnaires/${questionnaireId}/submissions`, {
    answers,
  });
}
