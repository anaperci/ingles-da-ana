import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'
import { GrammarPointModule } from '@/components/grammar/GrammarPointModule'
import { AppropriacyModule } from '@/components/grammar/AppropriacyModule'
import { PartsOfSpeechModule } from '@/components/grammar/PartsOfSpeechModule'
import { conditionals, verbTenses, appropriacy } from '@/data/grammarPacks'

type Tab = 'conditionals' | 'tenses' | 'appropriacy' | 'parts'

const TABS: { key: Tab; label: string }[] = [
  { key: 'conditionals', label: 'Conditionals' },
  { key: 'tenses', label: 'Verb tenses' },
  { key: 'appropriacy', label: 'Appropriacy' },
  { key: 'parts', label: 'Parts of speech' },
]

const SUBTITLES: Record<Tab, string> = {
  conditionals: 'The four "if" patterns — from facts to regret',
  tenses: 'When to use each tense, and the traps for Brazilians',
  appropriacy: 'Same message, three levels of formality',
  parts: 'What each type of word does in a sentence',
}

export default function GrammarPacks() {
  const [tab, setTab] = useState<Tab>('conditionals')

  return (
    <div className="animate-fade-in">
      <PageHeader icon={Sparkles} title="Real grammar" subtitle={SUBTITLES[tab]} />

      {/* Abas */}
      <div className="mb-6 flex flex-wrap gap-1 rounded-full bg-muted p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
              tab === t.key
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'conditionals' && <GrammarPointModule points={conditionals} />}
      {tab === 'tenses' && <GrammarPointModule points={verbTenses} />}
      {tab === 'appropriacy' && <AppropriacyModule situations={appropriacy} />}
      {tab === 'parts' && <PartsOfSpeechModule />}
    </div>
  )
}
