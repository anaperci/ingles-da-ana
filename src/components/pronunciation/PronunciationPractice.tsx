import { SpeakAndScore } from './SpeakAndScore'
import type { PronunciationPhrase } from '@/data/pronunciationPhrases'

interface Props {
  phrase: PronunciationPhrase
}

/** Prática de pronúncia de uma frase. Reusa o núcleo `SpeakAndScore`. */
export function PronunciationPractice({ phrase }: Props) {
  return (
    <SpeakAndScore
      text={phrase.text}
      translation={phrase.translation}
      badge={
        <span className="inline-flex items-center rounded-full bg-soft px-3 py-1 text-xs font-semibold text-accent-dark">
          {phrase.difficulty}
        </span>
      }
      session={{
        module: 'pronunciation',
        title: `Pronúncia · "${phrase.text.slice(0, 30)}…"`,
        category: phrase.category,
      }}
    />
  )
}
