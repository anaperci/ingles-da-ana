/**
 * Utilitário de texto para comparar respostas escritas (ex.: passado de verbo).
 * A avaliação de pronúncia por voz mudou para o Azure (função `pronounce`); só
 * o `normalize` continua útil para checagens de texto.
 */

/** Normaliza texto: minúsculas, sem acento, sem pontuação, espaços colapsados. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // tira acentos
    .replace(/[^a-z0-9\s]/g, ' ') // pontuação/apóstrofos viram espaço
    .replace(/\s+/g, ' ')
    .trim()
}
