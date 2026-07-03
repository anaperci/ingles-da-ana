import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { adoptOrClearLocal, setAuth } from '@/lib/account'
import { loadCloudIntoLocal, startCloudAutosave } from '@/lib/cloudSync'
import { AuthScreen } from './AuthScreen'

type Status = 'loading' | 'out' | 'preparing' | 'in'

/**
 * Porta de autenticação (multiusuário). Sem sessão → tela de login. Ao entrar,
 * prepara o cache local do usuário (adota/limpa), puxa os dados da nuvem e liga
 * o autosave antes de renderizar o app. Refresh de token não re-prepara.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const preparedFor = useRef<string | null>(null)

  useEffect(() => {
    function handle(s: Session | null) {
      setSession(s)
      if (!s) {
        preparedFor.current = null
        setAuth('ana', '', '')
        setStatus('out')
        return
      }
      // mantém email/token sempre atualizados (inclusive em refresh)
      setAuth(s.user.id, s.user.email ?? '', s.access_token)
      if (preparedFor.current === s.user.id) {
        setStatus('in') // já preparado; foi só refresh de token
      } else {
        setStatus('preparing')
      }
    }

    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) handle(data.session)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => handle(s))
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
      preparedFor.current = session.user.id
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
