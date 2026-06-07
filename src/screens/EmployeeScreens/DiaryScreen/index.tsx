import { useState, useEffect, useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Icon, Text } from 'react-native-paper';
import { styles } from './styles';
import { diaryColors, prompts } from './constants';
import { loadEntries, saveEntry } from './database';

interface DiaryEntry {
  id: string;
  date: string;
  text: string;
  prompt: string;
}

interface DiaryForm {
  text: string;
}

export function DiaryScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { control, handleSubmit, reset, watch } = useForm<DiaryForm>({
    defaultValues: { text: '' },
  });

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      const stored = await loadEntries();
      setEntries(stored);
    } catch (error) {
      console.error('Erro ao carregar diário:', error);
    }
  }, []);

  const onSubmit = useCallback(
    async (data: DiaryForm) => {
      if (!data.text.trim()) return;

      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        text: data.text.trim(),
        prompt: currentPrompt,
      };

      try {
        await saveEntry(newEntry);
        setEntries((prev) => [newEntry, ...prev]);
        reset();
      } catch (error) {
        console.error('Erro ao salvar diário:', error);
        Alert.alert(t('diary.errorTitle'), t('diary.errorMessage'));
      }
    },
    [currentPrompt, reset, t]
  );

  const rotatePrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  useEffect(() => {
    fetchEntries();
    rotatePrompt();
  }, [fetchEntries]);

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasText = (watch('text') || '').trim().length > 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>{t('diary.title')}</Text>
              <Text style={styles.subtitle}>{t('diary.subtitle')}</Text>
            </View>

            <View style={styles.promptCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.promptLabel}>{t('diary.promptLabel')}</Text>
                <TouchableOpacity
                  onPress={rotatePrompt}
                  style={styles.refreshButton}
                >
                  <Icon
                    source="refresh"
                    size={18}
                    color={diaryColors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.promptText}>
                {currentPrompt ? t(currentPrompt) : t('diary.promptGratitude')}
              </Text>
            </View>

            <Controller
              control={control}
              name="text"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>{t('diary.writeLabel')}</Text>
                  <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder={t('diary.placeholder')}
                    placeholderTextColor={diaryColors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline
                  />
                </View>
              )}
            />

            <TouchableOpacity
              style={[styles.saveButton, hasText && styles.saveButtonActive]}
              onPress={handleSubmit(onSubmit)}
              disabled={!hasText}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>{t('diary.save')}</Text>
            </TouchableOpacity>

            {entries.length > 0 && (
              <View style={styles.listHeader}>
                <Text style={styles.listTitle}>{t('diary.history')}</Text>
                <Text
                  style={{ color: diaryColors.textSecondary, fontSize: 13 }}
                >
                  {entries.length}{' '}
                  {entries.length === 1 ? t('diary.entry') : t('diary.entries')}
                </Text>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t('diary.empty')}</Text>
        }
      />
    </View>
  );
}
