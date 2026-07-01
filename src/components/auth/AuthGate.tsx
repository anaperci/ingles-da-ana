import { useEffect, useState, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { adoptOrClearLocal } from '@/lib/account'
import { loadCloudIntoLocal, startCloudAutosave } from '@/lib/cloudSync'
import { AuthScreen } from './AuthScreen'

type Status = 'loading' | 'out' | 'preparing' | 'in'

/**
 * Porta de autenticação (multiusuário). Sem sessão → tela de login. Ao entrar,
 * prepara o cache local do usuário (adota/limpa), puxa os dados da nuvem e liga
 * o autosave antes de renderizar o app.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setStatus(data.session ? 'preparing' : 'out')
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setStatus(s ? 'preparing' : 'out')
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (status !== 'preparing' || !session) return
    let cancelled = false
    ;(async () => {
      adoptOrClearLocal(session.user.id)
      await loadCloudIntoLocal()
      if (cancelled) return
      startCloudAutosave()
      setStatus('in')
    })()
    return () => {
      cancelled = true
    }
  }, [status, session])

  if (status === 'loading' || status === 'preparing') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (status === 'out') return <AuthScreen />

  return <>{children}</>
}
