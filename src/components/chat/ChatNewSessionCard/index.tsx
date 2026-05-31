import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Text, TouchableRipple } from 'react-native-paper';
import { colors } from '@/theme/colors';
import { styles } from './style';

interface ChatNewSessionCardProps {
  onPress: () => void;
}

export function ChatNewSessionCard({ onPress }: ChatNewSessionCardProps) {
  const { t } = useTranslation();

  return (
    <TouchableRipple borderless onPress={onPress} style={styles.newSessionCard}>
      <View style={styles.newSessionContent}>
        <View style={styles.newSessionIconBg}>
          <Icon
            source="message-plus-outline"
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.newSessionInfo}>
          <Text style={styles.newSessionTitle}>
            {t('chat.sessionsList.newSessionTitle')}
          </Text>
          <Text style={styles.newSessionBody}>
            {t('chat.sessionsList.newSessionBody')}
          </Text>
        </View>
        <Icon source="chevron-right" size={22} color={colors.textMuted} />
      </View>
    </TouchableRipple>
  );
}
