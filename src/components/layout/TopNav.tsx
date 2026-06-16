import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { NAV_ITEMS } from '@/config/nav'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-card-border bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Marca */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            Inglês da Ana
          </span>
        </NavLink>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-yellow text-ink'
                    : 'text-muted-foreground hover:bg-yellow hover:text-ink'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Perfil + menu mobile */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="/ana.jpg" alt="Ana" />
            <AvatarFallback className="bg-primary/10 text-primary">A</AvatarFallback>
          </Avatar>
          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav className="border-t border-card-border bg-card px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-yellow text-ink'
                      : 'text-muted-foreground hover:bg-yellow hover:text-ink'
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
