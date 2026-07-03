import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MessagesSquare } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { ChatView } from '@/components/conversation/ChatView'
import { Card } from '@/components/ui/card'
import { CONVERSATION_SCENARIOS, type ConversationScenario } from '@/data/conversationScenarios'

/** Cria um cenário a partir de uma tarefa do planner (deep-link `?topic=`). */
function plannerScenario(topic: string): ConversationScenario {
  return {
    id: 'planner',
    title: 'Planner practice',
    emoji: '📅',
    category: 'social',
    difficulty: 'beginner',
    description: topic,
    context: `Free conversation practice based on a task from Ana's study planner. The task is written in Portuguese: "${topic}". Understand the gist, pick a friendly, simple angle in English, and chat with her about it. Keep it light and encouraging.`,
    opener:
      "Hi Ana! Let's practice with today's planner task. No worries about being perfect — just start and I'll help you. So, tell me: how are you today? 😊",
  }
}

export default function Conversation() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const topic = params.get('topic')?.trim()
  const [active, setActive] = useState<ConversationScenario | null>(null)

  const current = topic ? plannerScenario(topic) : active

  if (current) {
    return (
      <div className="animate-fade-in">
        <ChatView
          scenario={current}
          onExit={() => {
            setActive(null)
            if (topic) navigate('/conversacao', { replace: true })
          }}
        />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={MessagesSquare}
        title="Conversation with AI"
        subtitle="Practice speaking in real scenarios — the AI replies and corrects you"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONVERSATION_SCENARIOS.map((s) => (
          <Card
            key={s.id}
            onClick={() => setActive(s)}
            className="group flex cursor-pointer flex-col border-card-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-soft text-xl text-accent-dark transition-colors group-hover:bg-accent/15">
                <span>{s.emoji}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground">{s.title}</h3>
            </div>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">{s.description}</p>
            <span className="w-fit rounded-full bg-soft px-2.5 py-0.5 text-xs font-medium capitalize text-accent-dark">
              {s.difficulty}
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}
