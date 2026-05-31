import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, TextInput } from 'react-native-paper';
import { colors } from '@/theme/colors';
import { styles } from './style';

interface ChatComposerProps {
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onFocus?: () => void;
  loading?: boolean;
  sending?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  draft,
  onDraftChange,
  onSend,
  onFocus,
  loading = false,
  sending = false,
  placeholder,
}: ChatComposerProps) {
  const { t } = useTranslation();
  const disabled = !draft.trim() || sending || loading;
  const inputPlaceholder = placeholder ?? t('chat.conversation.placeholder');

  return (
    <View style={styles.composerSection}>
      <View style={styles.composer}>
        <TextInput
          value={draft}
          onChangeText={onDraftChange}
          placeholder={inputPlaceholder}
          mode="flat"
          onFocus={onFocus}
          multiline
          editable={!sending && !loading}
          style={styles.composerInput}
          contentStyle={styles.composerInputContent}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />
        <Pressable
          onPress={onSend}
          disabled={disabled}
          style={[styles.sendButton, disabled && styles.sendButtonDisabled]}
        >
          <Icon source="send" size={18} color={colors.surface} />
        </Pressable>
      </View>
    </View>
  );
}
