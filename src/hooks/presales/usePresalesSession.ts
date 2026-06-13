import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChatMessage } from '../../lib/presales/types';

const VISITOR_ID_KEY = 'bi_presales_visitor_id';
const SESSION_ID_KEY = 'bi_presales_session_id';
const MESSAGES_KEY = 'bi_presales_messages';

const SESSION_MAX_AGE = 30 * 60 * 1000; // 30 minutes
const HISTORY_MAX_AGE = 7 * 24 * 60 * 1000; // 7 days

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function setStored(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — non-fatal
  }
}

export interface PresalesSession {
  visitorId: string;
  sessionId: string;
  messages: ChatMessage[];
  lastActivity: number;
}

export function usePresalesSession() {
  const [visitorId] = useState(() => {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const id = generateId('v');
    localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  });

  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem(SESSION_ID_KEY) || generateId('s');
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = getStored<{ messages: ChatMessage[]; ts: number } | null>(MESSAGES_KEY, null);
    if (!stored) return [];
    // Only restore messages within the session window
    if (Date.now() - stored.ts > SESSION_MAX_AGE) return [];
    return stored.messages;
  });

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Persist messages to localStorage
  useEffect(() => {
    setStored(MESSAGES_KEY, { messages, ts: Date.now() });
  }, [messages]);

  // Persist session ID
  useEffect(() => {
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }, [sessionId]);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  const updateMessage = useCallback((id: string, updater: (msg: ChatMessage) => ChatMessage) => {
    setMessages(prev => prev.map(m => m.id === id ? updater(m) : m));
  }, []);

  const appendToMessage = useCallback((id: string, text: string) => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, content: m.content + text } : m
    ));
  }, []);

  const newSession = useCallback(() => {
    const id = generateId('s');
    setSessionId(id);
    setMessages([]);
  }, []);

  return {
    visitorId,
    sessionId,
    messages,
    setMessages,
    addMessage,
    updateMessage,
    appendToMessage,
    newSession,
  };
}
