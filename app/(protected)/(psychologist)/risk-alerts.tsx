import { ManagerRiskAlertsScreen } from '@/screens/ManagerScreens/ManagerRiskAlertsScreen';

export default function PsychologistRiskAlertsPage() {
  return (
    <ManagerRiskAlertsScreen
      errorText="Não foi possível carregar os dados da psicóloga."
      subtitle="Insights recentes de maior risco identificados para acompanhamento clínico."
    />
  );
}
