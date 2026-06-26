import type { CSSProperties, ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

export function SectionHeading({ eyebrow, title, sub, tone = 'light', align = 'left', maxWidth = 760, style }: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  maxWidth?: number
  style?: CSSProperties
}) {
  const onDark = tone === 'dark'
  return (
    <div style={{ maxWidth, textAlign: align, ...style }}>
      {eyebrow && <Eyebrow tone={onDark ? 'onDark' : 'steel'}>{eyebrow}</Eyebrow>}
      <h2
        style={{
          margin: '16px 0 0',
          font: 'var(--type-h2)',
          letterSpacing: 'var(--tracking-display)',
          color: onDark ? 'var(--color-paper)' : 'var(--color-slate-ink)',
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            margin: '18px 0 0',
            fontSize: 'var(--text-lead)',
            lineHeight: 'var(--leading-body)',
            color: onDark ? 'rgba(238,240,242,.6)' : 'var(--color-muted)',
            maxWidth: '54ch',
            marginInline: align === 'center' ? 'auto' : undefined,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
