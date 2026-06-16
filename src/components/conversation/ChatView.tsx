import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Send, ArrowLeft, Volume2, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
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
  const configured = isBackendConfigured()

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
    <div className="mx-auto flex h-[calc(100vh-12rem)] max-w-2xl flex-col">
      <div className="mb-3 flex items-center gap-3">
        <Button size="icon" variant="ghost" onClick={onExit} aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-2xl">{scenario.emoji}</span>
        <div>
          <h2 className="font-bold leading-tight">{scenario.title}</h2>
          <Badge variant="secondary" className="mt-0.5">{scenario.difficulty}</Badge>
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} content={m.content} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> digitando…
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

        <form
          className="flex items-center gap-2 border-t border-card-border p-3"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva sua resposta em inglês…"
            disabled={loading}
          />
          <Button type="submit" size="icon" variant="gradient" disabled={loading || !input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </Card>
    </div>
  )
}

function Bubble({ role, content }: ChatMessage) {
  const isUser = role === 'user'
  const tipSplit = content.split('\n💡')
  const main = tipSplit[0]
  const tip = tipSplit[1]
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'group max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-foreground'
        )}
      >
        <div className="flex items-start gap-2">
          <span>{main}</span>
          {!isUser && (
            <button
              onClick={() => speak(main)}
              className="mt-0.5 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Ouvir"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          )}
        </div>
        {tip && (
          <div className="mt-2 rounded-lg bg-warning/15 px-2 py-1 text-xs text-warning">
            💡{tip}
          </div>
        )}
      </div>
    </div>
  )
}
