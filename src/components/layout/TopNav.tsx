import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { NAV_ITEMS } from '@/config/nav'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border-2 border-primary bg-white px-3 py-2.5 shadow-soft">
        {/* Marca */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-accent">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-base font-extrabold leading-none tracking-tight text-primary">
            Inglês
            <br />
            da Ana
          </span>
        </NavLink>

        {/* Nav desktop */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'border-2 border-primary bg-accent text-primary'
                    : 'border-2 border-transparent text-primary/70 hover:bg-accent hover:text-primary'
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
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="/ana.jpg" alt="Ana" />
            <AvatarFallback className="bg-accent font-bold text-primary">A</AvatarFallback>
          </Avatar>
          <button
            className="rounded-xl border-2 border-primary p-2 text-primary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav className="mx-auto mt-2 max-w-7xl rounded-2xl border-2 border-primary bg-white p-3 shadow-soft lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                    isActive
                      ? 'border-2 border-primary bg-accent text-primary'
                      : 'border-2 border-transparent text-primary/70 hover:bg-accent hover:text-primary'
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
