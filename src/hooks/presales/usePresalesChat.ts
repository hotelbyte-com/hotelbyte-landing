import { useState, useCallback, useRef } from 'react';
import { useI18n } from '../../i18n';
import { streamPresalesChat } from '../../lib/presales/api';
import type { ChatMessage } from '../../lib/presales/types';
import { usePresalesSession } from './usePresalesSession';

function generateMsgId(): string {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function usePresalesChat() {
  const { locale } = useI18n();
  const session = usePresalesSession();
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isStreaming) return;

    setError(null);

    // Add user message
    const userMsg: ChatMessage = {
      id: generateMsgId(),
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };
    session.addMessage(userMsg);

    // Add placeholder assistant message for streaming
    const assistantMsgId = generateMsgId();
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      streaming: true,
    };
    session.addMessage(assistantMsg);

    setIsStreaming(true);

    abortRef.current = streamPresalesChat(
      {
        sessionId: session.sessionId,
        visitorId: session.visitorId,
        message: text.trim(),
        locale,
        pageContext: window.location.pathname,
      },
      {
        onToken: (token) => {
          session.appendToMessage(assistantMsgId, token);
        },
        onDone: () => {
          session.updateMessage(assistantMsgId, m => ({
            ...m,
            streaming: false,
            content: m.content || '(empty response)',
          }));
          setIsStreaming(false);
          abortRef.current = null;
        },
        onError: (err) => {
          session.updateMessage(assistantMsgId, m => ({
            ...m,
            streaming: false,
            content: m.content || (locale === 'en'
              ? 'Sorry, I encountered an error. Please try again.'
              : '抱歉，遇到了一些问题，请重试。'),
          }));
          setError(err.message);
          setIsStreaming(false);
          abortRef.current = null;
        },
      }
    );
  }, [session, isStreaming, locale]);

  const stopStreaming = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  return {
    ...session,
    isStreaming,
    error,
    sendMessage,
    stopStreaming,
  };
}
