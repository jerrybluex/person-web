import { useState } from 'react'
import type { CSSProperties } from 'react'

export function ServiceCard({ index, label, title, body, style }: {
  index?: string
  label?: string
  title: string
  body: string
  style?: CSSProperties
}) {
  const [hover, setHover] = useState(false)
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '40px 32px 44px',
        background: hover ? 'var(--color-card)' : 'transparent',
        transition: 'background var(--dur-slow) var(--ease-out)',
        ...style,
      }}
    >
      {index && (
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-steel)', letterSpacing: '.1em' }}>
          {index}
        </div>
      )}
      {label && (
        <div
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--color-faint)',
            marginTop: '4px',
          }}
        >
          {label}
        </div>
      )}
      <h3 style={{ margin: '26px 0 14px', font: 'var(--type-h3)', letterSpacing: 'var(--tracking-tight)' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)' }}>
        {body}
      </p>
    </article>
  )
}
