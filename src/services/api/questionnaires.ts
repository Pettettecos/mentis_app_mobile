import { api } from './client';
import type {
  QuestionRead,
  QuestionnaireRead,
  SubmissionAnswerCreate,
  SubmissionCreate,
  SubmissionRead,
} from './types';

export type { SubmissionAnswerCreate } from './types';

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

export interface QuestionnaireCreate {
  name: string;
  is_template: boolean;
  questions: QuestionCreate[];
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

export async function listQuestionnaires(): Promise<QuestionnaireRead[]> {
  const { data } = await api.get<QuestionnaireRead[]>('/api/v1/questionnaires');
  return data;
}

export async function createQuestionnaire(
  payload: QuestionnaireCreate
): Promise<QuestionnaireRead> {
  const { data } = await api.post<QuestionnaireRead>(
    '/api/v1/questionnaires',
    payload
  );
  return data;
}

export async function deleteQuestionnaire(id: string): Promise<void> {
  await api.delete(`/api/v1/questionnaires/${id}`);
}

export async function getQuestionnaire(
  questionnaireId: string
): Promise<QuestionnaireRead> {
  const { data } = await api.get<QuestionnaireRead>(
    `/api/v1/questionnaires/${questionnaireId}`,
    {
      params: {
        withQuestions: true,
      },
    }
  );
  return data;
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

export async function listQuestionnaireSubmissions(
  questionnaireId: string
): Promise<SubmissionRead[]> {
  const { data } = await api.get<SubmissionRead[]>(
    `/api/v1/questionnaires/${questionnaireId}/submissions`
  );
  return data;
}

export async function getQuestionnaireSubmission(
  questionnaireId: string,
  submissionId: string,
  withAnswers = true
): Promise<SubmissionRead> {
  const { data } = await api.get<SubmissionRead>(
    `/api/v1/questionnaires/${questionnaireId}/submissions/${submissionId}`,
    {
      params: {
        withAnswers,
      },
    }
  );
  return data;
}

export function submitQuestionnaire(
  questionnaireId: string,
  answers: SubmissionAnswerCreate[]
): Promise<void>;
export function submitQuestionnaire(
  questionnaireId: string,
  payload: SubmissionCreate
): Promise<SubmissionRead>;
export async function submitQuestionnaire(
  questionnaireId: string,
  payload: SubmissionCreate | SubmissionAnswerCreate[]
): Promise<SubmissionRead | void> {
  const body = Array.isArray(payload) ? { answers: payload } : payload;
  const { data } = await api.post<SubmissionRead>(
    `/api/v1/questionnaires/${questionnaireId}/submissions`,
    body
  );

  return Array.isArray(payload) ? undefined : data;
}
