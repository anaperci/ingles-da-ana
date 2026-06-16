/**
 * Contrato agnóstico de engine para avaliação de pronúncia.
 *
 * Hoje é produzido pela Web Speech API (transcrição + comparação textual),
 * mas qualquer motor — inclusive uma avaliação fonética do Azure — pode
 * devolver este mesmo shape SEM que a interface (componente) precise mudar.
 * É a fronteira entre "como avalia" e "como exibe".
 */

export type WordStatus = 'matched' | 'partial' | 'missing' | 'extra'

export interface WordAssessment {
  /** palavra da frase de referência (na ordem da frase) */
  word: string
  status: WordStatus
  /** 0-100: quão bem essa palavra saiu */
  score: number
}

export interface PronunciationAssessment {
  /** 0-100: compreensibilidade geral (a nota principal) */
  overallScore: number
  /** 0-100: precisão média das palavras que a pessoa tentou falar */
  accuracyScore?: number
  /** 0-100: % das palavras da referência que foram ditas */
  completenessScore?: number
  /** dimensões que só uma avaliação fonética (Azure) consegue medir */
  fluencyScore?: number
  prosodyScore?: number
  /** texto que o reconhecedor entendeu */
  transcript: string
  /** alinhamento palavra a palavra com a frase de referência */
  words: WordAssessment[]
  /** palavras ditas que não estavam na referência (inserções) */
  extras: string[]
}
