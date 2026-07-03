import { useState } from 'react'
import { Sparkles, Send, Plus, Trash2, Lock, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { TypeBadge, DifficultyBadge } from './badges'
import { isOwner } from '@/lib/azure'
import { generateExercises, createExercises, type GeneratedExercise } from '@/lib/exercises'

const SUGGESTIONS = [
  'cria exercício sobre since e for',
  'exercício difícil com advérbios de frequência',
  '5 exercícios de múltipla escolha sobre preposições',
]

export function GeneratorChat({ onSaved }: { onSaved: () => void }) {
  const owner = isOwner()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<GeneratedExercise[]>([])

  async function generate(text: string) {
    const prompt = text.trim()
    if (!prompt || loading) return
    setError(null)
    setLoading(true)
    setPreview([])
    try {
      const ex = await generateExercises(prompt)
      if (!ex.length) setError('A IA não retornou exercícios. Tente reformular.')
      setPreview(ex)
    } catch (e) {
      const msg = (e as Error).message
      setError(msg.includes('402') || msg.includes('paid_feature')
        ? 'Geração de exercícios é um recurso pago, disponível só para a conta dona.'
        : msg)
    } finally {
      setLoading(false)
    }
  }

  async function addAll() {
    setSaving(true)
    try {
      await createExercises(preview, 'chat')
      setPreview([])
      setInput('')
      onSaved()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <Sparkles className="h-5 w-5 text-accent-light" />
        </div>
        <div>
          <div className="font-display font-bold">Gerar exercícios com IA</div>
          <div className="text-xs text-muted-foreground">
            Descreva uma dificuldade ou peça um exercício
          </div>
        </div>
      </div>

      {!owner && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" /> A geração com IA é da conta dona. Você pode praticar os exercícios já criados.
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          generate(input)
        }}
        className="flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!owner || loading}
          placeholder="ex.: confundo arrived in e arrived at"
          className="h-11 flex-1 rounded-full border border-input bg-muted/50 px-4 text-sm outline-none transition-colors focus:border-accent focus:bg-card disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!owner || loading || !input.trim()}
          aria-label="Gerar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>

      {owner && !preview.length && !loading && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setInput(s)
                generate(s)
              }}
              className="rounded-full border border-card-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-3 rounded-xl border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
          {error}
        </div>
      )}

      {/* Preview */}
      {preview.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Preview · {preview.length} {preview.length === 1 ? 'exercício' : 'exercícios'}
          </div>
          {preview.map((ex, i) => (
            <div key={i} className="rounded-xl border border-card-border bg-muted/40 p-3.5">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <TypeBadge type={ex.type} />
                <DifficultyBadge difficulty={ex.difficulty} />
              </div>
              <p className="text-sm font-medium text-foreground">{ex.question}</p>
              {Array.isArray(ex.options) && (
                <ul className="mt-1.5 space-y-0.5 text-sm text-muted-foreground">
                  {ex.options.map((o, j) => (
                    <li key={j}>{o}</li>
                  ))}
                </ul>
              )}
              <p className="mt-1.5 text-sm">
                <span className="font-semibold text-success">✓ {ex.correct_answer}</span>
              </p>
              {ex.explanation && (
                <p className="mt-1 text-xs text-muted-foreground">{ex.explanation}</p>
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <button
              onClick={addAll}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Adicionar ao banco
            </button>
            <button
              onClick={() => setPreview([])}
              className="inline-flex items-center gap-2 rounded-full border border-card-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" /> Descartar
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
