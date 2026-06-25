import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  newSessionCard: {
    backgroundColor: colors.surface,
    borderColor: 'rgba(26, 144, 185, 0.16)',
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  newSessionContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    padding: 18,
  },
  newSessionIconBg: {
    alignItems: 'center',
    backgroundColor: colors.iconCircleBg,
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  newSessionInfo: {
    flex: 1,
    gap: 4,
  },
  newSessionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  newSessionBody: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
});
