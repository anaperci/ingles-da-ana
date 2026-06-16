import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { NAV_ITEMS } from '@/config/nav'
import { cn } from '@/lib/utils'

interface SidebarProps {
  /** Drawer aberto no mobile */
  open?: boolean
  onClose?: () => void
}

function Brand() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5 px-2">
      <img
        src="/ana.png"
        alt="Ana"
        className="h-10 w-10 shrink-0 rounded-xl border-2 border-primary object-cover"
      />
      <span className="font-display text-lg font-extrabold leading-none tracking-tight text-foreground">
        English
        <br />
        with Ana
      </span>
    </NavLink>
  )
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-soft text-primary'
                : 'text-muted-foreground hover:bg-soft/60 hover:text-primary'
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : 'text-primary/80')}
              />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop — fixa */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 border-r border-border bg-white px-4 py-6 lg:flex">
        <Brand />
        <NavItems />
      </aside>

      {/* Mobile — drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-primary/30 backdrop-blur-sm transition-opacity',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onClose}
        />
        <aside
          className={cn(
            'absolute left-0 top-0 flex h-full w-72 flex-col gap-6 border-r border-border bg-white px-4 py-6 transition-transform',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between">
            <Brand />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-xl border border-border p-1.5 text-primary hover:bg-soft"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <NavItems onNavigate={onClose} />
        </aside>
      </div>
    </>
  )
}
