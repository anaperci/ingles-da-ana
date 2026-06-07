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

/** Data de hoje no formato YYYY-MM-DD (fuso local). */
export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}
