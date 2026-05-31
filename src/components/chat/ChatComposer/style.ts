import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  composerSection: {
    backgroundColor: colors.surface,
    borderTopColor: 'rgba(190, 200, 207, 0.1)',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  composer: {
    alignItems: 'center',
    backgroundColor: colors.outline,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 12,
    minHeight: 70,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  composerInput: {
    backgroundColor: 'transparent',
    flex: 1,
    maxHeight: 88,
    minHeight: 54,
  },
  composerInputContent: {
    backgroundColor: 'transparent',
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 999,
    elevation: 3,
    height: 40,
    justifyContent: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    width: 40,
  },
  sendButtonDisabled: {
    backgroundColor: colors.textMuted,
    opacity: 0.7,
  },
});
