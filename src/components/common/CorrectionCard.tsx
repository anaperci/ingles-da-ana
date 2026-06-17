import { Check, X, Lightbulb, Volume2 } from 'lucide-react'
import { speak } from '@/lib/tts'
import { cn } from '@/lib/utils'

interface CorrectionCardProps {
  /** acertou? */
  ok: boolean
  /** o que a pessoa respondeu (mostra riscado quando errou) */
  your?: string
  /** a resposta certa (o "jeito certo") */
  answer: string
  /** explicação curta / regra / por quê */
  note?: string
  /** frase de exemplo em inglês mostrando a forma certa em uso */
  example?: string
  /** tradução do exemplo */
  exampleTranslation?: string
  /** mostra o botão de ouvir a resposta (desligue quando a resposta for em PT) */
  speakAnswer?: boolean
  className?: string
}

/**
 * Card de correção padrão do app — usado em todos os módulos de prática.
 * Mostra ✓/✗, a forma certa, opcionalmente o que a pessoa errou, uma explicação
 * e um exemplo (com áudio). Mesma linguagem visual da Escrita.
 */
export function CorrectionCard({
  ok,
  your,
  answer,
  note,
  example,
  exampleTranslation,
  speakAnswer = true,
  className,
}: CorrectionCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-3 text-sm',
        ok ? 'border-success/40 bg-success/5' : 'border-warning/40 bg-warning/10',
        className
      )}
    >
      <div className="mb-1 flex items-center gap-1.5 font-semibold">
        {ok ? (
          <>
            <Check className="h-4 w-4 text-success" />
            <span className="text-success">Correto!</span>
          </>
        ) : (
          <>
            <X className="h-4 w-4 text-warning" />
            <span className="text-warning">Quase</span>
          </>
        )}
      </div>

      {/* o que você escreveu (só quando errou e foi informado) */}
      {!ok && your && your.trim() && (
        <p className="text-muted-foreground line-through decoration-warning/60">
          {your}
        </p>
      )}

      {/* a forma certa */}
      <p className="flex items-center gap-1.5 font-medium text-foreground">
        <span className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
          certo:
        </span>
        {answer}
        {speakAnswer && (
          <button
            type="button"
            onClick={() => speak(answer)}
            aria-label={`Ouvir ${answer}`}
            className="text-muted-foreground hover:text-primary"
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
        )}
      </p>

      {/* explicação / regra */}
      {note && <p className="mt-1 text-muted-foreground">{note}</p>}

      {/* exemplo de uso */}
      {example && (
        <div className="mt-2 flex items-start gap-1.5 rounded-md bg-soft px-2.5 py-2 text-soft-text">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-dark" />
          <div>
            <p className="font-medium">{example}</p>
            {exampleTranslation && (
              <p className="text-xs text-soft-text-2">{exampleTranslation}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
