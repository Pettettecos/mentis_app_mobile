import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  aiMessageRow: {
    justifyContent: 'flex-start',
  },
  humanMessageRow: {
    justifyContent: 'flex-end',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 32,
    justifyContent: 'center',
    marginTop: 2,
    width: 32,
  },
  messageBubble: {
    borderRadius: 18,
    gap: 6,
    maxWidth: '78%',
    padding: 16,
  },
  aiBubble: {
    backgroundColor: colors.surface,
    borderColor: 'rgba(190, 200, 207, 0.18)',
    borderTopLeftRadius: 0,
    borderWidth: 1,
  },
  humanBubble: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 0,
    elevation: 3,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  pendingBubble: {
    minWidth: 78,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 23,
  },
  aiMessageText: {
    color: colors.textPrimary,
  },
  humanMessageText: {
    color: colors.surface,
  },
  messageTime: {
    fontSize: 11,
    fontWeight: '700',
  },
  aiMessageTime: {
    color: colors.textMuted,
  },
  humanMessageTime: {
    color: 'rgba(255, 255, 255, 0.78)',
    textAlign: 'right',
  },
});
