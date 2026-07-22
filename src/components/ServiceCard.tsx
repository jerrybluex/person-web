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
        padding: '34px 30px 38px',
        background: hover ? 'linear-gradient(180deg, rgba(17, 24, 33, 0.96), rgba(12, 18, 25, 0.96))' : 'rgba(243, 247, 244, 0.015)',
        transition: 'all var(--dur-slow) var(--ease-out)',
        boxShadow: hover ? 'var(--shadow-card)' : 'none',
        transform: hover ? 'translateY(-2px)' : 'none',
        ...style,
      }}
    >
      {index && (
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-steel-bright)', letterSpacing: '.08em', fontFamily: 'var(--font-mono)' }}>
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
