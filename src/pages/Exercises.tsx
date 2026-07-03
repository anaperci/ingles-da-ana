import { useMemo, useState } from 'react'
import { Dumbbell, Plus, Library, Target, Percent, AlertTriangle, Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { GeneratorChat } from '@/components/exercises/GeneratorChat'
import { ManualExerciseModal } from '@/components/exercises/ManualExerciseModal'
import { PracticeModal } from '@/components/exercises/PracticeModal'
import { TypeBadge, DifficultyBadge, AttemptDot } from '@/components/exercises/badges'
import { useExercises } from '@/hooks/useExercises'
import {
  TYPE_LABEL,
  TOPIC_LABEL,
  DIFFICULTY_LABEL,
  type ExerciseType,
  type ExerciseTopic,
  type Difficulty,
} from '@/lib/exercises'

const selCls =
  'h-10 rounded-full border border-card-border bg-card px-3 text-sm outline-none focus:border-accent'

export default function Exercises() {
  const { exercises, stats, loading, error, refresh } = useExercises()
  const [manualOpen, setManualOpen] = useState(false)
  const [fType, setFType] = useState<string>('all')
  const [fTopic, setFTopic] = useState<string>('all')
  const [fDiff, setFDiff] = useState<string>('all')
  const [practiceStart, setPracticeStart] = useState<number | null>(null)

  const filtered = useMemo(
    () =>
      exercises.filter(
        (e) =>
          (fType === 'all' || e.type === fType) &&
          (fTopic === 'all' || e.topic === fTopic) &&
          (fDiff === 'all' || e.difficulty === fDiff)
      ),
    [exercises, fType, fTopic, fDiff]
  )

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={Dumbbell}
        title="Exercises"
        subtitle="Gere exercícios com IA, crie os seus e pratique com correção"
        actions={
          <button
            onClick={() => setManualOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent"
          >
            <Plus className="h-4 w-4" /> Criar manualmente
          </button>
        }
      />

      {/* Painel de progresso */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={Library} value={stats?.total ?? 0} label="No banco" />
        <Stat icon={Target} value={stats?.attempted ?? 0} label="Tentados" />
        <Stat icon={Percent} value={`${stats?.accuracy ?? 0}%`} label="Taxa de acerto" tone="text-success" />
        <Stat
          icon={AlertTriangle}
          value={stats?.weakestTopic ? TOPIC_LABEL[stats.weakestTopic] : '—'}
          label="Foque em"
          tone="text-warning"
          small
        />
      </div>

      {/* Chat de geração */}
      <div className="mb-6">
        <GeneratorChat onSaved={refresh} />
      </div>

      {/* Filtros */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <select className={selCls} value={fType} onChange={(e) => setFType(e.target.value)}>
          <option value="all">Todos os tipos</option>
          {(Object.keys(TYPE_LABEL) as ExerciseType[]).map((t) => (
            <option key={t} value={t}>
              {TYPE_LABEL[t]}
            </option>
          ))}
        </select>
        <select className={selCls} value={fTopic} onChange={(e) => setFTopic(e.target.value)}>
          <option value="all">Todos os tópicos</option>
          {(Object.keys(TOPIC_LABEL) as ExerciseTopic[]).map((t) => (
            <option key={t} value={t}>
              {TOPIC_LABEL[t]}
            </option>
          ))}
        </select>
        <select className={selCls} value={fDiff} onChange={(e) => setFDiff(e.target.value)}>
          <option value="all">Todas as dificuldades</option>
          {(Object.keys(DIFFICULTY_LABEL) as Difficulty[]).map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_LABEL[d]}
            </option>
          ))}
        </select>
        {filtered.length > 0 && (
          <button
            onClick={() => setPracticeStart(0)}
            className="w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-dark sm:ml-auto sm:w-auto"
          >
            Praticar {filtered.length}
          </button>
        )}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex justify-center py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : error ? (
        <Card className="p-6 text-center text-sm text-error">{error}</Card>
      ) : filtered.length === 0 ? (
        <Card className="p-10 text-center">
          <Dumbbell className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">
            {exercises.length === 0
              ? 'Ask the chat to generate your first exercise.'
              : 'Nenhum exercício com esses filtros.'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setPracticeStart(i)}
              className="flex flex-col gap-2 rounded-2xl border border-card-border bg-card p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-elevated"
            >
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type={ex.type} />
                <DifficultyBadge difficulty={ex.difficulty} />
                {ex.topic && (
                  <span className="text-xs text-muted-foreground">{TOPIC_LABEL[ex.topic]}</span>
                )}
                <span className="ml-auto">
                  <AttemptDot last={ex.last_correct} />
                </span>
              </div>
              <p className="line-clamp-2 text-sm font-medium text-foreground">{ex.question}</p>
            </button>
          ))}
        </div>
      )}

      <ManualExerciseModal open={manualOpen} onClose={() => setManualOpen(false)} onSaved={refresh} />

      {practiceStart !== null && filtered[practiceStart] && (
        <PracticeModal
          queue={filtered}
          startIndex={practiceStart}
          onClose={() => setPracticeStart(null)}
          onAttemptSaved={refresh}
        />
      )}
    </div>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
  tone = 'text-foreground',
  small,
}: {
  icon: typeof Library
  value: string | number
  label: string
  tone?: string
  small?: boolean
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <Icon className={`h-6 w-6 shrink-0 ${tone}`} />
      <div className="min-w-0">
        <div className={small ? 'truncate text-base font-bold' : 'font-mono text-xl font-bold'}>{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </Card>
  )
}
