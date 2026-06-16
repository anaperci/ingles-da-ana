import { Badge } from '@/components/ui/badge'
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
      badge={<Badge variant="secondary">{phrase.difficulty}</Badge>}
      session={{
        module: 'pronunciation',
        title: `Pronúncia · "${phrase.text.slice(0, 30)}…"`,
        category: phrase.category,
      }}
    />
  )
}
