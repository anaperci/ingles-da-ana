/**
 * Motor de repetição espaçada (SM-2 / SuperMemo 2).
 * Genérico e reutilizável por qualquer módulo de estudo (Vocabulário, Verbos, etc.).
 *
 * Mantém o estado mínimo de revisão por item e calcula a próxima data de revisão
 * a partir da "qualidade" da resposta (0-5). Não conhece o domínio (palavra/verbo);
 * só recebe um id e devolve o novo estado.
 */

export interface SrsState {
  /** facilidade — quanto maior, mais espaçadas as revisões (mín. 1.3) */
  easeFactor: number
  /** intervalo atual em dias até a próxima revisão */
  interval: number
  /** número de revisões corretas seguidas */
  repetitions: number
  /** timestamp (ms) da próxima revisão */
  dueDate: number
  /** timestamp (ms) da última revisão */
  lastReviewed: number | null
  /** total de revisões já feitas */
  totalReviews: number
  /** total de acertos */
  correct: number
}

/** Qualidade da resposta no SM-2: 0 = errou feio, 5 = acertou de imediato. */
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5

const DAY_MS = 24 * 60 * 60 * 1000

export function initialSrsState(now = Date.now()): SrsState {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: now,
    lastReviewed: null,
    totalReviews: 0,
    correct: 0,
  }
}

/**
 * Aplica uma revisão e devolve o novo estado SM-2.
 * quality >= 3 conta como acerto.
 */
export function reviewSrs(
  state: SrsState,
  quality: ReviewQuality,
  now = Date.now()
): SrsState {
  const passed = quality >= 3
  let { easeFactor, interval, repetitions } = state

  if (passed) {
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easeFactor)
    repetitions += 1
  } else {
    repetitions = 0
    interval = 1
  }

  // ajuste do fator de facilidade
  easeFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  return {
    easeFactor,
    interval,
    repetitions,
    dueDate: now + interval * DAY_MS,
    lastReviewed: now,
    totalReviews: state.totalReviews + 1,
    correct: state.correct + (passed ? 1 : 0),
  }
}

/** Item está "vencido" (pronto para revisar) agora? */
export function isDue(state: SrsState, now = Date.now()): boolean {
  return state.dueDate <= now
}

/**
 * Um item é considerado "dominado" quando tem boa sequência de acertos
 * e o intervalo já passou de ~3 semanas.
 */
export function isMastered(state: SrsState): boolean {
  return state.repetitions >= 4 && state.interval >= 21
}

/** Ordena ids por prioridade de revisão: vencidos primeiro, depois mais atrasados. */
export function sortByPriority<T extends { srs: SrsState }>(
  items: T[],
  now = Date.now()
): T[] {
  return [...items].sort((a, b) => {
    const aDue = a.srs.dueDate - now
    const bDue = b.srs.dueDate - now
    return aDue - bDue
  })
}
