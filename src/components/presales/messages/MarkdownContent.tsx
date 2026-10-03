// Markdown rendering for presales agent answers.
// react-markdown + remark-gfm: streaming-safe and injection-safe by default —
// raw HTML in model output is never rendered (no rehype-raw), and URLs are
// sanitized. Links open in a new tab from the chat panel.

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MD_CLASS =
  '[&_p]:mb-2 [&_p]:last:mb-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:my-2 ' +
  '[&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-1 [&_li]:marker:text-ink/40 ' +
  '[&_strong]:font-semibold [&_h1]:mb-1 [&_h1]:mt-2 [&_h1]:text-base [&_h1]:font-semibold ' +
  '[&_h2]:mb-1 [&_h2]:mt-2 [&_h2]:text-sm [&_h2]:font-semibold ' +
  '[&_h3]:mb-1 [&_h3]:mt-2 [&_h3]:text-sm [&_h3]:font-semibold ' +
  '[&_blockquote]:border-l-2 [&_blockquote]:border-line [&_blockquote]:pl-3 [&_blockquote]:text-ink/70 ' +
  '[&_hr]:my-3 [&_hr]:border-line [&_table]:my-2 [&_table]:w-full [&_th]:border [&_th]:border-line ' +
  '[&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_td]:border [&_td]:border-line [&_td]:px-2 [&_td]:py-1 ' +
  '[&_code]:rounded-sm [&_code]:bg-ink/[0.06] [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] ' +
  '[&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-sm [&_pre]:bg-ink/[0.06] [&_pre]:p-2';

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className={MD_CLASS}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer"
               className="text-brass underline underline-offset-2 hover:text-brass/80">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
