/** Tipos compartilhados dos módulos de gramática (preposições, advérbios, etc.). */

export interface GrammarCategory {
  key: string
  label: string
}

export interface GrammarExercise {
  id: string
  /** categoria (bate com GrammarCategory.key) */
  category: string
  /** frase em inglês com a lacuna "___" */
  prompt: string
  /** dica em PT do que preencher */
  hint: string
  /** forma certa */
  answer: string
  /** alternativas (inclui a certa) */
  options: string[]
  /** explicação curta em PT */
  note: string
}

/** Frase completa (prompt com a resposta na lacuna). */
export function filledSentence(ex: GrammarExercise): string {
  return ex.prompt.replace('___', ex.answer)
}
