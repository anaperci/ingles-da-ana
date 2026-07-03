import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import {
  createExercises,
  TYPE_LABEL,
  TOPIC_LABEL,
  DIFFICULTY_LABEL,
  type ExerciseType,
  type ExerciseTopic,
  type Difficulty,
  type GeneratedExercise,
} from '@/lib/exercises'

const fieldCls =
  'h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-accent'
const areaCls =
  'min-h-[80px] w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-accent'
const labelCls = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground'

export function ManualExerciseModal({
  open,
  onClose,
  onSaved,
}: {
  open: boolean
  onClose: () => void
  onSaved: () => void
}) {
  const [type, setType] = useState<ExerciseType>('multiple_choice')
  const [topic, setTopic] = useState<ExerciseTopic>('prepositions')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [opts, setOpts] = useState(['', '', '', ''])
  const [pairs, setPairs] = useState([
    { l: '', r: '' },
    { l: '', r: '' },
    { l: '', r: '' },
  ])
  const [explanation, setExplanation] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const showMc = type === 'multiple_choice'
  const showMatch = type === 'match'

  function reset() {
    setQuestion('')
    setAnswer('')
    setOpts(['', '', '', ''])
    setPairs([{ l: '', r: '' }, { l: '', r: '' }, { l: '', r: '' }])
    setExplanation('')
    setError(null)
  }

  async function save() {
    if (!question.trim()) return setError('A pergunta é obrigatória.')
    let options: GeneratedExercise['options'] = null
    let correct = answer.trim()

    if (showMc) {
      const letters = ['A', 'B', 'C', 'D']
      const filled = opts.map((o, i) => ({ o: o.trim(), i })).filter((x) => x.o)
      if (filled.length < 2) return setError('Preencha ao menos duas opções.')
      options = filled.map((x) => `${letters[x.i]}) ${x.o}`)
      if (!correct) return setError('Informe a resposta correta.')
    } else if (showMatch) {
      const rows = pairs.filter((p) => p.l.trim() && p.r.trim())
      if (rows.length < 2) return setError('Preencha ao menos dois pares.')
      options = {
        left: rows.map((p) => p.l.trim()),
        right: rows.map((p) => p.r.trim()),
        pairs: rows.map((_, i) => [i, i] as [number, number]),
      }
      correct = rows.map((p) => `${p.l.trim()} → ${p.r.trim()}`).join('; ')
    } else if (!correct) {
      return setError('Informe a resposta correta.')
    }

    setSaving(true)
    setError(null)
    try {
      await createExercises(
        [
          {
            type,
            topic,
            difficulty,
            question: question.trim(),
            options,
            correct_answer: correct,
            explanation: explanation.trim(),
          },
        ],
        'manual'
      )
      reset()
      onSaved()
      onClose()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar exercício manualmente</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className={labelCls}>Tipo</label>
              <select className={fieldCls} value={type} onChange={(e) => setType(e.target.value as ExerciseType)}>
                {(Object.keys(TYPE_LABEL) as ExerciseType[]).map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABEL[t]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tópico</label>
              <select className={fieldCls} value={topic} onChange={(e) => setTopic(e.target.value as ExerciseTopic)}>
                {(Object.keys(TOPIC_LABEL) as ExerciseTopic[]).map((t) => (
                  <option key={t} value={t}>
                    {TOPIC_LABEL[t]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Nível</label>
              <select
                className={fieldCls}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              >
                {(Object.keys(DIFFICULTY_LABEL) as Difficulty[]).map((d) => (
                  <option key={d} value={d}>
                    {DIFFICULTY_LABEL[d]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Pergunta / enunciado</label>
            <textarea
              className={areaCls}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={type === 'fill_blank' ? 'Use ___ onde vai a resposta' : 'Enunciado do exercício'}
            />
          </div>

          {showMc && (
            <div>
              <label className={labelCls}>Opções (A / B / C / D)</label>
              <div className="grid grid-cols-2 gap-2">
                {opts.map((o, i) => (
                  <input
                    key={i}
                    className={fieldCls}
                    value={o}
                    onChange={(e) => setOpts((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                    placeholder={['A', 'B', 'C', 'D'][i]}
                  />
                ))}
              </div>
            </div>
          )}

          {showMatch && (
            <div>
              <label className={labelCls}>Pares (esquerda → direita)</label>
              <div className="space-y-2">
                {pairs.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={fieldCls}
                      value={p.l}
                      onChange={(e) => setPairs((prev) => prev.map((v, j) => (j === i ? { ...v, l: e.target.value } : v)))}
                      placeholder="frase incompleta"
                    />
                    <input
                      className={fieldCls}
                      value={p.r}
                      onChange={(e) => setPairs((prev) => prev.map((v, j) => (j === i ? { ...v, r: e.target.value } : v)))}
                      placeholder="IN / ON / AT"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showMatch && (
            <div>
              <label className={labelCls}>Resposta correta</label>
              <input
                className={fieldCls}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={showMc ? 'ex.: at (ou a letra)' : 'resposta certa'}
              />
            </div>
          )}

          <div>
            <label className={labelCls}>Explicação (PT-BR)</label>
            <textarea
              className={areaCls}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Por que essa é a resposta certa"
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              className="rounded-full border border-card-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Cancelar
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-dark disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Salvar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
