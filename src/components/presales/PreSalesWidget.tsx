import { lazy, Suspense, useState, useEffect } from 'react';
import { useI18n, contentLocaleOf } from '../../i18n';
import { usePresalesChat } from '../../hooks/presales/usePresalesChat';
import ChatBubble from './ChatBubble';
import ChunkErrorBoundary from '../ChunkErrorBoundary';

// The panel (framer-motion variants, react-markdown + remark-gfm) is only
// needed once someone opens the chat, so it stays out of every page's JS and is
// fetched on first open, or earlier when the bubble signals intent.
const loadChatPanel = () => import('./ChatPanel');
const ChatPanel = lazy(loadChatPanel);
const warmChatPanel = () => {
  loadChatPanel().catch(() => {}); // a real failure surfaces when the panel is opened
};

export default function PreSalesWidget() {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  // Stays mounted after the first open so the panel can play its exit animation.
  const [hasOpened, setHasOpened] = useState(false);

  const chat = usePresalesChat();

  // Listen for external open requests (e.g. from Hero button)
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setHasOpened(true);
    };
    window.addEventListener('presales:open', handleOpen);
    return () => window.removeEventListener('presales:open', handleOpen);
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setHasOpened(true);
  };
  const handleClose = () => setIsOpen(false);

  const handleSend = (text: string) => {
    chat.sendMessage(text);
  };

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        onToggle={handleToggle}
        locale={contentLocaleOf(locale)}
        onIntent={warmChatPanel}
      />
      {hasOpened && (
        <ChunkErrorBoundary resetKey="" fallback={null}>
          <Suspense fallback={null}>
            <ChatPanel
              isOpen={isOpen}
              onClose={handleClose}
              messages={chat.messages}
              isStreaming={chat.isStreaming}
              onSend={handleSend}
              onStop={chat.stopStreaming}
              onNewSession={chat.newSession}
              hasMessages={chat.messages.length > 0}
            />
          </Suspense>
        </ChunkErrorBoundary>
      )}
    </>
  );
}
