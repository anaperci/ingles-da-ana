import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'

/** Preferência global: mostrar/ocultar tradução em PT. Compartilhada entre módulos. */
export function useShowTranslation() {
  const [show, setShow] = useLocalStore<boolean>(STORAGE_KEYS.showTranslation, true)
  return { show, setShow, toggle: () => setShow((v) => !v) }
}
