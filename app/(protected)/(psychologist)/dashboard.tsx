import { ManagerDashboardScreen } from '@/screens/ManagerScreens/ManagerDashboardScreen';

export default function PsychologistDashboardPage() {
  return (
    <ManagerDashboardScreen
      errorText="Não foi possível carregar os dados da psicóloga."
      headerBody="Indicadores reais para acompanhamento clínico rápido da equipe."
      headerTitle="Painel da Psicóloga"
      riskAlertsRoute="/(protected)/(psychologist)/risk-alerts"
      reportRoute={null}
    />
  );
}
