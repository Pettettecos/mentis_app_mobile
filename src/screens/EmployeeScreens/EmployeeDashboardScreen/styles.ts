import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    gap: 16,
  },
  greetingSection: {
    gap: 6,
    paddingHorizontal: 4,
    marginTop: 8,
  },
  greetingTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
  },
  greetingSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  checkinButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    marginHorizontal: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkinButtonContent: {
    height: 56,
    paddingHorizontal: 20,
  },
  checkinButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statCardContent: {
    alignItems: 'center',
    padding: 12,
    gap: 6,
  },
  statIconBg: {
    alignItems: 'center',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  statIconBgGreen: {
    backgroundColor: '#D1FAE5',
  },
  statIconBgBlue: {
    backgroundColor: '#DBEAFE',
  },
  statIconBgPurple: {
    backgroundColor: '#EDE9FE',
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chartHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  chartBadge: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: '#E6F6FB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    backgroundColor: colors.iconCircleBg,
    borderRadius: 12,
    gap: 8,
  },
  chartPlaceholderText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  insightsCard: {
    backgroundColor: '#0E7490',
    borderRadius: 20,
    padding: 20,
    gap: 16,
    shadowColor: '#0E7490',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  insightsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  insightItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
  },
  insightItemLast: {
    marginBottom: 0,
  },
  insightIcon: {
    marginTop: 2,
  },
  insightContent: {
    flex: 1,
    gap: 2,
  },
  insightTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  insightBody: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    lineHeight: 18,
  },
});
