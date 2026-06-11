import { api } from './client';
import type {
  ManagerAIInsightResponse,
  ManagerAIReportResponse,
  ManagerDashboardMetrics,
  ManagerRiskAlertItem,
} from './types';

export async function getManagerDashboardMetrics(): Promise<ManagerDashboardMetrics> {
  const { data } = await api.get<ManagerDashboardMetrics>(
    '/api/v1/manager/dashboard'
  );
  return data;
}

export async function getManagerAIInsight(): Promise<ManagerAIInsightResponse> {
  const { data } = await api.get<ManagerAIInsightResponse>(
    '/api/v1/manager/ai-insight'
  );
  return data;
}

export async function getManagerRiskAlerts(): Promise<ManagerRiskAlertItem[]> {
  const { data } = await api.get<ManagerRiskAlertItem[]>(
    '/api/v1/manager/risk-alerts'
  );
  return data;
}

export async function generateManagerAIReport(): Promise<ManagerAIReportResponse> {
  const { data } = await api.post<ManagerAIReportResponse>(
    '/api/v1/manager/ai-report'
  );
  return data;
}
