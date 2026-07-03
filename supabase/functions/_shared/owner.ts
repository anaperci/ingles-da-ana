// Gating de custo por conta dona (mesma lógica do Azure): recursos pagos só
// rodam para a conta OWNER_EMAIL, identificada pelo email dentro do access token.

export const OWNER_EMAIL = 'contato@anapaulaperci.com'

/** Email do usuário a partir do access token (decodifica o payload do JWT). */
export function emailFromToken(token: string): string {
  try {
    const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(part))
    return String(payload.email ?? '').toLowerCase()
  } catch {
    return ''
  }
}

export function isOwnerToken(token: string | undefined): boolean {
  return emailFromToken(token ?? '') === OWNER_EMAIL
}

export function paidFeatureResponse() {
  return {
    error: 'paid_feature',
    message:
      'A geração de exercícios com IA usa a API da Anthropic (recurso pago) e está disponível apenas para a conta dona.',
  }
}
