import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF4FB',
    flex: 1,
  },
  content: {
    gap: 20,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  backButton: {
    margin: 0,
  },
  headerText: {
    flex: 1,
    gap: 6,
    paddingRight: 8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 22,
  },
  reportCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    minHeight: 260,
    padding: 24,
  },
  reportContent: {
    gap: 18,
  },
  reportHeading: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 29,
  },
  reportSummary: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  reportText: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 25,
  },
  insightCard: {
    backgroundColor: '#FBFCFE',
    borderColor: colors.outline,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  insightCardMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  insightCardLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  insightCardText: {
    gap: 5,
  },
  insightCardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  insightCardBody: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  attentionLabel: {
    color: '#B91C1C',
  },
  positiveLabel: {
    color: colors.success,
  },
  actionLabel: {
    color: colors.primary,
  },
  trendLabel: {
    color: colors.textSoft,
  },
  stateContent: {
    alignItems: 'center',
    gap: 16,
    justifyContent: 'center',
    minHeight: 220,
  },
  stateText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
