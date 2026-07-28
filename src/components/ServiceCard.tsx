import { useState } from 'react'
import type { CSSProperties } from 'react'
import { HudCorners } from './hud'

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
        position: 'relative',
        padding: '34px 30px 38px',
        background: hover
          ? 'linear-gradient(180deg, rgba(79, 209, 197, 0.06), rgba(12, 18, 25, 0.96)), repeating-linear-gradient(0deg, rgba(141,248,234,.02) 0 1px, transparent 1px 4px)'
          : 'rgba(243, 247, 244, 0.015)',
        transition: 'all var(--dur-slow) var(--ease-out)',
        boxShadow: hover ? 'inset 0 0 0 1px rgba(79, 209, 197, .35), 0 0 32px rgba(79, 209, 197, .10)' : 'none',
        ...style,
      }}
    >
      {hover && <HudCorners size={16} style={{ opacity: .8 }} />}
      {index && (
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-steel-bright)', letterSpacing: '.08em', fontFamily: 'var(--font-mono)' }}>
          [ {index} ]
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
      <h3 style={{ margin: '26px 0 14px', font: 'var(--type-h3)', letterSpacing: 'var(--tracking-tight)', color: hover ? 'var(--color-steel-bright)' : undefined, transition: 'color var(--dur-slow) var(--ease-out)' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)' }}>
        {body}
      </p>
    </article>
  )
}
