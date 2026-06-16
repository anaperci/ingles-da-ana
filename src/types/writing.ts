import type { CommonWord } from '@/data/commonWords'

/** Quantas frases a Ana escreve por dia. */
export const DAILY_SENTENCE_GOAL = 30

/** Estado de UMA frase do dia (a palavra-alvo + o que a Ana escreveu). */
export interface DailySentence {
  /** id da palavra-alvo (de COMMON_WORDS) */
  wordId: string
  word: string
  translation: string
  /** frase escrita pela Ana (vazia = ainda não feita) */
  text: string
}

/** O caderno de um dia: as 30 frases daquele dia (YYYY-MM-DD). */
export interface DailyWritingDay {
  date: string
  sentences: DailySentence[]
  /** marcada como concluída (registrou sessão) */
  completed: boolean
}

/** Mapa de dias persistido em localStorage. */
export type DailyWritingStore = Record<string, DailyWritingDay>

export type { CommonWord }
