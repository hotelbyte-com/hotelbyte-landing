import { motion } from 'framer-motion';

interface QuickRepliesProps {
  onReply: (text: string) => void;
  locale: 'zh' | 'en';
  isStreaming: boolean;
}

export default function QuickReplies({ onReply, locale, isStreaming }: QuickRepliesProps) {
  const replies = locale === 'zh'
    ? [
        'HotelByte 能帮我做什么？',
        '和 SiteMinder 相比有什么优势？',
        '定价方案是怎样的？',
        '如何申请 Demo？',
      ]
    : [
        'What can HotelByte do for me?',
        'How does it compare to SiteMinder?',
        'What are the pricing plans?',
        'How do I request a demo?',
      ];

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {replies.map((reply, i) => (
        <motion.button
          key={i}
          onClick={() => onReply(reply)}
          disabled={isStreaming}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-cyan-glow/30 hover:bg-cyan-glow/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
}
