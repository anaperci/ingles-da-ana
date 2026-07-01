import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

/** Email do usuário logado + logout. */
export function useAuthUser() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) =>
      setEmail(s?.user?.email ?? null)
    )
    return () => sub.subscription.unsubscribe()
  }, [])

  const signOut = () => supabase.auth.signOut()

  return { email, signOut }
}
