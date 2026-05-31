import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Text, TouchableRipple } from 'react-native-paper';
import { colors } from '@/theme/colors';
import { formatChatDate, formatChatTime } from '@/utils/chatDate';
import { styles } from './style';

interface ChatSessionCardProps {
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  onPress: () => void;
}

export function ChatSessionCard({
  sessionId,
  createdAt,
  updatedAt,
  onPress,
}: ChatSessionCardProps) {
  const { t } = useTranslation();

  return (
    <TouchableRipple borderless onPress={onPress} style={styles.sessionCard}>
      <View style={styles.sessionContent}>
        <View style={styles.sessionIconBg}>
          <Icon
            source="message-processing-outline"
            size={22}
            color={colors.primary}
          />
        </View>
        <View style={styles.sessionInfo}>
          <View style={styles.sessionTitleRow}>
            <Text style={styles.sessionTitle}>
              {t('chat.session.labelPrefix')}{' '}
              {sessionId.slice(0, 8).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.sessionMeta}>
            {t('chat.session.createdAt', {
              date: formatChatDate(createdAt, t('chat.session.invalidDate')),
              time: formatChatTime(createdAt, t('chat.session.invalidTime')),
            })}
          </Text>
          <Text style={styles.sessionUpdated}>
            {t('chat.session.updatedAt', {
              date: formatChatDate(updatedAt, t('chat.session.invalidDate')),
              time: formatChatTime(updatedAt, t('chat.session.invalidTime')),
            })}
          </Text>
        </View>
        <Icon source="chevron-right" size={22} color={colors.textMuted} />
      </View>
    </TouchableRipple>
  );
}
