import { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

interface InputAreaProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  locale: 'zh' | 'en';
}

export default function InputArea({ onSend, onStop, isStreaming, locale }: InputAreaProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !isStreaming) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholder = locale === 'zh'
    ? '输入您的问题...'
    : 'Ask a question...';

  return (
    <div className="flex items-end gap-2 p-3 border-t border-white/5 bg-abyss-blue/50">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={isStreaming}
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-cyan-glow/40 focus:bg-white/8 transition-all"
        style={{ maxHeight: '120px' }}
      />
      {isStreaming ? (
        <button
          onClick={onStop}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
          title={locale === 'zh' ? '停止' : 'Stop'}
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      ) : (
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow to-electric-purple flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:scale-105 transition-all"
          title={locale === 'zh' ? '发送' : 'Send'}
        >
          <Send className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
