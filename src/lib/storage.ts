/**
 * Camada de persistência. Hoje é localStorage; foi desenhada com uma interface
 * fina (get/set/remove) para depois ser trocada por Supabase sem mexer nos hooks
 * que a consomem.
 */

const PREFIX = 'ingles-da-ana:'

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage cheio ou indisponível — ignora silenciosamente */
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    /* noop */
  }
}

/** Data no formato YYYY-MM-DD no fuso LOCAL (não UTC). */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Chave de metadados do sync (não entra no snapshot). */
const SYNC_META = PREFIX + '__sync_meta'

/** Snapshot de todo o estado local (chaves do app) para enviar à nuvem. */
export function snapshotAll(): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const full = localStorage.key(i)
    if (!full || !full.startsWith(PREFIX) || full === SYNC_META) continue
    const key = full.slice(PREFIX.length)
    try {
      out[key] = JSON.parse(localStorage.getItem(full) as string)
    } catch {
      /* valor não-JSON: ignora */
    }
  }
  return out
}

/** Restaura um snapshot vindo da nuvem para o localStorage. */
export function restoreAll(payload: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(payload)) {
    saveJSON(key, value)
  }
}

/** Timestamp (ms) da última alteração local conhecida. */
export function getLocalUpdatedAt(): number {
  return loadJSON<number>('__sync_meta', 0)
}

export function setLocalUpdatedAt(ms: number): void {
  saveJSON('__sync_meta', ms)
}
