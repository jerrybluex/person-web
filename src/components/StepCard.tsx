import type { CSSProperties } from 'react'

export function StepCard({ number, title, body, style }: {
  number: string
  title: string
  body?: string
  style?: CSSProperties
}) {
  return (
    <div style={{ borderTop: '1px solid var(--border-hair-strong)', paddingTop: '22px', position: 'relative', ...style }}>
      <span style={{ position: 'absolute', top: -2, left: 0, width: 42, height: 3, background: 'var(--color-steel-bright)' }} />
      <b style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-steel-bright)', letterSpacing: '.06em', fontFamily: 'var(--font-mono)' }}>{number}</b>
      <h4 style={{ margin: '14px 0 0', fontWeight: 600, fontSize: 'var(--text-h4)', letterSpacing: '-.01em' }}>{title}</h4>
      {body && (
        <p style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: 'var(--leading-normal)', color: 'var(--color-muted)' }}>
          {body}
        </p>
      )}
    </div>
  )
}
