import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from 'react-native-paper';
import { colors } from '@/theme/colors';
import { formatChatTime } from '@/utils/chatDate';
import { ChatTypingBubble } from '../ChatTypingBubble';
import type { ChatBubble } from '../types';
import { styles } from './style';

interface ChatMessageBubbleProps {
  message: ChatBubble;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const { t } = useTranslation();
  const isHuman = message.role === 'human';

  return (
    <View
      style={[
        styles.messageRow,
        isHuman ? styles.humanMessageRow : styles.aiMessageRow,
      ]}
    >
      {!isHuman && (
        <View style={styles.avatar}>
          <Icon source="robot-outline" size={18} color={colors.background} />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          isHuman ? styles.humanBubble : styles.aiBubble,
          message.pending && styles.pendingBubble,
        ]}
      >
        {message.pending ? (
          <ChatTypingBubble />
        ) : (
          <>
            <Text
              style={[
                styles.messageText,
                isHuman ? styles.humanMessageText : styles.aiMessageText,
              ]}
            >
              {message.content}
            </Text>
            {message.showTimestamp !== false && (
              <Text
                style={[
                  styles.messageTime,
                  isHuman ? styles.humanMessageTime : styles.aiMessageTime,
                ]}
              >
                {formatChatTime(
                  message.createdAt,
                  t('chat.session.invalidTime')
                )}
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
}
