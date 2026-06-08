import { useCallback, useEffect, useState } from 'react'
import { callFunction, isBackendConfigured } from '@/lib/api'
import { loadJSON, saveJSON, todayKey } from '@/lib/storage'
import { STORAGE_KEYS } from '@/lib/keys'
import { INTERESTS } from '@/data/interests'
import { CURATED_VIDEOS } from '@/data/curatedVideos'
import type { DailyVideo } from '@/types/video'

interface CachedDaily {
  date: string
  video: DailyVideo
}

function curatedForToday(): DailyVideo {
  const day = Number(todayKey().replaceAll('-', ''))
  return CURATED_VIDEOS[day % CURATED_VIDEOS.length]
}

export function useDailyVideo(selectedInterests: string[]) {
  const [video, setVideo] = useState<DailyVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [fromFallback, setFromFallback] = useState(false)

  const load = useCallback(
    async (force = false) => {
      setLoading(true)
      const cached = loadJSON<CachedDaily | null>(STORAGE_KEYS.dailyVideo, null)
      if (!force && cached && cached.date === todayKey()) {
        setVideo(cached.video)
        setLoading(false)
        return
      }

      if (!isBackendConfigured()) {
        const v = curatedForToday()
        setVideo(v)
        setFromFallback(true)
        setLoading(false)
        return
      }

      try {
        const queries = INTERESTS.filter((i) => selectedInterests.includes(i.key)).map(
          (i) => i.query
        )
        const res = await callFunction<{ video: DailyVideo }>('daily-video', {
          queries: queries.length ? queries : [INTERESTS[0].query],
        })
        setVideo(res.video)
        setFromFallback(false)
        saveJSON<CachedDaily>(STORAGE_KEYS.dailyVideo, {
          date: todayKey(),
          video: res.video,
        })
      } catch {
        const v = curatedForToday()
        setVideo(v)
        setFromFallback(true)
      } finally {
        setLoading(false)
      }
    },
    [selectedInterests]
  )

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { video, loading, fromFallback, refresh: () => load(true) }
}
