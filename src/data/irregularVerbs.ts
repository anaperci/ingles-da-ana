import type { IrregularVerb } from '@/types/verbs'

/** Rótulos legíveis de cada padrão de mudança. */
export const IRREGULAR_PATTERNS: Record<string, string> = {
  'i-a-u': 'i → a → u',
  same: 'Não muda',
  'ought-aught': '-ought / -aught',
  'ow-ew-own': 'ow → ew → own',
  unique: 'Únicos',
}

/**
 * Verbos irregulares agrupados por PADRÃO de mudança (mais útil pra memorizar
 * que ordem alfabética). Arquivo separado para expandir depois.
 */
export const IRREGULAR_VERBS: IrregularVerb[] = [
  // i → a → u
  { id: 'iv-sing', kind: 'irregular', base: 'sing', past: 'sang', participle: 'sung', translation: 'cantar', pattern: 'i-a-u', level: 'A2' },
  { id: 'iv-ring', kind: 'irregular', base: 'ring', past: 'rang', participle: 'rung', translation: 'tocar (campainha)', pattern: 'i-a-u', level: 'A2' },
  { id: 'iv-drink', kind: 'irregular', base: 'drink', past: 'drank', participle: 'drunk', translation: 'beber', pattern: 'i-a-u', level: 'A1' },
  { id: 'iv-swim', kind: 'irregular', base: 'swim', past: 'swam', participle: 'swum', translation: 'nadar', pattern: 'i-a-u', level: 'A2' },
  { id: 'iv-begin', kind: 'irregular', base: 'begin', past: 'began', participle: 'begun', translation: 'começar', pattern: 'i-a-u', level: 'A2' },

  // não muda
  { id: 'iv-cut', kind: 'irregular', base: 'cut', past: 'cut', participle: 'cut', translation: 'cortar', pattern: 'same', level: 'A1' },
  { id: 'iv-put', kind: 'irregular', base: 'put', past: 'put', participle: 'put', translation: 'colocar', pattern: 'same', level: 'A1' },
  { id: 'iv-hit', kind: 'irregular', base: 'hit', past: 'hit', participle: 'hit', translation: 'bater/acertar', pattern: 'same', level: 'A2' },
  { id: 'iv-let', kind: 'irregular', base: 'let', past: 'let', participle: 'let', translation: 'deixar/permitir', pattern: 'same', level: 'A2' },
  { id: 'iv-cost', kind: 'irregular', base: 'cost', past: 'cost', participle: 'cost', translation: 'custar', pattern: 'same', level: 'A2' },

  // -ought / -aught
  { id: 'iv-buy', kind: 'irregular', base: 'buy', past: 'bought', participle: 'bought', translation: 'comprar', pattern: 'ought-aught', level: 'A1' },
  { id: 'iv-think', kind: 'irregular', base: 'think', past: 'thought', participle: 'thought', translation: 'pensar', pattern: 'ought-aught', level: 'A1' },
  { id: 'iv-bring', kind: 'irregular', base: 'bring', past: 'brought', participle: 'brought', translation: 'trazer', pattern: 'ought-aught', level: 'A2' },
  { id: 'iv-teach', kind: 'irregular', base: 'teach', past: 'taught', participle: 'taught', translation: 'ensinar', pattern: 'ought-aught', level: 'A2' },
  { id: 'iv-catch', kind: 'irregular', base: 'catch', past: 'caught', participle: 'caught', translation: 'pegar/capturar', pattern: 'ought-aught', level: 'A2' },

  // ow → ew → own
  { id: 'iv-grow', kind: 'irregular', base: 'grow', past: 'grew', participle: 'grown', translation: 'crescer', pattern: 'ow-ew-own', level: 'A2' },
  { id: 'iv-know', kind: 'irregular', base: 'know', past: 'knew', participle: 'known', translation: 'saber/conhecer', pattern: 'ow-ew-own', level: 'A1' },
  { id: 'iv-throw', kind: 'irregular', base: 'throw', past: 'threw', participle: 'thrown', translation: 'jogar/arremessar', pattern: 'ow-ew-own', level: 'A2' },
  { id: 'iv-blow', kind: 'irregular', base: 'blow', past: 'blew', participle: 'blown', translation: 'soprar', pattern: 'ow-ew-own', level: 'B1' },

  // únicos
  { id: 'iv-go', kind: 'irregular', base: 'go', past: 'went', participle: 'gone', translation: 'ir', pattern: 'unique', level: 'A1' },
  { id: 'iv-eat', kind: 'irregular', base: 'eat', past: 'ate', participle: 'eaten', translation: 'comer', pattern: 'unique', level: 'A1' },
  { id: 'iv-take', kind: 'irregular', base: 'take', past: 'took', participle: 'taken', translation: 'pegar/levar', pattern: 'unique', level: 'A1' },
  { id: 'iv-see', kind: 'irregular', base: 'see', past: 'saw', participle: 'seen', translation: 'ver', pattern: 'unique', level: 'A1' },
]
