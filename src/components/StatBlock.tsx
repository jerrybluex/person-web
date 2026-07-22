import type { CSSProperties } from 'react'

export function StatBlock({ value, label, style }: {
  value: string
  label: string
  style?: CSSProperties
}) {
  return (
    <div style={{ textAlign: 'center', ...style }}>
      <b
        style={{
          display: 'block',
          fontWeight: 700,
          fontSize: '28px',
          letterSpacing: 0,
          color: 'var(--color-slate-ink)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.15,
        }}
      >
        {value}
      </b>
      <span style={{ display: 'block', marginTop: 8, fontSize: '13px', color: 'var(--color-muted)', letterSpacing: 0 }}>{label}</span>
    </div>
  )
}
