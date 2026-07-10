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
    display: 'inline-block',
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
        ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
        : 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      color: '#ffffff',
      boxShadow: hover ? 'var(--shadow-glow-strong)' : 'var(--shadow-glow)',
      border: '1px solid rgba(139, 92, 246, 0.30)',
      transform: hover ? 'translateY(-1px)' : 'none',
    },
    ghost: {
      background: hover ? 'rgba(139, 92, 246, 0.10)' : 'transparent',
      color: hover ? 'var(--color-steel-bright)' : 'var(--color-slate-2)',
      borderColor: hover ? 'var(--border-hair-strong)' : 'var(--border-hair)',
      boxShadow: hover ? '0 0 12px rgba(139, 92, 246, 0.08)' : 'none',
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
