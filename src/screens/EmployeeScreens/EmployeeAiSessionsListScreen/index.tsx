import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router, useFocusEffect } from 'expo-router';
import { Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chatService } from '@/services/api';
import type { ChatSessionSummary } from '@/services/api';
import {
  ChatNewSessionCard,
  ChatSessionCard,
  ChatStateCard,
} from '@/components/chat';
import { styles } from './style';

export function EmployeeAiSessionsListScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await chatService.listChatSessions();
      setSessions(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadSessions();
    }, [loadSessions])
  );

  const openChat = (sessionId?: string) => {
    router.push(
      sessionId
        ? {
            pathname: '/(protected)/(employee)/chat/[id]',
            params: { id: sessionId },
          }
        : '/(protected)/(employee)/chat/new'
    );
  };

  const goToTemporary = () => {
    router.push('/(protected)/(employee)/temporary');
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
        },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          onPress={goToTemporary}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
        >
          <Icon source="arrow-left" size={18} />
          <Text style={styles.headerTitle}>
            {t('chat.sessionsList.headerTitle')}
          </Text>
        </Pressable>
        <Text style={styles.headerBody}>
          {t('chat.sessionsList.headerBody')}
        </Text>
      </View>

      <ChatNewSessionCard onPress={() => openChat()} />

      {loading && (
        <ChatStateCard
          title={t('chat.sessionsList.loadingTitle')}
          body={t('chat.sessionsList.loadingBody')}
        />
      )}

      {!loading && error && (
        <ChatStateCard
          title={t('chat.sessionsList.errorTitle')}
          body={t('chat.sessionsList.errorBody')}
          actionLabel={t('chat.sessionsList.retry')}
          onAction={loadSessions}
        />
      )}

      {!loading && !error && sessions.length === 0 && (
        <ChatStateCard
          title={t('chat.sessionsList.emptyTitle')}
          body={t('chat.sessionsList.emptyBody')}
        />
      )}

      {!loading &&
        !error &&
        sessions.map((session) => (
          <ChatSessionCard
            key={session.id}
            sessionId={session.id}
            createdAt={session.created_at}
            updatedAt={session.updated_at}
            onPress={() => openChat(session.id)}
          />
        ))}
    </ScrollView>
  );
}
