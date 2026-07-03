import { MonitorPlay } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { DailyVideoCard } from '@/components/video/DailyVideoCard'
import { InterestPicker } from '@/components/video/InterestPicker'

export default function Video() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        icon={MonitorPlay}
        title="Video of the day"
        subtitle="One video a day, picked based on your interests"
      />
      <DailyVideoCard />
      <InterestPicker />
    </div>
  )
}
