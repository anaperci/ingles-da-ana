import { useCallback, useEffect, useState } from 'react'
import { loadJSON, saveJSON } from '@/lib/storage'

/**
 * Estado persistido em localStorage e sincronizado entre todos os componentes
 * que usam a mesma chave (via CustomEvent). Base reutilizável por todos os
 * módulos (Vocabulário, Verbos, progresso, etc.).
 */
const EVENT = 'ingles-store-change'

type Updater<T> = T | ((prev: T) => T)

export function useLocalStore<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => loadJSON(key, initial))

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.key === key) {
        setValue(loadJSON(key, initial))
      }
    }
    window.addEventListener(EVENT, handler)
    return () => window.removeEventListener(EVENT, handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const update = useCallback(
    (next: Updater<T>) => {
      setValue((prev) => {
        const resolved =
          typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        saveJSON(key, resolved)
        window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }))
        return resolved
      })
    },
    [key]
  )

  return [value, update] as const
}
