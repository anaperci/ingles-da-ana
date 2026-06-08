interface ScoreRingProps {
  value: number
  label: string
  size?: number
}

function colorFor(v: number): string {
  if (v >= 80) return 'hsl(var(--success))'
  if (v >= 60) return 'hsl(var(--warning))'
  return 'hsl(var(--error))'
}

export function ScoreRing({ value, label, size = 96 }: ScoreRingProps) {
  const stroke = 8
  const radius = (size - stroke) / 2
  const circ = 2 * Math.PI * radius
  const offset = circ - (Math.min(100, Math.max(0, value)) / 100) * circ
  const color = colorFor(value)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold"
          style={{ color }}
        >
          {Math.round(value)}
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
