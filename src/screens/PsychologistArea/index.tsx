import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';

type PsychologistTab = 'dashboard' | 'collaborators' | 'questionnaires' | 'schedule';

const tabs: { key: PsychologistTab; label: string }[] = [
  { key: 'dashboard', label: 'Painel' },
  { key: 'collaborators', label: 'Colaboradores' },
  { key: 'questionnaires', label: 'Questionários' },
  { key: 'schedule', label: 'Agenda' },
];

export function PsychologistAreaScreen() {
  const [activeTab, setActiveTab] = useState<PsychologistTab>('dashboard');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <Text variant="titleLarge" style={styles.brand}>
          MentisTech
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'collaborators' && <CollaboratorsContent />}
          {activeTab === 'questionnaires' && <QuestionnairesContent />}
          {activeTab === 'schedule' && <ScheduleContent />}
        </ScrollView>
      </View>

      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 8 }]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function DashboardContent() {
  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        Olá, Dra. Mariana Costa
      </Text>

      <Text style={styles.description}>
        Você tem 3 novos pedidos de atendimento hoje.
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Insights da Equipe
          </Text>

          <Text style={styles.metric}>78%</Text>

          <Text style={styles.description}>Índice de bem-estar geral</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Pedidos de Atendimento
          </Text>

          <Text style={styles.itemTitle}>Ricardo Alves</Text>
          <Text style={styles.description}>
            Sintomas de burnout recorrentes e dificuldade de concentração.
          </Text>

          <Text style={styles.itemTitle}>Ana Paula Silva</Text>
          <Text style={styles.description}>
            Acompanhamento mensal para controle de ansiedade social.
          </Text>
        </Card.Content>
      </Card>
    </>
  );
}

function CollaboratorsContent() {
  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        Gestão de Colaboradores
      </Text>

      <Text style={styles.description}>
        Acompanhe a saúde mental da organização e gerencie atendimentos.
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.itemTitle}>Ricardo Mendonça</Text>
          <Text style={styles.description}>Desenvolvedor Sênior · Estável</Text>

          <Text style={styles.itemTitle}>Ana Luiza Silva</Text>
          <Text style={styles.description}>
            Gerente de Projetos · Alerta: Stress
          </Text>

          <Text style={styles.itemTitle}>Carlos Eduardo</Text>
          <Text style={styles.description}>Analista Financeiro · Melhorando</Text>
        </Card.Content>
      </Card>
    </>
  );
}

function QuestionnairesContent() {
  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        Gerenciar Questionários
      </Text>

      <Text style={styles.description}>
        Modelos de avaliação e acompanhamento psicológico.
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.itemTitle}>GAD-7</Text>
          <Text style={styles.description}>
            Questionário para rastreamento de ansiedade.
          </Text>

          <Text style={styles.itemTitle}>PHQ-9</Text>
          <Text style={styles.description}>
            Questionário para rastreamento de sintomas depressivos.
          </Text>

          <Text style={styles.itemTitle}>Clima Mental</Text>
          <Text style={styles.description}>
            Acompanhamento diário de humor e bem-estar.
          </Text>
        </Card.Content>
      </Card>
    </>
  );
}

function ScheduleContent() {
  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        Gerenciar Agenda
      </Text>

      <Text style={styles.description}>
        Controle sua disponibilidade e acompanhe os atendimentos da semana.
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.itemTitle}>09:00 · Sessão com Julia Ramos</Text>
          <Text style={styles.description}>Online pela plataforma</Text>

          <Text style={styles.itemTitle}>14:30 · Avaliação Inicial</Text>
          <Text style={styles.description}>Primeiro contato · Consultório</Text>

          <Text style={styles.itemTitle}>16:00 · Retorno</Text>
          <Text style={styles.description}>Acompanhamento periódico</Text>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  brand: {
    color: colors.primary,
    fontWeight: '800',
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 8,
  },
  description: {
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    elevation: 0,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 12,
  },
  metric: {
    color: colors.accent,
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 4,
  },
  itemTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 4,
  },
  bottomNav: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    bottom: 16,
    elevation: 8,
    flexDirection: 'row',
    gap: 4,
    left: 16,
    paddingHorizontal: 8,
    paddingTop: 8,
    position: 'absolute',
    right: 16,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    paddingVertical: 10,
  },
  tabButtonActive: {
    backgroundColor: '#EFF6FF',
  },
  tabLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.primary,
  },
});