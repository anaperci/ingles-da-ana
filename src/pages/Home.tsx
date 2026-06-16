import { Link } from 'react-router-dom'
import {
  Flame,
  Brain,
  Repeat,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target,
  MessagesSquare,
  Mic,
  MonitorPlay,
  PenLine,
  Blocks,
  AudioLines,
  Calendar,
  Star,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StatCard } from '@/components/dashboard/StatCard'
import { useProgress } from '@/hooks/useProgress'
import { todayKey } from '@/lib/storage'

const MODULES = [
  {
    to: '/vocabulario',
    icon: Brain,
    title: 'Vocabulário',
    desc: 'Flashcards, quiz e repetição espaçada das palavras mais usadas.',
  },
  {
    to: '/verbos',
    icon: Repeat,
    title: 'Verbos',
    desc: 'Irregulares e phrasal verbs com repetição espaçada.',
  },
  {
    to: '/verbos-som',
    icon: AudioLines,
    title: 'Verbos por Som',
    desc: 'Irregulares por padrão de pronúncia: ler, falar e escrever.',
  },
  {
    to: '/escrita',
    icon: PenLine,
    title: 'Escrita diária',
    desc: '30 frases por dia e as 1000 palavras mais faladas do inglês.',
  },
  {
    to: '/estruturas',
    icon: Blocks,
    title: 'Formar Frases',
    desc: 'Estruturas-molde para falar sem travar: ler, falar e escrever.',
  },
  {
    to: '/conversacao',
    icon: MessagesSquare,
    title: 'Conversação com IA',
    desc: 'Converse em inglês em cenários reais e receba correções.',
  },
  {
    to: '/pronuncia',
    icon: Mic,
    title: 'Pronúncia',
    desc: 'Leia em voz alta e receba nota por palavra e fonema.',
  },
  {
    to: '/videos',
    icon: MonitorPlay,
    title: 'Vídeo do dia',
    desc: 'Um vídeo por dia alinhado aos seus interesses.',
  },
]

const DAILY_GOAL_MIN = 30

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function Home() {
  const { progress, sessions } = useProgress()

  const todayMinutes = sessions
    .filter((s) => s.date.slice(0, 10) === todayKey())
    .reduce((acc, s) => acc + s.minutes, 0)
  const goalPct = Math.min(100, Math.round((todayMinutes / DAILY_GOAL_MIN) * 100))

  const recent = sessions.slice(0, 4)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div>
            <h1 className="text-3xl font-extrabold lg:text-4xl">
              {greeting()}, Ana! 👋
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              Bora revisar o inglês antes de Malta?
            </p>
          </div>

          <Card className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-lilac-accent" />
              <span className="font-semibold">Seu progresso</span>
            </div>
            <p className="text-muted-foreground">
              {progress.streak > 0 ? (
                <>
                  Você está há <strong>{progress.streak} dia(s)</strong> seguidos e já
                  dominou <strong>{progress.wordsMastered}</strong> palavras. Continue
                  assim! 🔥
                </>
              ) : (
                <>
                  Comece hoje uma sequência de estudos. Cada dia conta para chegar em
                  Malta com o inglês afiado. 🚀
                </>
              )}
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard icon={Flame} value={progress.streak} label="Dias seguidos" tone="warning" />
            <StatCard icon={Brain} value={progress.wordsMastered} label="Palavras dominadas" tone="success" />
            <StatCard icon={Clock} value={`${progress.practiceMinutes}m`} label="Prática total" tone="primary" />
            <StatCard icon={TrendingUp} value={`${progress.averageScore}%`} label="Score médio" tone="accent" />
          </div>
        </div>

        {/* Objetivo + ações */}
        <div className="space-y-4">
          <Card className="border-ink bg-ink p-6 text-white shadow-hard-yellow">
            <div className="mb-3 flex items-center gap-2 text-yellow">
              <Target className="h-5 w-5" />
              <span className="font-semibold uppercase tracking-wide">Objetivo de hoje</span>
            </div>
            <div className="font-display text-4xl font-extrabold text-yellow">
              {DAILY_GOAL_MIN} min
            </div>
            <Progress value={goalPct} className="mt-3 bg-white/15 [&>div]:bg-yellow" />
            <div className="mt-2 text-sm text-white/70">
              {todayMinutes} min concluídos
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Button asChild variant="gradient" size="lg" className="justify-start">
              <Link to="/conversacao">
                <MessagesSquare className="h-5 w-5" />
                Começar conversação
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="justify-start">
              <Link to="/vocabulario">
                <Brain className="h-5 w-5" />
                Estudar vocabulário
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="justify-start">
              <Link to="/pronuncia">
                <Mic className="h-5 w-5" />
                Treinar pronúncia
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Módulos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <Link key={m.to} to={m.to} className="group">
              <Card className="h-full p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Abrir <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Atividade recente */}
      <section>
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              Atividade recente
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {recent.length > 0 ? (
              <div className="space-y-3">
                {recent.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-lg bg-secondary/60 p-3"
                  >
                    <div>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(s.date).toLocaleDateString('pt-BR')} · {s.minutes} min
                      </div>
                    </div>
                    {s.score != null && (
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-mono font-semibold">{s.score}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                <MessagesSquare className="mx-auto mb-3 h-12 w-12 opacity-40" />
                <p>Nenhuma atividade ainda.</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/vocabulario">Começar primeira prática</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
