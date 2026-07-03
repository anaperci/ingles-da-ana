/**
 * Conta ativa (multiusuário). O id da conta é o id do usuário autenticado —
 * usado como chave nos snapshots de progresso e nas notas. Guarda também o
 * email e o access token, usados para identificar a "conta dona" (Azure).
 */

const PREFIX = 'ingles-da-ana:'
const OWNER_KEY = `${PREFIX}__owner`

let currentAccountId = 'ana'
let currentEmail = ''
let currentToken = ''

export function getAccountId(): string {
  return currentAccountId
}
export function getUserEmail(): string {
  return currentEmail
}
export function getAccessToken(): string {
  return currentToken
}

export function setAuth(userId: string, email: string, token: string): void {
  currentAccountId = userId
  currentEmail = email
  currentToken = token
}

function clearAppKeys(): void {
  const toRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(PREFIX) && key !== OWNER_KEY) toRemove.push(key)
  }
  for (const key of toRemove) localStorage.removeItem(key)
}

/**
 * Prepara o localStorage para o usuário que acabou de logar:
 * - se não há dono ainda, adota os dados atuais (não apaga);
 * - se o dono é outro usuário, limpa o cache antes de carregar os dados dele.
 */
export function adoptOrClearLocal(userId: string): void {
  const owner = localStorage.getItem(OWNER_KEY)
  if (!owner) {
    localStorage.setItem(OWNER_KEY, userId)
  } else if (owner !== userId) {
    clearAppKeys()
    localStorage.setItem(OWNER_KEY, userId)
  }
}
