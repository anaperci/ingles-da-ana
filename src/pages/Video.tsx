import { MonitorPlay } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function Video() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={MonitorPlay} title="Vídeo do dia" subtitle="Em construção…" />
    </div>
  )
}
