import { Star, Flame, Trophy } from 'lucide-react'
import { useWritingPoints } from '@/hooks/useWritingPoints'

/** Banner de pontuação da Escrita: total acumulado, nível e streak. */
export function WritingPointsCard() {
  const { total, todayPoints, level, streak, daysCompleted } = useWritingPoints()

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary p-5 text-primary-foreground shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
            <Star className="h-3.5 w-3.5" /> Pontos de escrita
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-4xl font-extrabold leading-none">{total}</span>
            {todayPoints > 0 && (
              <span className="text-sm font-semibold text-accent">+{todayPoints} hoje</span>
            )}
          </div>
          <div className="mt-1 text-sm text-primary-foreground/70">
            Nível {level.current.level} · {level.current.name}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
            <Flame className="h-3.5 w-3.5" /> {streak} {streak === 1 ? 'dia' : 'dias'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-primary-foreground/60">
            <Trophy className="h-3.5 w-3.5" /> {daysCompleted}{' '}
            {daysCompleted === 1 ? 'dia concluído' : 'dias concluídos'}
          </span>
        </div>
      </div>

      {/* Barra de progresso rumo ao próximo nível */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-primary-foreground/70">
          {level.next ? (
            <>
              <span>
                Nível {level.next.level} · {level.next.name}
              </span>
              <span className="font-mono">faltam {level.toNext} pts</span>
            </>
          ) : (
            <span>Nível máximo alcançado ⭐</span>
          )}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-primary-foreground/15">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${level.pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
