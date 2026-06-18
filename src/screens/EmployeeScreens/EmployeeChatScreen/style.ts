import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
  },
  chatCard: {
    backgroundColor: colors.background,
    flex: 1,
    overflow: 'hidden',
  },
  chatHeaderWrapper: {
    backgroundColor: colors.primary,
    paddingTop: 8,
  },
  chatHeader: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 96,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 16,
  },
  headerBackButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    marginRight: -2,
    width: 36,
  },
  chatAvatar: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  chatHeaderText: {
    flex: 1,
    gap: 3,
  },
  chatTitle: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
  chatSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 17,
  },
  messagesContent: {
    gap: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },
  messagesList: {
    flex: 1,
  },
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
  composerSection: {
    backgroundColor: colors.surface,
    borderTopColor: 'rgba(190, 200, 207, 0.1)',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
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
