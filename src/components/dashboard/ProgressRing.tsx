interface ProgressRingProps {
  /** 0–100 */
  value: number
  size?: number
  stroke?: number
}

/** Anel de progresso circular — trilho petróleo claro, arco âmbar. */
export function ProgressRing({ value, size = 104, stroke = 10 }: ProgressRingProps) {
  const pct = Math.max(0, Math.min(100, value))
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--color-primary-soft))"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--color-accent-light))"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-mono text-xl font-bold text-white">{pct}%</span>
        <span className="mt-1 text-[11px] text-on-primary-muted">done</span>
      </div>
    </div>
  )
}
