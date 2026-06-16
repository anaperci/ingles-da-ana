import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { callFunction, isBackendConfigured, NotConfiguredError } from '@/lib/api'
import { cn } from '@/lib/utils'

type Msg = { role: 'user' | 'assistant'; content: string }

const TUTOR_SYSTEM = `Você é a tutora de inglês da Ana — uma brasileira cearense que está se preparando para morar em Malta. Tire dúvidas sobre inglês (gramática, vocabulário, pronúncia, expressões do dia a dia) e sobre o processo de aprendizado (como estudar, organizar a rotina, manter constância).

Regras:
- Responda em português brasileiro, mas traga sempre exemplos em inglês quando fizer sentido.
- Seja direta, calorosa e prática. Nada de enrolação.
- Respostas curtas (2 a 6 frases). Se a pessoa pedir, aprofunde.
- Ao corrigir, mostre o certo e explique o porquê em uma linha.
- Use inglês de Malta/britânico quando houver diferença relevante.`

const SUGGESTIONS = [
  'Qual a diferença entre "make" e "do"?',
  'Como peço informação na rua em Malta?',
  'Me dá uma rotina de estudo de 30 min/dia',
]

export function LearnChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function send(text: string) {
    const content = text.trim()
    if (!content || loading) return
    setInput('')
    setError(null)
    const next = [...messages, { role: 'user' as const, content }]
    setMessages(next)
    setLoading(true)
    try {
      const data = await callFunction<{ reply: string }>('chat', {
        system: TUTOR_SYSTEM,
        messages: next,
      })
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (e) {
      if (e instanceof NotConfiguredError) {
        setError('O chat de dúvidas ainda não está conectado. Configure a chave da OpenAI no backend.')
      } else {
        setError((e as Error).message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir chat de dúvidas"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-primary bg-accent text-primary shadow-soft transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-soft active:translate-x-0 active:translate-y-0"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Painel lateral */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l-2 border-primary bg-white transition-transform duration-200',
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-primary">Tutora de inglês</div>
              <div className="text-xs text-primary/70">Tire suas dúvidas em PT-BR</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar chat"
            className="rounded-xl border-2 border-primary p-1.5 text-primary hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mensagens */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Pergunte qualquer coisa sobre inglês ou sobre como estudar. Por exemplo:
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border-[1.5px] border-card-border px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[85%] whitespace-pre-wrap rounded-2xl border-2 border-primary px-3 py-2 text-sm',
                  m.role === 'user' ? 'bg-accent text-primary' : 'bg-white text-primary'
                )}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border-2 border-primary bg-white px-3 py-2 text-sm text-muted-foreground">
                digitando…
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border-2 border-error bg-error/10 px-3 py-2 text-sm text-error">
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t-2 border-primary p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isBackendConfigured() ? 'Escreva sua dúvida…' : 'Backend não configurado'}
            className="flex-1 rounded-xl border-2 border-card-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Enviar"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-primary bg-accent text-primary disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </>
  )
}
