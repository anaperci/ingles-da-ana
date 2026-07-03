import { useState } from 'react'
import { Loader2, Check, KeyRound } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

/** Troca a senha do usuário logado (não depende de email). */
export function ChangePasswordDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function submit() {
    setError(null)
    if (pw.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (pw !== confirm) {
      setError('As senhas não conferem.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: pw })
      if (error) throw error
      setDone(true)
      setPw('')
      setConfirm('')
      window.setTimeout(() => {
        setDone(false)
        onClose()
      }, 1500)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-accent-dark" /> Trocar senha
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            type="password"
            autoComplete="new-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Nova senha (mín. 6)"
          />
          <Input
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirmar nova senha"
          />
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex items-center justify-end gap-2 pt-1">
            {done && (
              <span className="mr-auto inline-flex items-center gap-1 text-sm font-semibold text-success">
                <Check className="h-4 w-4" /> Senha alterada!
              </span>
            )}
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={submit} disabled={loading || done} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
