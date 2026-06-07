import { MessagesSquare } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function Conversation() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={MessagesSquare} title="Conversação com IA" subtitle="Em construção…" />
    </div>
  )
}
