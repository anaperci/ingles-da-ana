import { useState } from 'react'
import { MessagesSquare } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { ChatView } from '@/components/conversation/ChatView'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CONVERSATION_SCENARIOS, type ConversationScenario } from '@/data/conversationScenarios'

export default function Conversation() {
  const [active, setActive] = useState<ConversationScenario | null>(null)

  if (active) {
    return (
      <div className="animate-fade-in">
        <ChatView scenario={active} onExit={() => setActive(null)} />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={MessagesSquare}
        title="Conversação com IA"
        subtitle="Pratique falar em cenários reais — a IA responde e corrige você"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONVERSATION_SCENARIOS.map((s) => (
          <Card
            key={s.id}
            onClick={() => setActive(s)}
            className="flex cursor-pointer flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">{s.emoji}</span>
              <h3 className="font-semibold">{s.title}</h3>
            </div>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">{s.description}</p>
            <Badge variant="secondary" className="w-fit">{s.difficulty}</Badge>
          </Card>
        ))}
      </div>
    </div>
  )
}
