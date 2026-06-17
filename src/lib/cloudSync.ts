/**
 * Sincronização de progresso na nuvem (cross-device, conta fixa).
 *
 * Estratégia: um snapshot único do localStorage por conta, guardado em
 * ingles.progress via a Edge Function `progress`. Last-writer-wins por
 * timestamp — ao abrir, se a nuvem estiver mais nova que o local, restaura;
 * a cada mudança, empurra o snapshot (com debounce).
 */
import { callFunction, isBackendConfigured } from '@/lib/api'
import {
  snapshotAll,
  restoreAll,
  getLocalUpdatedAt,
  setLocalUpdatedAt,
} from '@/lib/storage'

/** Conta fixa — mesmo progresso em qualquer dispositivo. */
const ACCOUNT_ID = 'ana'
const STORE_EVENT = 'ingles-store-change'
const DEBOUNCE_MS = 1500

interface CloudResult {
  payload: Record<string, unknown> | null
  updated_at: string | null
}

async function pull(): Promise<CloudResult> {
  return callFunction<CloudResult>('progress', { accountId: ACCOUNT_ID })
}

async function push(payload: Record<string, unknown>): Promise<void> {
  await callFunction('progress', { accountId: ACCOUNT_ID, payload })
}

/**
 * Carrega a nuvem para o localStorage ANTES do app renderizar, quando a nuvem
 * estiver mais recente. Falhas (offline/backend fora) são silenciosas — o app
 * segue com o estado local.
 */
export async function loadCloudIntoLocal(timeoutMs = 3000): Promise<void> {
  if (!isBackendConfigured()) return
  try {
    const res = await Promise.race([
      pull(),
      new Promise<CloudResult>((_, rej) =>
        setTimeout(() => rej(new Error('timeout')), timeoutMs)
      ),
    ])
    if (res?.payload && res.updated_at) {
      const cloudMs = new Date(res.updated_at).getTime()
      if (cloudMs > getLocalUpdatedAt()) {
        restoreAll(res.payload)
        setLocalUpdatedAt(cloudMs)
        // como o app já renderizou, avisa cada store pra reler o valor restaurado
        for (const key of Object.keys(res.payload)) {
          window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key } }))
        }
      }
    }
  } catch {
    /* offline ou backend indisponível — ignora */
  }
}

let timer: ReturnType<typeof setTimeout> | null = null

function scheduleFlush() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(flush, DEBOUNCE_MS)
}

async function flush() {
  if (!isBackendConfigured()) return
  try {
    await push(snapshotAll())
  } catch {
    /* tenta de novo na próxima mudança */
  }
}

/** Inicia o autosave: empurra o snapshot a cada mudança (com debounce). */
export function startCloudAutosave() {
  if (!isBackendConfigured()) return

  window.addEventListener(STORE_EVENT, () => {
    setLocalUpdatedAt(Date.now())
    scheduleFlush()
  })

  // Garante o envio ao sair/minimizar (sem debounce).
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush()
  })
}
