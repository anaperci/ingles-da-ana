import type { GrammarCategory, GrammarExercise } from './grammarTypes'

// Advérbios — Ana vai fornecer o conteúdo completo.
// Estrutura de cada exercício:
//   { id, category, prompt (com "___"), hint, answer, options, note }
// As categorias abaixo são um ponto de partida; ajuste os labels/keys como quiser.

export const ADVERB_CATEGORIES: GrammarCategory[] = [
  { key: 'manner', label: 'Modo (how)' },
  { key: 'frequency', label: 'Frequência' },
  { key: 'time', label: 'Tempo' },
  { key: 'place', label: 'Lugar/grau' },
]

export const ADVERB_EXERCISES: GrammarExercise[] = [
  // Placeholder inicial pra página funcionar — troque por sua lista.
  {
    id: 'adv-1',
    category: 'manner',
    prompt: 'She sings very ___.',
    hint: 'lindamente',
    answer: 'beautifully',
    options: ['beautifully', 'beautiful', 'beauty'],
    note: 'Advérbio de modo: adjetivo + “-ly”. beautiful → beautifully.',
  },
  {
    id: 'adv-2',
    category: 'frequency',
    prompt: 'I ___ drink coffee in the morning.',
    hint: 'sempre',
    answer: 'always',
    options: ['always', 'never', 'yet'],
    note: 'Advérbios de frequência vêm antes do verbo principal: I always drink…',
  },
]
