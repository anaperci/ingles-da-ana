import { todayKey } from '@/lib/storage'

export interface WeekDay {
  /** YYYY-MM-DD (mesma convenção UTC das sessões/activeDays) */
  key: string
  /** letra do dia: S M T W T F S */
  label: string
  isToday: boolean
}

const LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/**
 * Os 7 dias da semana atual (domingo→sábado) em UTC, para bater com a
 * convenção de `activeDays`/`session.date` (que usam toISOString).
 */
export function currentWeek(): WeekDay[] {
  const todayStr = todayKey()
  const base = new Date(todayStr + 'T00:00:00Z')
  const dow = base.getUTCDay() // 0 = domingo
  const days: WeekDay[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(base)
    d.setUTCDate(base.getUTCDate() - dow + i)
    const key = d.toISOString().slice(0, 10)
    days.push({ key, label: LABELS[i], isToday: key === todayStr })
  }
  return days
}
