import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chatService } from '@/services/api';
import type {
  ChatMessageRead,
  ChatRole,
  ChatSessionDetail,
} from '@/services/api';
import {
  ChatBubble,
  ChatComposer,
  ChatHeader,
  ChatMessageBubble,
} from '@/components/chat';
import { formatChatDateLabel } from '@/utils/chatDate';
import { styles } from './style';

type LocalChatRole = Exclude<ChatRole, 'system'>;

function isLocalChatRole(role: ChatRole): role is LocalChatRole {
  return role !== 'system';
}

function normalizeSearchParam(value?: string | string[]): string | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function mapMessages(messages: ChatMessageRead[]): ChatBubble[] {
  return messages
    .filter((message): message is ChatMessageRead & { role: LocalChatRole } =>
      isLocalChatRole(message.role)
    )
    .map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.created_at,
    }));
}

export function EmployeeChatScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatBubble>>(null);
  const { id: routeSessionId } = useLocalSearchParams<{
    id?: string | string[];
  }>();
  const [sessionId, setSessionId] = useState<string | undefined>(
    normalizeSearchParam(routeSessionId)
  );
  const [session, setSession] = useState<ChatSessionDetail | null>(null);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingSession, setLoadingSession] = useState(
    Boolean(sessionId && sessionId !== 'new')
  );
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<ChatBubble[]>([]);

  useEffect(() => {
    setSessionId(normalizeSearchParam(routeSessionId));
  }, [routeSessionId]);

  const loadSession = useCallback(
    async (currentSessionId?: string) => {
      if (!currentSessionId || currentSessionId === 'new') {
        setSession(null);
        setMessages([]);
        setLoadingSession(false);
        setError(false);
        return;
      }

      setLoadingSession(true);
      setError(false);

      try {
        const data = await chatService.getChatSession(currentSessionId);
        setSession(data);
        setMessages(mapMessages(data.messages));
      } catch {
        setSession(null);
        setMessages([]);
        setError(true);
        Toast.show({
          type: 'error',
          text1: t('chat.conversation.loadErrorTitle'),
          text2: t('chat.conversation.loadErrorBody'),
        });
      } finally {
        setLoadingSession(false);
      }
    },
    [t]
  );

  useEffect(() => {
    void loadSession(sessionId);
  }, [loadSession, sessionId]);

  useEffect(() => {
    if (loadingSession) return;

    const timeout = setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 60);

    return () => clearTimeout(timeout);
  }, [loadingSession, messages]);

  const currentHeaderLabel = useMemo(() => {
    if (!session) {
      return t('chat.conversation.newConversationTitle');
    }

    return t('chat.conversation.sessionOpenedOn', {
      date: formatChatDateLabel(
        session.created_at,
        t('chat.conversation.dateUnavailable')
      ),
    });
  }, [session, t]);

  const introMessage = useMemo<ChatBubble>(
    () => ({
      id: 'intro-message',
      role: 'ai',
      content: t('chat.conversation.introMessage'),
      createdAt: new Date().toISOString(),
      showTimestamp: false,
    }),
    [t]
  );

  const visibleMessages = useMemo(
    () => [introMessage, ...messages],
    [introMessage, messages]
  );

  const bottomNavigationOffset = Math.max(insets.bottom, 20) + 65;

  const focusComposer = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 80);
  };

  const goToSessionsList = () => {
    router.push('/(protected)/(employee)/chat');
  };

  const updatePendingAnswer = useCallback(
    (pendingMessageId: string, answer: string) => {
      const now = new Date().toISOString();

      setMessages((current) =>
        current.map((message) =>
          message.id === pendingMessageId
            ? {
                ...message,
                content: answer,
                createdAt: now,
                pending: false,
              }
            : message
        )
      );
    },
    []
  );

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || sending || loadingSession) return;

    const createdAt = new Date().toISOString();
    const humanMessageId = `human-${Date.now()}`;
    const pendingMessageId = `ai-pending-${Date.now()}`;

    setDraft('');
    setSending(true);
    setError(false);
    setMessages((current) => [
      ...current,
      {
        id: humanMessageId,
        role: 'human',
        content: text,
        createdAt,
      },
      {
        id: pendingMessageId,
        role: 'ai',
        content: '',
        createdAt,
        pending: true,
      },
    ]);

    try {
      const response = await chatService.sendChatMessage({
        session_id: sessionId === 'new' ? undefined : sessionId,
        message: text,
      });

      setSessionId(response.session_id);
      router.setParams({ id: response.session_id });
      updatePendingAnswer(pendingMessageId, response.answer);
      setSession((current) =>
        current
          ? {
              ...current,
              id: response.session_id,
              updated_at: new Date().toISOString(),
            }
          : {
              id: response.session_id,
              created_at: createdAt,
              updated_at: createdAt,
              messages: [],
            }
      );
    } catch {
      setMessages((current) =>
        current.filter((message) => message.id !== pendingMessageId)
      );
      Toast.show({
        type: 'error',
        text1: t('chat.conversation.sendErrorTitle'),
        text2: t('chat.conversation.sendErrorBody'),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.screen}>
        <View
          style={[styles.chatCard, { paddingBottom: bottomNavigationOffset }]}
        >
          <View style={styles.chatHeaderWrapper}>
            <ChatHeader
              title={currentHeaderLabel}
              subtitle={
                error
                  ? t('chat.conversation.subtitleError')
                  : t('chat.conversation.subtitle')
              }
              onBackPress={goToSessionsList}
            />
          </View>

          <FlatList
            ref={listRef}
            style={styles.messagesList}
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={styles.messagesContent}
            data={visibleMessages}
            keyExtractor={(item) => item.id}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => <ChatMessageBubble message={item} />}
            showsVerticalScrollIndicator={false}
          />

          <ChatComposer
            draft={draft}
            onDraftChange={setDraft}
            onSend={handleSend}
            onFocus={focusComposer}
            sending={sending}
            loading={loadingSession}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
