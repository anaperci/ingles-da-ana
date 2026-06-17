import { useRef } from 'react'
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Code,
  Quote,
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface MarkdownEditorProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}

/** Editor de texto com toolbar de markdown (negrito, itálico, listas, etc.). */
export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  rows = 8,
}: MarkdownEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  /** Envolve a seleção com marcadores (ex.: ** para negrito). */
  function wrap(before: string, after = before) {
    const ta = ref.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const sel = value.slice(start, end) || 'texto'
    const next = value.slice(0, start) + before + sel + after + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      ta.focus()
      ta.selectionStart = start + before.length
      ta.selectionEnd = start + before.length + sel.length
    })
  }

  /** Prefixa cada linha selecionada (ex.: "- " para lista). */
  function prefixLines(prefix: string) {
    const ta = ref.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    const block = value.slice(lineStart, end) || 'item'
    const replaced = block
      .split('\n')
      .map((l, i) => (prefix === '1. ' ? `${i + 1}. ${l}` : prefix + l))
      .join('\n')
    const next = value.slice(0, lineStart) + replaced + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => ta.focus())
  }

  const tools = [
    { icon: Bold, label: 'Negrito', run: () => wrap('**') },
    { icon: Italic, label: 'Itálico', run: () => wrap('*') },
    { icon: Heading2, label: 'Título', run: () => prefixLines('## ') },
    { icon: List, label: 'Lista', run: () => prefixLines('- ') },
    { icon: ListOrdered, label: 'Lista numerada', run: () => prefixLines('1. ') },
    { icon: Quote, label: 'Citação', run: () => prefixLines('> ') },
    { icon: Code, label: 'Código', run: () => wrap('`') },
  ]

  return (
    <div className="overflow-hidden rounded-lg border border-input">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/50 p-1">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={t.run}
            title={t.label}
            aria-label={t.label}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-soft hover:text-primary"
          >
            <t.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <Textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="resize-y rounded-none border-0 focus-visible:ring-0"
      />
    </div>
  )
}
