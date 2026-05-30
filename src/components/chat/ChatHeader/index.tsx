import { Pressable, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { colors } from '@/theme/colors';
import { styles } from './style';

interface ChatHeaderProps {
  title: string;
  subtitle: string;
  onBackPress: () => void;
}

export function ChatHeader({ title, subtitle, onBackPress }: ChatHeaderProps) {
  return (
    <View style={styles.chatHeader}>
      <Pressable
        onPress={onBackPress}
        style={styles.headerBackButton}
        hitSlop={10}
      >
        <Icon source="arrow-left" size={24} color={colors.primary} />
      </Pressable>

      <View style={styles.chatHeaderText}>
        <Text style={styles.chatTitle}>{title}</Text>
        <Text style={styles.chatSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}
