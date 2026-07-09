import { useLocalStore } from './useLocalStore'
import { useProgress } from './useProgress'
import type { ModuleKey } from '@/types'

type DoneMap = Record<string, true>

interface SessionInfo {
  module: ModuleKey
  title: string
  minutes?: number
}

/**
 * Marca itens de estudo (cards) como "praticados", persistindo em localStorage.
 * Ao marcar um item pela primeira vez, registra uma sessão de prática — assim o
 * card entra no streak/minutos da Home como qualquer outro módulo.
 */
export function useStudyMarks(storageKey: string) {
  const [done, setDone] = useLocalStore<DoneMap>(storageKey, {})
  const { addSession } = useProgress()

  const isDone = (id: string) => Boolean(done[id])

  function toggle(id: string, session?: SessionInfo) {
    const wasDone = Boolean(done[id])
    setDone((prev) => {
      const next = { ...prev }
      if (next[id]) delete next[id]
      else next[id] = true
      return next
    })
    if (!wasDone && session) {
      addSession({
        module: session.module,
        title: session.title,
        minutes: session.minutes ?? 1,
        score: null,
      })
    }
  }

  /** quantos dos ids informados estão marcados */
  const countDone = (ids: string[]) => ids.reduce((n, id) => (done[id] ? n + 1 : n), 0)

  return { isDone, toggle, countDone }
}
