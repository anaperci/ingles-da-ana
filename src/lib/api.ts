/**
 * Cliente das Edge Functions do Supabase (proxies seguros para OpenAI, Azure e
 * YouTube). As chaves NUNCA ficam no frontend — vivem como secrets nas functions.
 *
 * Config via env (.env):
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=sb_publishable_...
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export class NotConfiguredError extends Error {
  constructor(msg = 'Backend não configurado') {
    super(msg)
    this.name = 'NotConfiguredError'
  }
}

export function isBackendConfigured(): boolean {
  return Boolean(SUPABASE_URL && ANON_KEY)
}

function functionsBase(): string {
  if (!SUPABASE_URL) throw new NotConfiguredError()
  return `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1`
}

export async function callFunction<T>(
  name: string,
  body: unknown,
  signal?: AbortSignal
): Promise<T> {
  if (!isBackendConfigured()) throw new NotConfiguredError()
  const res = await fetch(`${functionsBase()}/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ANON_KEY}`,
      apikey: ANON_KEY as string,
    },
    body: JSON.stringify(body),
    signal,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Erro ${res.status}: ${text || res.statusText}`)
  }
  return (await res.json()) as T
}
