/**
 * Cliente dos exercícios — fala com as Edge Functions `generate-exercises`
 * (Anthropic, só dona) e `exercises` (CRUD + prática, escopo por conta).
 */
import { callFunction } from '@/lib/api'
import { getAccountId, getAccessToken } from '@/lib/account'

export type ExerciseType = 'multiple_choice' | 'fill_blank' | 'rewrite' | 'match'
export type ExerciseTopic =
  | 'prepositions'
  | 'adverbs'
  | 'verbs'
  | 'sentence_frames'
  | 'vocabulary'
  | 'other'
export type Difficulty = 'easy' | 'medium' | 'hard'

/** options do tipo 'match' */
export interface MatchOptions {
  left: string[]
  right: string[]
  pairs: [number, number][]
}

export type ExerciseOptions = string[] | MatchOptions | null

/** Exercício gerado pela IA (ainda sem id/persistência). */
export interface GeneratedExercise {
  type: ExerciseType
  topic: ExerciseTopic
  difficulty: Difficulty
  question: string
  options: ExerciseOptions
  correct_answer: string
  explanation: string
}

/** Exercício salvo no banco. */
export interface Exercise extends GeneratedExercise {
  id: string
  source: string | null
  created_at: string
  /** última tentativa (join no list) */
  last_correct?: boolean | null
  last_attempt?: string | null
}

export interface ExerciseStats {
  total: number
  attempted: number
  accuracy: number
  weakestTopic: ExerciseTopic | null
}

/** Gera exercícios via IA (Anthropic). Só a conta dona consegue. */
export async function generateExercises(prompt: string): Promise<GeneratedExercise[]> {
  const res = await callFunction<{ exercises: GeneratedExercise[] }>('generate-exercises', {
    prompt,
    token: getAccessToken(),
  })
  return res.exercises ?? []
}

export async function listExercises(): Promise<Exercise[]> {
  const res = await callFunction<{ exercises: Exercise[] }>('exercises', {
    action: 'list',
    accountId: getAccountId(),
  })
  return res.exercises ?? []
}

export async function createExercises(
  exercises: GeneratedExercise[],
  source: 'chat' | 'manual'
): Promise<number> {
  const res = await callFunction<{ inserted: number }>('exercises', {
    action: 'create',
    accountId: getAccountId(),
    exercises,
    source,
  })
  return res.inserted ?? 0
}

export async function saveAttempt(
  exerciseId: string,
  userAnswer: string,
  isCorrect: boolean
): Promise<void> {
  await callFunction('exercises', {
    action: 'attempt',
    accountId: getAccountId(),
    exerciseId,
    userAnswer,
    isCorrect,
  })
}

export async function getStats(): Promise<ExerciseStats> {
  return callFunction<ExerciseStats>('exercises', {
    action: 'stats',
    accountId: getAccountId(),
  })
}

// ---- helpers de UI ----

export const TYPE_LABEL: Record<ExerciseType, string> = {
  multiple_choice: 'Múltipla escolha',
  fill_blank: 'Preencher lacuna',
  rewrite: 'Reescrever',
  match: 'Associar',
}

export const TOPIC_LABEL: Record<ExerciseTopic, string> = {
  prepositions: 'Preposições',
  adverbs: 'Advérbios',
  verbs: 'Verbos',
  sentence_frames: 'Estruturas',
  vocabulary: 'Vocabulário',
  other: 'Outro',
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

/** Badge por tipo (paleta petróleo/âmbar + verde/roxo). */
export const TYPE_COLOR: Record<ExerciseType, { text: string; bg: string }> = {
  multiple_choice: { text: '#1C3E4A', bg: '#1C3E4A14' }, // petróleo
  fill_blank: { text: '#9A5B12', bg: '#F2A24E26' }, // âmbar
  rewrite: { text: '#0f7a52', bg: '#00df9522' }, // verde
  match: { text: '#5B4B8A', bg: '#6B5B9518' }, // roxo
}

export const DIFFICULTY_COLOR: Record<Difficulty, { text: string; bg: string }> = {
  easy: { text: '#0f7a52', bg: '#00df9522' },
  medium: { text: '#9A5B12', bg: '#F2A24E26' },
  hard: { text: '#B23A2B', bg: '#e5484d1f' },
}

/** normaliza p/ comparação (case-insensitive, trim, colapsa espaços) */
export function normAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}
