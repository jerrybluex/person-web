import React from 'react'

/** The NEXMIND wordmark: a small solid slate square + letter-spaced name. */
export function BrandMark({ name = 'NEXMIND', size = 13, color = 'var(--color-slate-ink)', style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', color, ...style }}>
      <span style={{ width: size, height: size, background: color, borderRadius: '3px' }} />
      {name}
    </span>
  )
}
