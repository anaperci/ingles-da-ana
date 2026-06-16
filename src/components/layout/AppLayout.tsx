import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { LearnChat } from '@/components/chat/LearnChat'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <LearnChat />
    </div>
  )
}
