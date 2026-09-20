import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Mail } from 'lucide-react';
import type { ChatMessage } from '../../lib/presales/types';
import TypingIndicator from './messages/TypingIndicator';
import InputArea from './InputArea';
import QuickReplies from './QuickReplies';
import { useI18n } from '../../i18n';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isStreaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  onNewSession: () => void;
  hasMessages: boolean;
}

export default function ChatPanel({
  isOpen,
  messages,
  isStreaming,
  onSend,
  onStop,
  onNewSession,
  hasMessages,
}: ChatPanelProps) {
  const { locale } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const title = locale === 'zh' ? 'HotelByte AI 顾问' : 'HotelByte AI Consultant';
  const subtitle = locale === 'zh'
    ? '我是 HotelByte 的 AI 售前顾问，随时为您解答'
    : 'I am your AI pre-sales consultant, ready to help';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col rounded-sm overflow-hidden border border-line bg-paper shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-paper-raised">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-ink flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-paper" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{title}</div>
                <div className="text-xs text-ink/40">{subtitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasMessages && !isStreaming && (
                <button
                  onClick={onNewSession}
                  className="p-1.5 rounded-sm hover:bg-paper text-ink/40 hover:text-ink/70 transition-all"
                  title={locale === 'zh' ? '新对话' : 'New chat'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <a
                href="mailto:hotelgobeta@mail.hotelbyte.com"
                className="p-1.5 rounded-sm hover:bg-paper text-ink/40 hover:text-ink/70 transition-all"
                title={locale === 'zh' ? '联系我们' : 'Contact us'}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          >
            {/* Welcome message when empty */}
            {!hasMessages && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center gap-4"
              >
                <div className="w-16 h-16 rounded-sm bg-ink flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-paper" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-ink mb-2">
                    {locale === 'zh' ? '欢迎了解 HotelByte' : 'Welcome to HotelByte'}
                  </div>
                  <div className="text-sm text-ink/50 max-w-[280px]">
                    {locale === 'zh'
                      ? '我是 AI 售前顾问，可以为您介绍产品、对比竞品、解释定价方案。有什么想了解的？'
                      : 'I am your AI consultant. Ask me about our products, competitor comparison, or pricing plans.'}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Message list */}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-sm px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brass/10 border border-brass/30 text-ink'
                      : 'bg-paper-raised border border-line text-ink/90'
                  }`}
                >
                  {msg.streaming && msg.content === '' ? (
                    <TypingIndicator />
                  ) : (
                    <>
                      <span className="whitespace-pre-wrap break-words">{msg.content}</span>
                      {msg.streaming && (
                        <span className="inline-block w-1.5 h-4 ml-0.5 bg-brass/60 rounded-sm animate-pulse" />
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Replies (show when no messages or not streaming) */}
          {!isStreaming && !hasMessages && (
            <QuickReplies onReply={onSend} locale={locale} isStreaming={isStreaming} />
          )}

          {/* Input */}
          <InputArea
            onSend={onSend}
            onStop={onStop}
            isStreaming={isStreaming}
            locale={locale}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
