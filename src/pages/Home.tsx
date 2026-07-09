import { Link } from 'react-router-dom'
import { PenLine, MessagesSquare, Mic, Users, Search, Bell } from 'lucide-react'
import { HeroCard } from '@/components/dashboard/HeroCard'
import { TaskCard } from '@/components/dashboard/TaskCard'
import { ChallengeCard } from '@/components/dashboard/ChallengeCard'
import { ThisWeekCard } from '@/components/dashboard/ThisWeekCard'
import { RecordsCard } from '@/components/dashboard/RecordsCard'
import { DailyStudyCard } from '@/components/dashboard/DailyStudyCard'
import { DailyVerbsCard } from '@/components/dashboard/DailyVerbsCard'
import { WritingPointsCard } from '@/components/writing/WritingPointsCard'
import { PlannerCard } from '@/components/dashboard/PlannerCard'
import { useProgress } from '@/hooks/useProgress'
import { todayKey } from '@/lib/storage'

const DAILY_GOAL_MIN = 30

export default function Home() {
  const { sessions } = useProgress()

  const todayMinutes = sessions
    .filter((s) => todayKey(new Date(s.date)) === todayKey())
    .reduce((acc, s) => acc + s.minutes, 0)
  const goalPct = Math.min(100, Math.round((todayMinutes / DAILY_GOAL_MIN) * 100))

  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="animate-fade-in space-y-6">
      {/* Topbar */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-1.5 text-sm text-muted-foreground">{dateLabel}</div>
          <h1 className="text-2xl font-extrabold lg:text-3xl">
            Let&apos;s unlock your <span className="text-accent-dark">English</span>, Ana!
          </h1>
        </div>
        <div className="hidden items-center gap-2.5 sm:flex">
          <button
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent-dark"
          >
            <Search className="h-[19px] w-[19px]" />
          </button>
          <button
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent-dark"
          >
            <Bell className="h-[19px] w-[19px]" />
            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border-2 border-card bg-accent" />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground ring-2 ring-accent ring-offset-2 ring-offset-background">
            A
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* MAIN */}
        <div className="space-y-6">
          <HeroCard pct={goalPct} />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">Today&apos;s tasks</h2>
              <Link to="/planner" className="text-sm font-semibold text-accent-dark hover:underline">
                See all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
            <TaskCard
              variant="default"
              icon={PenLine}
              title="Daily writing"
              desc="Build sentences using today's frames and verbs."
              cta="Practice"
              to="/escrita"
              time="15 min"
            />
            <TaskCard
              variant="featured"
              icon={MessagesSquare}
              title="Today's conversation"
              goal="Goal · 30 min"
              desc="Speak out loud and get instant feedback."
              cta="Start"
              to="/conversacao"
            />
            <TaskCard
              variant="default"
              icon={Mic}
              title="Pronunciation practice"
              desc="Read out loud and see your score per word."
              cta="Practice"
              to="/pronuncia"
              time="10 min"
            />
            <TaskCard
              variant="default"
              icon={Users}
              title="Pronoun practice"
              desc="Subject, object, possessive and reflexive, with corrections."
              cta="Practice"
              to="/pronomes"
              time="5 min"
            />
          </div>
        </div>

          <DailyStudyCard />
          <DailyVerbsCard />
        </div>

        {/* RAIL */}
        <aside className="space-y-4">
          <WritingPointsCard />
          <PlannerCard />
          <ChallengeCard />
          <ThisWeekCard />
          <RecordsCard />
        </aside>
      </div>
    </div>
  )
}
