import { loadJSON, todayKey } from './storage'
import { STORAGE_KEYS } from './keys'
import { verbsOfTheDay } from '@/data/irregularVerbs'

/** Rótulos das tarefas do "Estudo de hoje" (espelha o DailyStudyCard). */
const TASKS: [string, string][] = [
  ['aula', '40 min de aula'],
  ['exercicios', '30 min de exercícios no sistema'],
  ['conversacao', '30 min de conversação'],
  ['verbos', 'estudar os 8 verbos do dia'],
]

interface Session {
  title?: string
}

/**
 * Monta um resumo do que a Ana está estudando (e já estudou) a partir do que
 * está salvo localmente. Vai anexado ao system prompt da tutora para o chat ter
 * ciência do contexto. Recalculado a cada mensagem (reflete o estado atual).
 */
export function buildStudyContext(): string {
  const date = todayKey()

  // Os 8 verbos do dia
  const verbs = verbsOfTheDay(date, 8)
  const verbLine = verbs
    .map((v) => `${v.present} → ${v.past} → ${v.pastParticiple} (${v.translation})`)
    .join('; ')

  // Rotina de hoje (feito/pendente)
  const done = loadJSON<Record<string, boolean>>(STORAGE_KEYS.studyChecklist, {})
  const taskLine = TASKS.map(
    ([id, label]) => `${label} — ${done[`${date}:${id}`] ? 'feito' : 'pendente'}`
  ).join('; ')

  // Palavras dominadas (das 1000 mais faladas)
  const known = loadJSON<Record<string, true>>(STORAGE_KEYS.commonWordsKnown, {})
  const knownCount = Object.keys(known).length

  // O que estudou recentemente (últimas sessões registradas)
  const sessions = loadJSON<Session[]>(STORAGE_KEYS.sessions, [])
  const recent = sessions
    .slice(-6)
    .reverse()
    .map((s) => s.title)
    .filter((t): t is string => !!t)

  return [
    `\n\n--- CONTEXTO DE ESTUDO DA ANA (hoje = ${date}) ---`,
    `Use para saber o que a Ana está estudando e já estudou. Não despeje isto sem ela pedir; puxe quando for útil à conversa (ex.: se ela perguntar sobre um verbo do dia, você já sabe qual é).`,
    `• Verbos do dia (os 8 que ela deve aprender hoje): ${verbLine}`,
    `• Rotina de hoje: ${taskLine}`,
    `• Palavras dominadas das 1000 mais faladas: ${knownCount}`,
    recent.length ? `• Estudou recentemente: ${recent.join(' | ')}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}
