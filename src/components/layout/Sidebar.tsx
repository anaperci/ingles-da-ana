import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { X, LogOut, KeyRound, Mic, ChevronDown } from 'lucide-react'
import { NAV_ITEMS, type NavItem } from '@/config/nav'
import { useAuthUser } from '@/hooks/useAuthUser'
import { ChangePasswordDialog } from '@/components/auth/ChangePasswordDialog'
import { AzureKeyDialog } from '@/components/auth/AzureKeyDialog'
import { isOwner } from '@/lib/azure'
import { cn } from '@/lib/utils'

function UserFooter() {
  const { email, signOut } = useAuthUser()
  const [pwOpen, setPwOpen] = useState(false)
  const [azOpen, setAzOpen] = useState(false)
  if (!email) return null
  return (
    <div className="mt-auto border-t border-white/10 pt-3">
      <div className="truncate px-2 text-xs text-white/50" title={email}>
        {email}
      </div>
      <button
        onClick={() => setPwOpen(true)}
        className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <KeyRound className="h-4 w-4" /> Change password
      </button>
      {!isOwner() && (
        <button
          onClick={() => setAzOpen(true)}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Mic className="h-4 w-4" /> Connect Azure
        </button>
      )}
      <button
        onClick={() => signOut()}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
      <ChangePasswordDialog open={pwOpen} onClose={() => setPwOpen(false)} />
      <AzureKeyDialog open={azOpen} onClose={() => setAzOpen(false)} />
    </div>
  )
}

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
        className="h-10 w-10 shrink-0 rounded-xl border-2 border-white/25 object-cover"
      />
      <span className="font-display text-lg font-extrabold leading-none tracking-tight text-white">
        English
        <br />
        with Ana
      </span>
    </NavLink>
  )
}

const linkClasses = (isActive: boolean) =>
  cn(
    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
    isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
  )

/** Item simples (folha do menu). */
function LeafLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <NavLink to={item.to} end={item.end} onClick={onNavigate} className={({ isActive }) => linkClasses(isActive)}>
      {({ isActive }) => (
        <>
          <item.icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-accent-light' : 'text-white/70')} />
          {item.label}
        </>
      )}
    </NavLink>
  )
}

/** Item com submenu expansível (ex.: Training, Grammar). */
function GroupLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const { pathname } = useLocation()
  // Ativo quando a rota atual é o próprio grupo ou uma das filhas.
  const groupActive =
    pathname === item.to || (item.children ?? []).some((c) => c.to === pathname)
  const [open, setOpen] = useState(groupActive)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(linkClasses(groupActive), 'w-full')}
      >
        <item.icon className={cn('h-5 w-5 shrink-0', groupActive ? 'text-accent-light' : 'text-white/70')} />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="mt-1 flex flex-col gap-1 border-l border-white/10 pl-3.5">
          {item.children!.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-white/10 font-medium text-white'
                    : 'text-white/55 hover:bg-white/10 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <child.icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-accent-light' : 'text-white/60')} />
                  {child.label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.map((item) =>
        item.children ? (
          <GroupLink key={item.to} item={item} onNavigate={onNavigate} />
        ) : (
          <LeafLink key={item.to} item={item} onNavigate={onNavigate} />
        )
      )}
    </nav>
  )
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop — fixa */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 border-r border-primary-soft bg-primary px-4 py-6 lg:flex">
        <Brand />
        <NavItems />
        <UserFooter />
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
            'absolute left-0 top-0 flex h-full w-[85vw] max-w-xs flex-col gap-6 border-r border-primary-soft bg-primary px-4 py-6 transition-transform',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between">
            <Brand />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-xl border border-white/20 p-1.5 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <NavItems onNavigate={onClose} />
          <UserFooter />
        </aside>
      </div>
    </>
  )
}
