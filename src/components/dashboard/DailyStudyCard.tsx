import { useMemo, useState } from 'react'
import { Check, CalendarCheck, Coffee, ChevronDown, Volume2 } from 'lucide-react'
import { useLocalStore } from '@/hooks/useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import { todayKey } from '@/lib/storage'
import { verbsOfTheDay } from '@/data/irregularVerbs'
import { speak } from '@/lib/tts'
import { cn } from '@/lib/utils'

/** A rotina de estudo de segunda a sexta. Fácil de editar: é só esta lista. */
const STUDY_TASKS = [
  { id: 'aula', label: '40 minutos de aula' },
  { id: 'exercicios', label: 'Meia hora de exercícios no sistema' },
  { id: 'conversacao', label: 'Meia hora de conversação' },
  { id: 'verbos', label: 'Estudar os 8 verbos do dia', verbs: true },
] as const

type DoneMap = Record<string, boolean>

export function DailyStudyCard() {
  const [done, setDone] = useLocalStore<DoneMap>(STORAGE_KEYS.studyChecklist, {})
  const [verbsOpen, setVerbsOpen] = useState(false)
  const date = todayKey()
  const dayOfWeek = new Date(`${date}T00:00:00`).getDay() // 0 = domingo, 6 = sábado
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
  const verbs = useMemo(() => verbsOfTheDay(date, 8), [date])

  const k = (id: string) => `${date}:${id}`
  const isDone = (id: string) => !!done[k(id)]
  const toggle = (id: string) =>
    setDone((prev) => ({ ...prev, [k(id)]: !prev[k(id)] }))

  const doneCount = useMemo(
    () => STUDY_TASKS.filter((t) => isDone(t.id)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [done, date]
  )
  const allDone = doneCount === STUDY_TASKS.length

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
          Estudo de hoje
        </span>
        {!isWeekend && (
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
              allDone ? 'bg-success/15 text-success' : 'bg-soft text-accent-dark'
            )}
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            {doneCount}/{STUDY_TASKS.length}
          </span>
        )}
      </div>

      {isWeekend ? (
        <div className="flex items-center gap-3 rounded-xl bg-soft/50 p-4">
          <Coffee className="h-6 w-6 shrink-0 text-accent-dark" />
          <div>
            <p className="text-sm font-semibold text-foreground">Fim de semana</p>
            <p className="text-xs text-muted-foreground">
              Dia livre — a rotina volta na segunda. Descansa!
            </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {STUDY_TASKS.map((t) => {
            const checked = isDone(t.id)
            const hasVerbs = 'verbs' in t && t.verbs
            return (
              <li key={t.id}>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggle(t.id)}
                    className="flex flex-1 items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-soft/60"
                  >
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                        checked ? 'border-success bg-success text-white' : 'border-muted-foreground/40'
                      )}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        checked ? 'text-muted-foreground line-through' : 'text-foreground'
                      )}
                    >
                      {t.label}
                    </span>
                  </button>
                  {hasVerbs && (
                    <button
                      onClick={() => setVerbsOpen((v) => !v)}
                      aria-label={verbsOpen ? 'Esconder verbos' : 'Ver verbos'}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-soft hover:text-accent-dark"
                    >
                      <ChevronDown className={cn('h-4 w-4 transition-transform', verbsOpen && 'rotate-180')} />
                    </button>
                  )}
                </div>

                {/* Os 8 verbos do dia, dentro da tarefa */}
                {hasVerbs && verbsOpen && (
                  <ul className="mb-1 ml-8 mt-1 space-y-1.5">
                    {verbs.map((v) => (
                      <li
                        key={v.id}
                        className="flex items-center gap-3 rounded-lg bg-soft/50 p-2.5"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="font-semibold text-foreground">{v.present}</span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {v.past} · {v.pastParticiple}
                            </span>
                          </div>
                          <div className="truncate text-xs text-muted-foreground">{v.translation}</div>
                        </div>
                        <button
                          onClick={() => speak(v.present)}
                          aria-label={`Ouvir ${v.present}`}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:bg-soft"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
