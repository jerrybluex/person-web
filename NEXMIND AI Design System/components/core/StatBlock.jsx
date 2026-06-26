import React from 'react'

/** A single figure in the hairline-ruled hero stat strip: big value + small label. */
export function StatBlock({ value, label, style }) {
  return (
    <div style={{ ...style }}>
      <b
        style={{
          display: 'block',
          fontWeight: 500,
          fontSize: '30px',
          letterSpacing: '-.03em',
          color: 'var(--color-slate-ink)',
        }}
      >
        {value}
      </b>
      <span style={{ fontSize: '13px', color: 'var(--color-faint)', letterSpacing: '.02em' }}>{label}</span>
    </div>
  )
}
