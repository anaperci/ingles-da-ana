import { Play } from 'lucide-react'
import { DailyVideoCard } from '@/components/video/DailyVideoCard'
import { InterestPicker } from '@/components/video/InterestPicker'

export default function Video() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-primary shadow-soft">
          <Play className="h-7 w-7 text-accent-light" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">Vídeo do dia</h1>
          <p className="text-muted-foreground">
            Um vídeo por dia, escolhido com base nos seus interesses
          </p>
        </div>
      </div>
      <DailyVideoCard />
      <InterestPicker />
    </div>
  )
}
