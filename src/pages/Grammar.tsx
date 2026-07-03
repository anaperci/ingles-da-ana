import { Link } from 'react-router-dom'
import { BookText, Repeat, Link2, Zap, Users, ArrowRight, type LucideIcon } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface GrammarTopic {
  to: string
  title: string
  description: string
  icon: LucideIcon
}

const TOPICS: GrammarTopic[] = [
  {
    to: '/verbos',
    title: 'Verbs',
    description: 'Verb tenses, irregulars and everyday conjugation',
    icon: Repeat,
  },
  {
    to: '/preposicoes',
    title: 'Prepositions',
    description: 'in / on / at, to / for / with and fixed expressions',
    icon: Link2,
  },
  {
    to: '/adverbios',
    title: 'Adverbs',
    description: 'Manner, frequency, time and place',
    icon: Zap,
  },
  {
    to: '/pronomes',
    title: 'Pronouns',
    description: 'Subject, object, possessive and reflexive',
    icon: Users,
  },
]

export default function Grammar() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={BookText}
        title="Grammar"
        subtitle="Pick a topic to practice — each one has exercises with explained corrections"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {TOPICS.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card
              className={cn(
                'flex h-full items-center gap-4 p-5 transition-colors',
                'hover:border-accent hover:bg-soft'
              )}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <t.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold text-primary">{t.title}</div>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
