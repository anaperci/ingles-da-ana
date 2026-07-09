import { useCallback, useEffect, useState } from 'react'
import { callFunction, isBackendConfigured } from '@/lib/api'
import { loadJSON, saveJSON, todayKey } from '@/lib/storage'
import { STORAGE_KEYS } from '@/lib/keys'
import { INTERESTS } from '@/data/interests'
import { CURATED_VIDEOS } from '@/data/curatedVideos'
import type { DailyVideo } from '@/types/video'

/** Sobe quando o critério de vídeo muda (ex.: virou "aulas com filmes e séries"),
 * pra invalidar os vídeos já cacheados e puxar um novo no tema certo. */
const CACHE_VERSION = 2

interface CachedDaily {
  date: string
  video: DailyVideo
  v?: number
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
      if (!force && cached && cached.date === todayKey() && cached.v === CACHE_VERSION) {
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
          // sem interesses selecionados → manda todas as buscas de filmes/séries
          queries: queries.length ? queries : INTERESTS.map((i) => i.query),
        })
        setVideo(res.video)
        setFromFallback(false)
        saveJSON<CachedDaily>(STORAGE_KEYS.dailyVideo, {
          date: todayKey(),
          video: res.video,
          v: CACHE_VERSION,
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
