import { useMemo, useState } from 'react'
import { Volume2, Check, X, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { CorrectionCard } from '@/components/common/CorrectionCard'
import { buildQuizOptions } from '@/hooks/useVocabulary'
import type { ReviewQuality } from '@/lib/srs'
import type { VocabWord } from '@/types/vocabulary'

interface QuizCardProps {
  word: VocabWord
  pool: VocabWord[]
  onanswer: (quality: ReviewQuality, correct: boolean) => void
}

export function QuizCard({ word, pool, onanswer }: QuizCardProps) {
  const options = useMemo(() => buildQuizOptions(word, pool), [word, pool])
  const [selected, setSelected] = useState<string | null>(null)

  const isWrong = selected !== null && selected !== word.translation

  function choose(option: string) {
    if (selected) return
    setSelected(option)
    const correct = option === word.translation
    // acertou: avança sozinho. Errou: espera ela ler a correção e clicar "Continuar".
    if (correct) {
      setTimeout(() => onanswer(4, true), 900)
    }
  }

  return (
    <Card className="space-y-5 p-6 sm:p-8">
      <div className="flex items-center justify-center gap-2 text-center">
        <span className="text-2xl font-extrabold">{word.word}</span>
        <button
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
          onClick={() => speak(word.word)}
          aria-label="Ouvir"
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
      <p className="text-center text-sm text-muted-foreground">Qual a tradução?</p>

      <div className="grid gap-3">
        {options.map((opt) => {
          const isCorrect = opt === word.translation
          const isSelected = opt === selected
          const showState = selected !== null
          return (
            <button
              key={opt}
              disabled={showState}
              onClick={() => choose(opt)}
              className={cn(
                'flex items-center justify-between rounded-lg border border-card-border bg-card px-4 py-3 text-left font-medium transition-colors',
                !showState && 'hover:border-primary hover:bg-secondary',
                showState && isCorrect && 'border-success bg-success/10 text-success',
                showState && isSelected && !isCorrect && 'border-error bg-error/10 text-error',
                showState && !isSelected && !isCorrect && 'opacity-60'
              )}
            >
              {opt}
              {showState && isCorrect && <Check className="h-5 w-5" />}
              {showState && isSelected && !isCorrect && <X className="h-5 w-5" />}
            </button>
          )
        })}
      </div>

      {/* Correção quando erra: tradução certa + exemplo, e botão pra seguir */}
      {isWrong && (
        <>
          <CorrectionCard
            ok={false}
            answer={`${word.word} = ${word.translation}`}
            speakAnswer={false}
            example={word.example}
            exampleTranslation={word.exampleTranslation}
          />
          <Button className="w-full" onClick={() => onanswer(1, false)}>
            Continuar <ArrowRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </Card>
  )
}
