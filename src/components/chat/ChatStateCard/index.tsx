import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from './style';

interface ChatStateCardProps {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ChatStateCard({
  title,
  body,
  actionLabel,
  onAction,
}: ChatStateCardProps) {
  return (
    <View style={styles.stateCard}>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateBody}>{body}</Text>
      {actionLabel && onAction && (
        <Button mode="contained" onPress={onAction} style={styles.actionButton}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}
