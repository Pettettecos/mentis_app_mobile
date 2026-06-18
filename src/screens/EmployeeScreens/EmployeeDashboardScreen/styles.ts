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
  checkinCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 4,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  checkinBadge: {
    position: 'absolute',
    top: 12,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    zIndex: 1,
  },
  checkinBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  checkinCardContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 16,
  },
  checkinTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 8,
  },
  moodButtonSelected: {
    backgroundColor: colors.primary,
  },
  moodLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  moodLabelSelected: {
    color: '#FFFFFF',
  },
  journeyCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginHorizontal: 4,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  journeyCardContent: {
    padding: 20,
    gap: 20,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  journeyIconBg: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purpleLight,
    borderRadius: 14,
  },
  journeyTextGroup: {
    gap: 2,
  },
  journeyLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  journeyTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  journeyStats: {
    flexDirection: 'row',
    gap: 12,
  },
  journeyStatBox: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  journeyStatLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  journeyStatValue: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  journeyStatValuePurple: {
    color: colors.purple,
  },
  exercisesSection: {
    gap: 16,
  },
  exercisesTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  exerciseImage: {
    width: 110,
    height: 110,
  },
  exerciseContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 6,
  },
  exerciseCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exerciseCategoryText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  exerciseTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  exerciseSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
