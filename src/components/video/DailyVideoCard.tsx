import { useState } from 'react'
import { Play, RefreshCw, Check, ExternalLink, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDailyVideo } from '@/hooks/useDailyVideo'
import { useInterests } from '@/hooks/useInterests'
import { useProgress } from '@/hooks/useProgress'
import { useLocalStore } from '@/hooks/useLocalStore'
import { todayKey } from '@/lib/storage'

export function DailyVideoCard() {
  const { selected } = useInterests()
  const { video, loading, fromFallback, refresh } = useDailyVideo(selected)
  const { addSession } = useProgress()
  const [open, setOpen] = useState(false)
  // persiste a data em que foi assistido — sobrevive a reload, sem contar 2×
  const [watchedDate, setWatchedDate] = useLocalStore<string>('video:watched', '')
  const watched = watchedDate === todayKey()

  function markWatched() {
    if (watched || !video) return
    setWatchedDate(todayKey())
    addSession({
      module: 'video',
      title: `Vídeo · ${video.title.slice(0, 40)}`,
      minutes: 5,
      score: null,
    })
  }

  if (loading) {
    return (
      <Card className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    )
  }

  if (!video) return null

  return (
    <>
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <button
            className="group relative aspect-video w-full overflow-hidden bg-muted"
            onClick={() => setOpen(true)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-elevated transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
              </span>
            </span>
          </button>

          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">🔥 Vídeo do dia</Badge>
              {fromFallback && <Badge variant="warning">curado</Badge>}
            </div>
            <h3 className="text-lg font-bold leading-snug">{video.title}</h3>
            <p className="text-sm text-muted-foreground">{video.channel}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {video.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              <Button variant="gradient" onClick={() => setOpen(true)}>
                <Play className="h-4 w-4" /> Assistir
              </Button>
              <Button
                variant={watched ? 'secondary' : 'outline'}
                onClick={markWatched}
                disabled={watched}
              >
                <Check className="h-4 w-4" />
                {watched ? 'Assistido' : 'Marcar como assistido'}
              </Button>
              <Button variant="ghost" size="icon" onClick={refresh} aria-label="Outro vídeo">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="pr-8">{video.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex justify-between">
            <a
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button variant="outline" onClick={markWatched} disabled={watched}>
              <Check className="h-4 w-4" /> {watched ? 'Assistido' : 'Marcar como assistido'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
