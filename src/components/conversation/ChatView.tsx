import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Send, ArrowLeft, Volume2, Loader2, RotateCcw, Mic, UserRound } from 'lucide-react'
import { speak } from '@/lib/tts'
import { callFunction, isBackendConfigured, NotConfiguredError } from '@/lib/api'
import { useProgress } from '@/hooks/useProgress'
import type { ConversationScenario } from '@/data/conversationScenarios'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatViewProps {
  scenario: ConversationScenario
  onExit: () => void
}

function systemPrompt(s: ConversationScenario) {
  return `You are a warm, encouraging English conversation tutor for Ana, a Brazilian who understands English well but needs practice speaking. She is preparing to live and study in Malta.

ROLE-PLAY: ${s.context}

RULES:
- Stay in character and keep the conversation natural and flowing.
- Reply ONLY in English, at a ${s.difficulty} level. Keep replies short (1-3 sentences) so it feels like real talk.
- Always end your turn with a question to keep her talking.
- If she makes a meaningful grammar or word-choice mistake, add a brief correction at the very end on a new line, prefixed exactly with "💡 ". Keep it to one short tip. If there is no mistake, do not add the line.
- Never break character to explain you are an AI.`
}

export function ChatView({ scenario, onExit }: ChatViewProps) {
  const { addSession } = useProgress()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: scenario.opener },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const startedAt = useMemo(() => Date.now(), [])
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const configured = isBackendConfigured()

  function restart() {
    setMessages([{ role: 'assistant', content: scenario.opener }])
    setInput('')
    setError(null)
  }

  // refs para gravar a sessão UMA vez (ao sair/minimizar), sem over-count
  const messagesRef = useRef(messages)
  messagesRef.current = messages
  const savedRef = useRef(false)

  const saveSession = useCallback(() => {
    if (savedRef.current) return
    const userTurns = messagesRef.current.filter((m) => m.role === 'user').length
    if (userTurns === 0) return
    savedRef.current = true
    const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000))
    addSession({
      module: 'conversation',
      title: `Conversação · ${scenario.title}`,
      minutes,
      score: null,
      category: scenario.category,
    })
  }, [startedAt, scenario.title, scenario.category, addSession])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // grava ao sair (unmount) ou ao minimizar/fechar a aba — só uma vez
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') saveSession()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      saveSession()
    }
  }, [saveSession])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError(null)
    const next = [...messages, { role: 'user' as const, content: text }]
    setMessages(next)
    setLoading(true)
    try {
      const data = await callFunction<{ reply: string }>('chat', {
        system: systemPrompt(scenario),
        messages: next,
      })
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (e) {
      if (e instanceof NotConfiguredError) {
        setError('A conversação com IA precisa das chaves configuradas (vede o card abaixo).')
      } else {
        setError((e as Error).message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft">
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-card-border bg-card px-3 py-3 sm:px-4">
        <button
          onClick={onExit}
          aria-label="Voltar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-card-border text-foreground transition-colors hover:bg-soft hover:text-accent-dark"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft text-lg text-accent-dark">
          <span>{scenario.emoji}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate font-display font-bold leading-tight text-foreground">
              {scenario.title}
            </h2>
            <span className="hidden shrink-0 rounded-full bg-soft px-2 py-0.5 text-[11px] font-medium capitalize text-accent-dark sm:inline">
              {scenario.difficulty}
            </span>
          </div>
        </div>
        <button
          onClick={restart}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-card-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-soft hover:text-accent-dark"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 space-y-5 overflow-y-auto bg-muted/40 p-4">
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-accent-light">
              <UserRound className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 rounded-[4px_18px_18px_18px] border border-card-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> digitando…
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {!configured && (
        <div className="border-t border-card-border bg-warning/10 px-4 py-2 text-xs text-warning">
          Modo demonstração: configure as chaves no Supabase para conversar de verdade.
        </div>
      )}
      {error && (
        <div className="border-t border-card-border bg-error/10 px-4 py-2 text-xs text-error">
          {error}
        </div>
      )}

      {/* Composer */}
      <form
        className="flex items-center gap-2 border-t border-card-border bg-card p-3"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          aria-label="Gravar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-card-border text-foreground transition-colors hover:bg-soft hover:text-accent-dark"
        >
          <Mic className="h-5 w-5" />
        </button>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva sua resposta em inglês…"
          disabled={loading}
          className="h-11 flex-1 rounded-full border border-card-border bg-muted/50 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-accent disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Enviar"
          disabled={loading || !input.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

function Bubble({ role, content }: ChatMessage) {
  const isUser = role === 'user'
  const tipSplit = content.split('\n💡')
  const main = tipSplit[0]
  const tip = tipSplit[1]

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-[18px_4px_18px_18px] bg-primary px-4 py-2.5 text-sm text-primary-foreground">
          {main}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-accent-light">
        <UserRound className="h-4 w-4" />
      </div>
      <div className="max-w-[80%]">
        <div className="rounded-[4px_18px_18px_18px] border border-card-border bg-card px-4 py-2.5 text-sm text-foreground">
          {main}
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          {tip && (
            <span className="text-xs italic text-muted-foreground">💡{tip}</span>
          )}
          <button
            onClick={() => speak(main)}
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-accent-dark transition-colors hover:bg-soft"
            aria-label="Ouvir"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
