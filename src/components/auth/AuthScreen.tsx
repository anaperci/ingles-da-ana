import { useState } from 'react'
import { Loader2, Mail, Lock, LogIn, UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Mode = 'login' | 'signup'

export function AuthScreen() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    if (!email.trim() || password.length < 6) {
      setError('Informe um email válido e uma senha de pelo menos 6 caracteres.')
      return
    }
    setLoading(true)
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (error) throw error
        // sucesso: o AuthGate detecta a sessão e entra no app
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        })
        if (error) throw error
        if (!data.session) {
          setInfo('Conta criada! Confirme pelo link que enviamos no seu email para entrar.')
          setMode('login')
        }
      }
    } catch (err) {
      const msg = (err as Error).message
      setError(
        /invalid login credentials/i.test(msg)
          ? 'Email ou senha incorretos.'
          : /already registered/i.test(msg)
            ? 'Esse email já tem conta. Faça login.'
            : msg
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Marca */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <img
            src="/ana.png"
            alt="Ana"
            className="h-16 w-16 rounded-2xl border-2 border-primary object-cover"
          />
          <div>
            <h1 className="font-display text-2xl font-extrabold text-foreground">
              English with Ana
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? 'Entre para continuar seus estudos' : 'Crie sua conta e comece'}
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl border border-card-border bg-card p-6 shadow-soft"
        >
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha (mín. 6 caracteres)"
              className="pl-10"
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}
          {info && <p className="text-sm text-success">{info}</p>}

          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : mode === 'login' ? (
              <LogIn className="h-4 w-4" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === 'login' ? 'signup' : 'login'))
                setError(null)
                setInfo(null)
              }}
              className="font-semibold text-accent-dark hover:underline"
            >
              {mode === 'login' ? 'Criar agora' : 'Entrar'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
