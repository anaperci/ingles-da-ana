import { useState } from 'react'
import { CalendarRange, Plus, Check, Trash2, ListTodo } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useCustomPlan } from '@/hooks/useCustomPlan'

/** Planner do próprio usuário: cadastra e acompanha as tarefas do seu plano. */
export function CustomPlanner() {
  const { tasks, add, toggle, remove, stats } = useCustomPlan()
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    add(title, note)
    setTitle('')
    setNote('')
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={CalendarRange}
        title="Meu plano"
        subtitle="Monte seu plano de estudos: cadastre suas tarefas e vá marcando"
      />

      {/* Progresso */}
      <Card className="mb-6 space-y-3 border-primary/20 bg-soft p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="text-2xl font-extrabold text-primary">
            {stats.done}
            <span className="text-base font-bold text-muted-foreground">/{stats.total} tarefas</span>
          </div>
          <span className="font-mono text-xl font-bold text-accent-dark">{stats.pct}%</span>
        </div>
        <Progress value={stats.pct} />
      </Card>

      {/* Adicionar tarefa */}
      <form onSubmit={submit} className="mb-6 space-y-2 rounded-2xl border border-card-border bg-card p-4 shadow-soft">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa (ex: Estudar 10 phrasal verbs)"
        />
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Detalhe (opcional)"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!title.trim()} className="gap-2">
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        </div>
      </form>

      {/* Lista */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-card-border bg-card py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
            <ListTodo className="h-7 w-7" />
          </div>
          <p className="font-semibold text-foreground">Seu plano começa aqui</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Cadastre as tarefas que você quer cumprir na sua jornada de inglês.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={cn(
                'group flex items-start gap-3 rounded-xl border p-4 transition-colors',
                t.done ? 'border-success/30 bg-success/5' : 'border-card-border bg-card'
              )}
            >
              <button
                onClick={() => toggle(t.id)}
                aria-label={t.done ? 'Desmarcar' : 'Marcar como feita'}
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                  t.done ? 'border-success bg-success text-white' : 'border-muted-foreground/40'
                )}
              >
                {t.done && <Check className="h-3.5 w-3.5" />}
              </button>
              <div className="min-w-0 flex-1">
                <div className={cn('font-semibold', t.done ? 'text-muted-foreground line-through' : 'text-foreground')}>
                  {t.title}
                </div>
                {t.note && <p className="text-sm text-muted-foreground">{t.note}</p>}
              </div>
              <button
                onClick={() => remove(t.id)}
                aria-label="Apagar"
                className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-error/10 hover:text-error group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
