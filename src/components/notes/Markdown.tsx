import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownProps {
  children: string
  className?: string
}

/** Renderiza markdown com a tipografia do app (negrito, itálico, listas, etc.). */
export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        'prose prose-sm max-w-none',
        'prose-headings:font-display prose-headings:text-primary',
        'prose-p:text-foreground prose-strong:text-primary prose-strong:font-bold',
        'prose-a:text-accent-dark prose-li:text-foreground',
        'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-accent-text prose-code:before:content-none prose-code:after:content-none',
        'prose-blockquote:border-accent prose-blockquote:text-muted-foreground',
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
