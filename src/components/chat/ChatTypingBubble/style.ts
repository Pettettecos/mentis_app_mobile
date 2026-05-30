import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  typingBubble: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    minHeight: 28,
  },
  typingDots: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  typingDot: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  typingText: {
    color: colors.textMuted,
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 16,
  },
});
