import React from 'react'

/** Letter-spaced steel kicker that opens every section. Latin small-caps style. */
export function Eyebrow({ children, tone = 'steel', style, ...rest }) {
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
