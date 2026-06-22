/**
 * Mapa: cada semana do planner -> deck temático de vocabulário.
 * Temas claros (comida, casa, viagem...) batem com o conteúdo; os demais
 * rodam pelos decks essenciais pra cobrir todo o vocabulário ao longo do ano.
 */

export const WEEK_DECK: Record<number, string> = {
  1: 'introductions',
  2: 'food',
  3: 'shopping',
  4: 'work',
  5: 'health',
  6: 'family',
  7: 'clothes',
  8: 'routine',
  9: 'house',
  10: 'food',
  11: 'shopping',
  12: 'feelings',
  13: 'nature',
  14: 'food',
  15: 'travel',
  16: 'house',
  17: 'work',
  18: 'health',
  19: 'clothes',
  20: 'routine',
  21: 'feelings',
  22: 'nature',
  23: 'food',
  24: 'travel',
  25: 'house',
  26: 'work',
  27: 'health',
  28: 'clothes',
  29: 'house',
  30: 'routine',
  31: 'feelings',
  32: 'nature',
  33: 'food',
  34: 'travel',
  35: 'family',
  36: 'work',
  37: 'health',
  38: 'clothes',
  39: 'food',
  40: 'routine',
  41: 'feelings',
  42: 'travel',
  43: 'nature',
  44: 'food',
  45: 'travel',
  46: 'work',
  47: 'health',
  48: 'clothes',
  49: 'routine',
  50: 'feelings',
  51: 'food',
  52: 'nature',
}

/** Deck temático da semana (fallback: introductions). */
export function deckForWeek(week: number): string {
  return WEEK_DECK[week] ?? 'introductions'
}
