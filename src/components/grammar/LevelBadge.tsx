import type { GrammarPoint } from '@/data/grammarPacks'

type Level = GrammarPoint['level']

// Identidade Solo: verde (mint) → navy → âmbar, escalando a dificuldade.
const STYLES: Record<Level, { label: string; text: string; bg: string }> = {
  beginner: { label: 'Beginner', text: '#00714A', bg: '#00986414' },
  intermediate: { label: 'Intermediate', text: '#0a192f', bg: '#0a192f12' },
  advanced: { label: 'Advanced', text: '#9a5b12', bg: '#f5a5241f' },
}

/** Badge de nível (beginner / intermediate / advanced) no tom da paleta Solo. */
export function LevelBadge({ level }: { level: Level }) {
  const s = STYLES[level]
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{ color: s.text, backgroundColor: s.bg }}
    >
      {s.label}
    </span>
  )
}
