/**
 * Acesso ao Azure (pronúncia + vozes naturais). É um recurso PAGO que roda na
 * chave da conta dona. Para os demais usuários fica bloqueado, a menos que
 * conectem a própria chave Azure (BYOK — bring your own key).
 */
import { loadJSON, saveJSON } from '@/lib/storage'
import { getUserEmail, getAccessToken } from '@/lib/account'

/** Conta dona (usa o Azure do servidor sem custo pro usuário). */
export const OWNER_EMAIL = 'contato@anapaulaperci.com'

interface AzureCreds {
  key: string
  region: string
}

const KEY = 'azure:creds'

export function isOwner(): boolean {
  return getUserEmail().toLowerCase() === OWNER_EMAIL
}

export function getAzureCreds(): AzureCreds {
  return loadJSON<AzureCreds>(KEY, { key: '', region: '' })
}

export function setAzureCreds(creds: AzureCreds): void {
  saveJSON(KEY, { key: creds.key.trim(), region: creds.region.trim() })
}

export function hasByok(): boolean {
  return getAzureCreds().key.length > 0
}

/** Azure disponível para este usuário? (dona ou tem chave própria) */
export function azureAvailable(): boolean {
  return isOwner() || hasByok()
}

/** Campos extras enviados às funções de Azure: token (identifica a dona) + BYOK. */
export function azureExtras(): Record<string, string> {
  const extras: Record<string, string> = { token: getAccessToken() }
  const creds = getAzureCreds()
  if (creds.key) {
    extras.azureKey = creds.key
    if (creds.region) extras.azureRegion = creds.region
  }
  return extras
}
