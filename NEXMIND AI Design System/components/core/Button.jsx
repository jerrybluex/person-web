import React from 'react'

/**
 * NEXMIND primary action. Sharp 2px corners, medium-weight label.
 * `primary` = filled slate ink; `ghost` = hairline outline on paper.
 */
export function Button({ variant = 'primary', size = 'md', as = 'button', children, style, ...rest }) {
  const [hover, setHover] = React.useState(false)
  const pad = size === 'sm' ? '10px 18px' : size === 'lg' ? '16px 30px' : '14px 26px'
  const fs = size === 'sm' ? '14px' : '15px'
  const base = {
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
    transition: 'background var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out)',
  }
  const variants = {
    primary: {
      background: hover ? '#000' : 'var(--color-slate-ink)',
      color: 'var(--color-paper)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-slate-ink)',
      borderColor: hover ? 'var(--color-slate-ink)' : 'var(--border-hair)',
    },
  }
  const Tag = as
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
