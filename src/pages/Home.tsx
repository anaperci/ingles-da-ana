import { PenLine, MessagesSquare, Mic } from 'lucide-react'
import { HeroCard } from '@/components/dashboard/HeroCard'
import { TaskCard } from '@/components/dashboard/TaskCard'
import { ChallengeCard } from '@/components/dashboard/ChallengeCard'
import { Leaderboard } from '@/components/dashboard/Leaderboard'
import { useProgress } from '@/hooks/useProgress'
import { todayKey } from '@/lib/storage'

const DAILY_GOAL_MIN = 30

export default function Home() {
  const { sessions } = useProgress()

  const todayMinutes = sessions
    .filter((s) => s.date.slice(0, 10) === todayKey())
    .reduce((acc, s) => acc + s.minutes, 0)
  const goalPct = Math.min(100, Math.round((todayMinutes / DAILY_GOAL_MIN) * 100))

  return (
    <div className="grid animate-fade-in gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* MAIN */}
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold lg:text-3xl">
          Let&apos;s unlock your <span className="text-accent">English</span>, Ana!
        </h1>

        <HeroCard pct={goalPct} />

        <div>
          <h2 className="mb-3 text-lg font-bold">Today&apos;s tasks</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
              variant="soft"
              icon={Mic}
              title="Pronunciation practice"
              desc="Read out loud and see your score per word."
              cta="Practice"
              to="/pronuncia"
              time="10 min"
            />
          </div>
        </div>
      </div>

      {/* RAIL */}
      <aside className="space-y-4">
        <ChallengeCard />
        <Leaderboard />
      </aside>
    </div>
  )
}
