import { useMemo, useState } from 'react'
import { Trophy, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Flashcard } from './Flashcard'
import { QuizCard } from './QuizCard'
import { useVocabulary } from '@/hooks/useVocabulary'
import { useProgress } from '@/hooks/useProgress'
import type { ReviewQuality } from '@/lib/srs'
import type { VocabStudyMode, VocabWord } from '@/types/vocabulary'
import type { CategoryKey } from '@/types'

interface StudySessionProps {
  queue: VocabWord[]
  mode: VocabStudyMode
  category: CategoryKey | 'all'
  onExit: () => void
}

export function StudySession({ queue, mode, category, onExit }: StudySessionProps) {
  const { words, review } = useVocabulary()
  const { addSession } = useProgress()
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const startedAt = useMemo(() => Date.now(), [])

  const total = queue.length
  const current = queue[index]

  function advance(quality: ReviewQuality, wasCorrect: boolean) {
    if (current) review(current.id, quality)
    if (wasCorrect) setCorrect((c) => c + 1)

    if (index + 1 >= total) {
      const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000))
      const score = mode === 'quiz' ? Math.round(((correct + (wasCorrect ? 1 : 0)) / total) * 100) : null
      addSession({
        module: 'vocabulary',
        title: `Vocabulário · ${mode === 'quiz' ? 'Quiz' : 'Flashcards'}`,
        minutes,
        score,
        category: category === 'all' ? undefined : category,
      })
      setDone(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (done) {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <Card className="flex flex-col items-center gap-4 p-6 sm:p-10 text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Trophy className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">Sessão concluída! 🎉</h2>
        <p className="text-muted-foreground">
          Você revisou <strong>{total}</strong> palavras
          {mode === 'quiz' && <> e acertou <strong>{correct}</strong> ({pct}%)</>}.
        </p>
        <Button variant="gradient" onClick={onExit}>
          Voltar
        </Button>
      </Card>
    )
  }

  if (!current) {
    return (
      <Card className="p-6 sm:p-10 text-center text-muted-foreground">
        Nada para revisar agora. Volte mais tarde! 😴
        <div className="mt-4">
          <Button variant="outline" onClick={onExit}>Voltar</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center gap-4">
        <Progress value={Math.round((index / total) * 100)} className="flex-1" />
        <span className="font-mono text-sm text-muted-foreground">
          {index + 1}/{total}
        </span>
        <Button size="icon" variant="ghost" onClick={onExit} aria-label="Sair">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {mode === 'flashcard' ? (
        <Flashcard
          key={current.id}
          word={current}
          onRate={(q) => advance(q, q >= 3)}
        />
      ) : (
        <QuizCard
          key={current.id}
          word={current}
          pool={words}
          onanswer={(q, ok) => advance(q, ok)}
        />
      )}
    </div>
  )
}
