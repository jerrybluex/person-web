import type { CSSProperties } from 'react'

export function BrandMark({ name = 'NEXMIND', size = 13, color = 'var(--color-slate-ink)', style }: {
  name?: string
  size?: number
  color?: string
  style?: CSSProperties
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', color, ...style }}>
      <span style={{ width: size, height: size, background: color, borderRadius: '3px' }} />
      {name}
    </span>
  )
}
