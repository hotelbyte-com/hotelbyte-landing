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
        '怎么验证你们的供应商覆盖？',
        '定价方案是怎样的？',
        '如何申请 Demo？',
      ]
    : [
        'What can HotelByte do for me?',
        'How do I verify your supplier coverage?',
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
          className="px-3 py-1.5 rounded-sm text-xs border border-line bg-paper-raised text-ink/60 hover:text-ink hover:border-brass/30 hover:bg-brass/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
}
