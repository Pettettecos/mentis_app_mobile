import { api } from './client';
import type {
  QuestionnaireAssignmentCreate,
  QuestionnaireAssignmentRead,
  QuestionnaireCreate,
  QuestionnaireRead,
  QuestionnaireUpdate,
  SubmissionCreate,
  SubmissionRead,
} from './types';

export async function listQuestionnaires(): Promise<QuestionnaireRead[]> {
  const { data } = await api.get<QuestionnaireRead[]>('/api/v1/questionnaires');
  return data;
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

export async function createQuestionnaire(
  payload: QuestionnaireCreate
): Promise<QuestionnaireRead> {
  const { data } = await api.post<QuestionnaireRead>(
    '/api/v1/questionnaires',
    payload
  );
  return data;
}

export async function updateQuestionnaire(
  questionnaireId: string,
  payload: QuestionnaireUpdate
): Promise<QuestionnaireRead> {
  const { data } = await api.patch<QuestionnaireRead>(
    `/api/v1/questionnaires/${questionnaireId}`,
    payload
  );
  return data;
}

export async function deleteQuestionnaire(
  questionnaireId: string
): Promise<void> {
  await api.delete(`/api/v1/questionnaires/${questionnaireId}`);
}

export async function assignQuestionnaire(
  questionnaireId: string,
  payload: QuestionnaireAssignmentCreate
): Promise<QuestionnaireAssignmentRead[]> {
  const { data } = await api.post<QuestionnaireAssignmentRead[]>(
    `/api/v1/questionnaires/${questionnaireId}/assignments`,
    payload
  );
  return data;
}

export async function submitQuestionnaire(
  questionnaireId: string,
  payload: SubmissionCreate
): Promise<SubmissionRead> {
  const { data } = await api.post<SubmissionRead>(
    `/api/v1/questionnaires/${questionnaireId}/submissions`,
    payload
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
