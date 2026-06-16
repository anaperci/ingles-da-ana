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
 * Os 7 dias da semana atual (domingo→sábado) no fuso LOCAL, batendo com a
 * convenção de `activeDays` (derivada de `todayKey(new Date(session.date))`).
 */
export function currentWeek(now = new Date()): WeekDay[] {
  const todayStr = todayKey(now)
  const base = new Date(now)
  base.setHours(0, 0, 0, 0)
  const dow = base.getDay() // 0 = domingo (local)
  const days: WeekDay[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() - dow + i)
    const key = todayKey(d)
    days.push({ key, label: LABELS[i], isToday: key === todayStr })
  }
  return days
}
