/**
 * Conta ativa (multiusuário). O id da conta é o id do usuário autenticado —
 * usado como chave nos snapshots de progresso e nas notas.
 *
 * O localStorage do app é um cache do usuário atual. Como ele é global do
 * navegador, ao trocar de usuário limpamos os dados do usuário anterior. Os
 * dados que já existiam ANTES do login (ex.: uso da Ana antes do multiusuário)
 * são "adotados" pelo primeiro usuário que entrar, para não se perderem.
 */

const PREFIX = 'ingles-da-ana:'
const OWNER_KEY = `${PREFIX}__owner`

let currentAccountId = 'ana'

export function getAccountId(): string {
  return currentAccountId
}

export function setAccountId(id: string): void {
  currentAccountId = id
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
 * Define a conta ativa. (O carregamento da nuvem é feito depois, pelo AuthGate.)
 */
export function adoptOrClearLocal(userId: string): void {
  const owner = localStorage.getItem(OWNER_KEY)
  if (!owner) {
    localStorage.setItem(OWNER_KEY, userId)
  } else if (owner !== userId) {
    clearAppKeys()
    localStorage.setItem(OWNER_KEY, userId)
  }
  setAccountId(userId)
}
