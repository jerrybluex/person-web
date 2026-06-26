import type { CSSProperties, ReactNode } from 'react'

export function Eyebrow({ children, tone = 'steel', style, ...rest }: {
  children?: ReactNode
  tone?: 'steel' | 'onDark'
  style?: CSSProperties
  [key: string]: unknown
}) {
  const color = tone === 'onDark' ? 'var(--color-steel-soft)' : 'var(--color-steel)'
  return (
    <p
      style={{
        margin: 0,
        fontSize: 'var(--text-eyebrow)',
        fontWeight: 600,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  )
}
