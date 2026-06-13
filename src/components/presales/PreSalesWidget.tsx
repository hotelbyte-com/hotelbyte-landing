import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';
import { usePresalesChat } from '../../hooks/presales/usePresalesChat';
import ChatBubble from './ChatBubble';
import ChatPanel from './ChatPanel';

export default function PreSalesWidget() {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const chat = usePresalesChat();

  // Listen for external open requests (e.g. from Hero button)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('presales:open', handleOpen);
    return () => window.removeEventListener('presales:open', handleOpen);
  }, []);

  const handleToggle = () => setIsOpen(prev => !prev);
  const handleClose = () => setIsOpen(false);

  const handleSend = (text: string) => {
    chat.sendMessage(text);
  };

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        onToggle={handleToggle}
        locale={locale}
      />
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
    </>
  );
}
