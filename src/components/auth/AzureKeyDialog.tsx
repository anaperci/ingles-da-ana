import { useState } from 'react'
import { Check, KeyRound, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getAzureCreds, setAzureCreds } from '@/lib/azure'

/**
 * Conectar a própria chave Azure (BYOK). Pronúncia e vozes naturais são um
 * recurso pago; quem não é a conta dona pluga a própria chave aqui.
 */
export function AzureKeyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const saved = getAzureCreds()
  const [key, setKey] = useState(saved.key)
  const [region, setRegion] = useState(saved.region || 'eastus')
  const [done, setDone] = useState(false)

  function save() {
    setAzureCreds({ key, region })
    setDone(true)
    window.setTimeout(() => {
      setDone(false)
      onClose()
    }, 1200)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-accent-dark" /> Conectar Azure (pronúncia e voz)
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            A avaliação de pronúncia e as vozes naturais usam o <strong>Azure Speech</strong> (recurso
            pago). Crie um recurso gratuito de Speech e cole a chave e a região abaixo.
          </p>
          <a
            href="https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-dark hover:underline"
          >
            Criar recurso Azure Speech <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Chave do Azure Speech"
          />
          <Input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Região (ex: eastus, brazilsouth)"
          />
          <div className="flex items-center justify-end gap-2 pt-1">
            {done && (
              <span className="mr-auto inline-flex items-center gap-1 text-sm font-semibold text-success">
                <Check className="h-4 w-4" /> Conectado!
              </span>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={save} disabled={done || key.trim().length === 0} className="gap-2">
              <Check className="h-4 w-4" /> Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
