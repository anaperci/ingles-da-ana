import { useState } from 'react'
import { Loader2, Mail, Lock, Eye, EyeOff, Plane } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Mode = 'login' | 'signup'

// Paleta Solo (fidelidade ao design do cartão de embarque)
const C = {
  navyGrad: 'linear-gradient(150deg,#0a192f,#102341 58%,#1b3358)',
  cream: '#fbfbed',
  mint: '#00df95',
  mint400: '#3de8ac',
  ink200: '#b3c0d2',
  ink300: '#8497b5',
  ink400: '#5b789e',
  ink600: '#2a476f',
  ink950: '#060f1e',
}

export function AuthScreen() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
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
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        if (error) throw error
      } else {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password })
        if (error) throw error
        if (!data.session) {
          setInfo('Conta criada! Confirme pelo link enviado no seu email para embarcar.')
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

  async function forgot() {
    setError(null)
    setInfo(null)
    if (!email.trim()) {
      setError('Digite seu email primeiro, aí eu envio o link de redefinição.')
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim())
    if (error) setError(error.message)
    else setInfo('Enviei um link de redefinição de senha no seu email.')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 12,
    background: C.ink950,
    border: `1.5px solid ${C.ink600}`,
    color: C.cream,
    fontSize: 15,
    fontWeight: 500,
    outline: 'none',
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 sm:p-10"
      style={{ background: 'radial-gradient(130% 100% at 50% -10%,#eef0f4 0%,#e4e7ee 100%)' }}
    >
      <div
        className="flex w-full max-w-[940px] flex-col overflow-hidden rounded-3xl shadow-2xl md:h-[540px] md:flex-row"
        style={{ background: C.navyGrad, animation: 'fade-in .5s ease both' }}
      >
        {/* MAIN — só desktop */}
        <div
          className="hidden flex-1 flex-col justify-between p-12 md:flex"
          style={{ color: C.cream }}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-xl font-bold tracking-tight">English with Ana</span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-widest"
              style={{ color: '#0a192f', background: C.mint }}
            >
              CARTÃO DE EMBARQUE
            </span>
          </div>

          <div>
            <div
              className="mb-3.5 text-xs font-semibold tracking-[0.16em]"
              style={{ color: C.mint400 }}
            >
              ACESSO À SUA JORNADA
            </div>
            <h1 className="font-display text-[44px] font-bold leading-[1.04] tracking-tight" style={{ maxWidth: '12ch' }}>
              Embarque nos seus estudos.
            </h1>
            <p className="mt-4 text-base leading-relaxed" style={{ color: C.ink200, maxWidth: '34ch' }}>
              Entre para continuar de onde parou e siga em frente na sua fluência.
            </p>
          </div>

          <div className="flex items-center gap-3.5 text-sm" style={{ color: C.ink200 }}>
            <span className="font-semibold" style={{ color: C.cream }}>Início</span>
            <span
              className="relative h-0.5 flex-1"
              style={{
                background: `repeating-linear-gradient(90deg,${C.ink400} 0 6px,transparent 6px 12px)`,
              }}
            >
              <Plane
                className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: C.mint400, animation: 'plane-move 2.4s ease-in-out infinite alternate' }}
              />
            </span>
            <span className="font-semibold" style={{ color: C.cream }}>Fluência</span>
          </div>
        </div>

        {/* PERFURAÇÃO — só desktop */}
        <div className="relative hidden w-0 flex-none md:block">
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 26, bottom: 26, borderLeft: `2px dashed ${C.ink600}` }} />
          <div className="absolute left-1/2 h-[34px] w-[34px] -translate-x-1/2 rounded-full" style={{ top: -17, background: '#e7eaf0' }} />
          <div className="absolute left-1/2 h-[34px] w-[34px] -translate-x-1/2 rounded-full" style={{ bottom: -17, background: '#e7eaf0' }} />
        </div>

        {/* STUB — formulário */}
        <div
          className="flex w-full flex-none flex-col justify-center p-8 sm:p-11 md:w-[362px]"
          style={{ background: 'rgba(255,255,255,.03)' }}
        >
          {/* marca compacta no mobile */}
          <span className="mb-4 font-display text-lg font-bold md:hidden" style={{ color: C.cream }}>
            English with Ana
          </span>

          <div className="mb-5 text-xs font-bold tracking-[0.14em]" style={{ color: C.ink300 }}>
            EMBARQUE AQUI
          </div>

          <form onSubmit={submit} className="flex flex-col">
            <div className="relative mb-3.5">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2" style={{ color: C.ink300 }} />
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="py-3.5 pl-11 pr-4 transition focus:border-transparent focus:ring-2"
                style={{ ...inputStyle }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${C.mint}`)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
            </div>

            <div className="relative mb-4">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2" style={{ color: C.ink300 }} />
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="py-3.5 pl-11 pr-11"
                style={{ ...inputStyle }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${C.mint}`)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 p-1.5"
                style={{ color: C.ink300 }}
              >
                {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <label className="inline-flex cursor-pointer select-none items-center gap-2 text-[13px]" style={{ color: C.ink200 }}>
                <input type="checkbox" className="h-4 w-4 cursor-pointer" style={{ accentColor: C.mint }} /> Lembrar de mim
              </label>
              <button type="button" onClick={forgot} className="text-[13px] font-semibold" style={{ color: C.mint400 }}>
                Esqueci a senha
              </button>
            </div>

            {error && <p className="mb-3 text-sm" style={{ color: '#ff8f8f' }}>{error}</p>}
            {info && <p className="mb-3 text-sm" style={{ color: C.mint400 }}>{info}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex h-[52px] items-center justify-center gap-2 rounded-xl text-[15px] font-bold transition-transform active:scale-[.99] disabled:opacity-70"
              style={{ background: C.mint, color: '#0a192f', boxShadow: `0 8px 24px -6px ${C.mint}80` }}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Plane className="h-[18px] w-[18px]" />
              )}
              {mode === 'login' ? 'Embarcar na jornada' : 'Criar conta e embarcar'}
            </button>
          </form>

          <p className="mt-5 text-center text-[13px]" style={{ color: C.ink300 }}>
            {mode === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === 'login' ? 'signup' : 'login'))
                setError(null)
                setInfo(null)
              }}
              className="font-semibold"
              style={{ color: C.cream }}
            >
              {mode === 'login' ? 'Criar agora' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
