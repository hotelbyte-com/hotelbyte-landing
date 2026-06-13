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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={locale === 'zh' ? 'AI 售前顾问' : 'AI Pre-Sales Consultant'}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-glow to-electric-purple" />

      {/* Breathing glow */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-glow to-electric-purple"
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* Icon */}
      <div className="relative z-10 text-white">
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Sparkles className="w-6 h-6" />
        )}
      </div>

      {/* Tooltip */}
      {!isOpen && (
        <motion.div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-abyss-blue/90 backdrop-blur-sm border border-white/10 text-xs text-white/80 whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          {locale === 'zh' ? '和 AI 对话' : 'Chat with AI'}
        </motion.div>
      )}
    </motion.button>
  );
}
