import { useState } from 'react'
import { PenLine, Trash2, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useFrameWriting } from '@/hooks/useFrameWriting'
import { useProgress } from '@/hooks/useProgress'
import type { SentenceFrame } from '@/data/sentenceFrames'

/** Modo ESCREVER: writingPrompt + campo de texto, salvo na coleção da Ana. */
export function FrameWriter({ frame }: { frame: SentenceFrame }) {
  const { sentences, add, remove } = useFrameWriting(frame.id)
  const { addSession } = useProgress()
  const [draft, setDraft] = useState('')

  function handleSave() {
    const text = draft.trim()
    if (!text) return
    add(text)
    addSession({
      module: 'frames',
      title: `Escrever · ${frame.frame}`,
      minutes: 2,
      score: null,
    })
    setDraft('')
  }

  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div className="rounded-lg bg-primary/10 px-4 py-3 text-sm">
        <strong className="text-primary">Sua vez:</strong> {frame.writingPrompt}
      </div>

      {/* Editor */}
      <Card className="space-y-3 p-4">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Monte sua frase com "${frame.frame}"...`}
          rows={2}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSave()
          }}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">⌘/Ctrl + Enter para salvar</span>
          <Button variant="gradient" onClick={handleSave} disabled={!draft.trim()} className="gap-2">
            <Check className="h-4 w-4" /> Salvar frase
          </Button>
        </div>
      </Card>

      {/* Coleção */}
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <PenLine className="h-4 w-4" />
          Suas frases ({sentences.length})
        </h3>
        {sentences.length > 0 ? (
          <div className="space-y-2">
            {sentences.map((s) => (
              <Card key={s.id} className="flex items-center gap-3 p-3">
                <p className="min-w-0 flex-1 break-words">{s.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(s.date).toLocaleDateString('pt-BR')}
                </span>
                <button
                  onClick={() => remove(s.id)}
                  className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-error/10 hover:text-error"
                  aria-label="Excluir"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-secondary/60 px-4 py-6 text-center text-sm text-muted-foreground">
            Nenhuma frase ainda. Escreva a primeira usando a estrutura acima.
          </p>
        )}
      </div>
    </div>
  )
}
