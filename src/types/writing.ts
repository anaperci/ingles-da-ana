import type { CommonWord } from '@/data/commonWords'

/** Quantas frases a Ana escreve por dia. */
export const DAILY_SENTENCE_GOAL = 10

/** Estado de UMA frase do dia (a palavra-alvo + o que a Ana escreveu). */
export interface DailySentence {
  /** id da palavra-alvo (de COMMON_WORDS) */
  wordId: string
  word: string
  translation: string
  /** frase escrita pela Ana (vazia = ainda não feita) */
  text: string
  /** marcada como "não sei" — pula a frase sem precisar escrever */
  dontKnow?: boolean
  /** palavra que voltou da fila de revisão (errou antes, está sendo recobrada) */
  review?: boolean
}

/** Correção da IA para uma frase. */
export interface SentenceFeedback {
  wordId: string
  /** a frase já estava correta? */
  ok: boolean
  /** versão corrigida (ou a mesma, se já estiver certa) */
  correction: string
  /** explicação em PT do que estava errado e por quê */
  note: string
  /** o jeito certo de fazer: a regra prática a aplicar na próxima */
  rule?: string
}

/** Avaliação completa do dia, vinda da IA. */
export interface WritingFeedback {
  items: SentenceFeedback[]
  /** dicas gerais a partir dos padrões de erro */
  insights: string[]
  /** mensagem de resumo/encorajamento */
  summary: string
  /** % de frases escritas que estavam corretas */
  score: number
}

/** O caderno de um dia: as frases daquele dia (YYYY-MM-DD). */
export interface DailyWritingDay {
  date: string
  sentences: DailySentence[]
  /** marcada como concluída (registrou sessão) */
  completed: boolean
  /** avaliação da IA (após finalizar) */
  feedback?: WritingFeedback
}

/** Mapa de dias persistido em localStorage. */
export type DailyWritingStore = Record<string, DailyWritingDay>

export type { CommonWord }
