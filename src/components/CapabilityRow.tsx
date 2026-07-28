import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export function CapabilityRow({ index, children, style }: {
  index?: string
  children?: ReactNode
  style?: CSSProperties
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '16px',
        padding: '18px 0',
        paddingLeft: hover ? '8px' : 0,
        borderBottom: '1px solid var(--border-on-dark-soft)',
        fontSize: '17px',
        color: 'var(--text-on-dark)',
        transition: 'padding-left var(--dur) var(--ease-out)',
        ...style,
      }}
    >
      {index && (
        <i style={{ fontStyle: 'normal', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-steel)', letterSpacing: '.08em', width: '44px', flex: 'none' }}>
          [{index}]
        </i>
      )}
      <span style={{ color: hover ? 'var(--color-steel-bright)' : undefined, textShadow: hover ? '0 0 18px rgba(79, 209, 197, .4)' : 'none', transition: 'color var(--dur) var(--ease-out), text-shadow var(--dur) var(--ease-out)' }}>
        {children}
      </span>
    </div>
  )
}
