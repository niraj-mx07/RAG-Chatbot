import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { clearSession as clearSessionApi, sendChatMessage } from '../services/api';

const SESSION_STORAGE_KEY = 'docmind_session_id';

const createSessionId = () => uuidv4();

export const useChat = (notifyError) => {
  const [sessionId, setSessionId] = useState(() => {
    const existingSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (existingSession) {
      return existingSession;
    }
    const generatedSession = createSessionId();
    localStorage.setItem(SESSION_STORAGE_KEY, generatedSession);
    return generatedSession;
  });

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const persistSessionId = useCallback((newSessionId) => {
    localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
    setSessionId(newSessionId);
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const content = text.trim();
      if (!content || isLoading) {
        return;
      }

      const userMessage = {
        id: `u-${crypto.randomUUID()}`,
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((previousMessages) => [...previousMessages, userMessage]);
      setIsLoading(true);

      try {
        const response = await sendChatMessage(sessionId, content);
        const assistantMessage = {
          id: `a-${crypto.randomUUID()}`,
          role: 'assistant',
          content: response?.answer ?? 'No answer returned by the server.',
          sources: Array.isArray(response?.sources) ? response.sources : [],
          timestamp: new Date().toISOString(),
        };

        setMessages((previousMessages) => [...previousMessages, assistantMessage]);
      } catch (error) {
        notifyError?.(error?.response?.data?.detail || 'Failed to send message. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, notifyError, sessionId],
  );

  const clearSession = useCallback(async () => {
    setIsLoading(true);
    try {
      await clearSessionApi(sessionId);
    } catch {
      // We intentionally continue to create a fresh local session even when API cleanup fails.
    } finally {
      const newSessionId = createSessionId();
      setMessages([]);
      persistSessionId(newSessionId);
      setIsLoading(false);
    }
  }, [persistSessionId, sessionId]);

  return useMemo(
    () => ({
      messages,
      isLoading,
      sessionId,
      sendMessage,
      clearSession,
      setMessages,
    }),
    [clearSession, isLoading, messages, sendMessage, sessionId],
  );
};
