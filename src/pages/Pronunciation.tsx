import { Mic } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function Pronunciation() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={Mic} title="Pronúncia" subtitle="Em construção…" />
    </div>
  )
}
