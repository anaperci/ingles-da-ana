import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { callFunction, isBackendConfigured, NotConfiguredError } from '@/lib/api'
import { loadJSON, saveJSON } from '@/lib/storage'
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
  const [hinted, setHinted] = useState(() => loadJSON('chat:hint-seen', false))
  const scrollRef = useRef<HTMLDivElement>(null)

  function openChat() {
    setOpen(true)
    if (!hinted) {
      setHinted(true)
      saveJSON('chat:hint-seen', true)
    }
  }

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
      {/* Balãozinho de primeiro acesso */}
      {!open && !hinted && (
        <button
          onClick={openChat}
          className="fixed bottom-8 right-[84px] z-50 flex items-center gap-1.5 rounded-full border border-card-border bg-card px-3.5 py-2 text-sm font-semibold text-primary shadow-lg animate-fade-in"
        >
          Tire dúvidas aqui 👋
          <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-r border-card-border bg-card" />
        </button>
      )}

      {/* Botão flutuante */}
      {!open && (
        <button
          onClick={openChat}
          aria-label="Abrir chat de dúvidas"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-primary text-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Painel lateral */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        )}
      >
        {/* Header (navy = sidebar) */}
        <div className="flex items-center justify-between gap-2 bg-primary px-4 py-3.5 text-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Sparkles className="h-5 w-5 text-mint" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold">Tutora de inglês</div>
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" /> online · responde em PT-BR
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar chat"
            className="rounded-xl p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mensagens */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/40 p-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Pergunte qualquer coisa sobre inglês ou sobre como estudar. Por exemplo:
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-2xl border border-card-border bg-card px-3.5 py-2.5 text-left text-sm text-foreground shadow-soft transition-colors hover:border-accent hover:bg-soft"
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
                  'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm shadow-soft',
                  m.role === 'user'
                    ? 'rounded-br-md bg-primary text-white'
                    : 'rounded-bl-md border border-card-border bg-card text-foreground'
                )}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-card-border bg-card px-3.5 py-3 shadow-soft">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
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
          className="flex items-center gap-2 border-t border-border bg-card p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isBackendConfigured() ? 'Escreva sua dúvida…' : 'Backend não configurado'}
            className="h-11 flex-1 rounded-full border border-input bg-muted/50 px-4 text-sm text-foreground outline-none transition-colors focus:border-accent focus:bg-card"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Enviar"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </>
  )
}
