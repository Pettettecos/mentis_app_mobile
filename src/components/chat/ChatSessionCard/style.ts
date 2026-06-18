import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  sessionCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  sessionContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    padding: 18,
  },
  sessionIconBg: {
    alignItems: 'center',
    backgroundColor: colors.iconCircleBg,
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  sessionInfo: {
    flex: 1,
    gap: 4,
  },
  sessionTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sessionTitle: {
    color: colors.textPrimary,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  sessionMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  sessionUpdated: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
});
