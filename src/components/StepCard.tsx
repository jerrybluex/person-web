import type { CSSProperties } from 'react'

export function StepCard({ number, title, body, style }: {
  number: string
  title: string
  body?: string
  style?: CSSProperties
}) {
  return (
    <div style={{ borderTop: '1.5px solid var(--color-slate-ink)', paddingTop: '22px', ...style }}>
      <b style={{ fontWeight: 500, fontSize: '14px', color: 'var(--color-steel)', letterSpacing: '.06em' }}>{number}</b>
      <h4 style={{ margin: '14px 0 0', fontWeight: 600, fontSize: 'var(--text-h4)', letterSpacing: '-.01em' }}>{title}</h4>
      {body && (
        <p style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: 'var(--leading-normal)', color: 'var(--color-muted)' }}>
          {body}
        </p>
      )}
    </div>
  )
}
