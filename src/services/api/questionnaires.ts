import { api } from './client';
import type {
  QuestionnaireRead,
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
