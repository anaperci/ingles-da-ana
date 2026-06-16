import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Sparkles } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { LearnChat } from '@/components/chat/LearnChat'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display font-extrabold text-foreground">English with Ana</span>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-xl border border-border p-2 text-primary hover:bg-soft"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      <LearnChat />
    </div>
  )
}
