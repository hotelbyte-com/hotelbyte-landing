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
    <div className="flex items-end gap-2 p-3 border-t border-line bg-paper">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={isStreaming}
        className="flex-1 bg-paper-raised border border-line rounded-sm px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 resize-none focus:outline-none focus:border-brass/50 focus:bg-paper transition-colors"
        style={{ maxHeight: '120px' }}
      />
      {isStreaming ? (
        <button
          onClick={onStop}
          className="flex-shrink-0 w-10 h-10 rounded-sm bg-paper-raised hover:bg-paper border border-line flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
          title={locale === 'zh' ? '停止' : 'Stop'}
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      ) : (
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-sm bg-ink flex items-center justify-center text-paper hover:bg-ink-deep disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title={locale === 'zh' ? '发送' : 'Send'}
        >
          <Send className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
