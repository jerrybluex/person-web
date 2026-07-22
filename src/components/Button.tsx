import { useState, type ElementType } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export function Button({ variant = 'primary', size = 'md', as = 'button', children, style, ...rest }: {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  as?: string
  children?: ReactNode
  style?: CSSProperties
  [key: string]: unknown
}) {
  const [hover, setHover] = useState(false)
  const pad = size === 'sm' ? '10px 20px' : size === 'lg' ? '16px 32px' : '14px 28px'
  const fs = size === 'sm' ? '14px' : '15px'
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: pad,
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-sans)',
    fontSize: fs,
    fontWeight: 600,
    letterSpacing: '.01em',
    lineHeight: 1,
    cursor: 'pointer',
    border: '1px solid transparent',
    textDecoration: 'none',
    transition: 'all var(--dur) var(--ease-out)',
  }
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: hover
        ? 'linear-gradient(135deg, #8df8ea 0%, #9d7cff 100%)'
        : 'linear-gradient(135deg, #4fd1c5 0%, #8df8ea 100%)',
      color: '#04100f',
      boxShadow: hover ? 'var(--shadow-glow-strong)' : 'var(--shadow-glow)',
      border: '1px solid rgba(141, 248, 234, 0.42)',
      transform: hover ? 'translateY(-1px)' : 'none',
    },
    ghost: {
      background: hover ? 'rgba(141, 248, 234, 0.08)' : 'rgba(243, 247, 244, 0.02)',
      color: hover ? 'var(--color-steel-bright)' : 'var(--color-slate-2)',
      borderColor: hover ? 'var(--border-hair-strong)' : 'var(--border-hair)',
      boxShadow: hover ? '0 0 18px rgba(79, 209, 197, 0.10)' : 'none',
    },
  }
  const Tag = as as ElementType
  return (
    <Tag
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
