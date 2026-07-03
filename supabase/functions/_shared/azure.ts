// Resolve a chave/região do Azure com GATING de custo:
//  - se o body traz azureKey (BYOK), usa a chave do próprio usuário;
//  - senão, se o token é da conta DONA, usa a chave do servidor (secrets);
//  - senão, bloqueia (função paga).
declare const Deno: { env: { get(k: string): string | undefined } }

const OWNER_EMAIL = 'contato@anapaulaperci.com'

export interface AzureBody {
  token?: string
  azureKey?: string
  azureRegion?: string
}

export interface Azure {
  key: string
  region: string
}

/** Normaliza uma chave Azure (remove o dígito "Key 1/2" colado quando tem 85 chars). */
function normKey(k: string): string {
  const t = k.trim()
  return t.length === 85 ? t.slice(1) : t
}

/** Email do usuário a partir do access token (decodifica o payload do JWT). */
function emailFromToken(token: string): string {
  try {
    const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(part))
    return String(payload.email ?? '').toLowerCase()
  } catch {
    return ''
  }
}

/** Chave/região do servidor (à prova de troca de chave/região). */
function serverAzure(): Azure {
  const raw1 = (Deno.env.get('AZURE_SPEECH_KEY') ?? '').trim()
  const raw2 = (Deno.env.get('AZURE_SPEECH_REGION') ?? '').trim()
  const looksKey = (s: string) => s.length > 24
  const looksRegion = (s: string) => /^[a-z][a-z0-9]*$/.test(s) && s.length <= 24
  const key = normKey(looksKey(raw1) ? raw1 : looksKey(raw2) ? raw2 : raw1)
  const region =
    looksRegion(raw1) && !looksKey(raw1)
      ? raw1
      : looksRegion(raw2) && !looksKey(raw2)
        ? raw2
        : 'eastus'
  return { key, region }
}

/**
 * Devolve a chave/região a usar, ou `null` se for função paga bloqueada
 * (usuário não-dono e sem chave própria).
 */
export function resolveAzure(body: AzureBody): Azure | null {
  if (body.azureKey && body.azureKey.trim().length > 0) {
    return { key: normKey(body.azureKey), region: (body.azureRegion || 'eastus').trim() }
  }
  if (emailFromToken(body.token ?? '') === OWNER_EMAIL) {
    return serverAzure()
  }
  return null
}

export function paidFeatureResponse() {
  return {
    error: 'paid_feature',
    message:
      'A avaliação de pronúncia e as vozes naturais usam o Azure (recurso pago). Conecte sua própria chave Azure para liberar.',
  }
}
