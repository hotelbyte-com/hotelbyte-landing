import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface ChatBubbleProps {
  isOpen: boolean;
  onToggle: () => void;
  locale: 'zh' | 'en';
}

export default function ChatBubble({ isOpen, onToggle, locale }: ChatBubbleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-sm bg-ink text-paper shadow-lg hover:bg-ink-deep transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label={locale === 'zh' ? 'AI 售前顾问' : 'AI Pre-Sales Consultant'}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Sparkles className="w-6 h-6" />
      )}

      {!isOpen && (
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-sm bg-ink text-paper text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          {locale === 'zh' ? '和 AI 对话' : 'Chat with AI'}
        </span>
      )}
    </motion.button>
  );
}
