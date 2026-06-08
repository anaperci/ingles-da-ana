import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'

/** Interesses selecionados pela usuária para personalizar os vídeos. */
export function useInterests() {
  const [selected, setSelected] = useLocalStore<string[]>(STORAGE_KEYS.interests, [
    'daily',
    'travel',
  ])

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  return { selected, toggle, setSelected }
}
