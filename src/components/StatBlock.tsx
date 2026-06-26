import type { CSSProperties } from 'react'

export function StatBlock({ value, label, style }: {
  value: string
  label: string
  style?: CSSProperties
}) {
  return (
    <div style={{ ...style }}>
      <b
        style={{
          display: 'block',
          fontWeight: 500,
          fontSize: '30px',
          letterSpacing: '-.03em',
          color: 'var(--color-slate-ink)',
        }}
      >
        {value}
      </b>
      <span style={{ fontSize: '13px', color: 'var(--color-faint)', letterSpacing: '.02em' }}>{label}</span>
    </div>
  )
}
