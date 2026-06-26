import React from 'react'

/** A capability line for the inverted dark block: index + label, nudges right on hover. */
export function CapabilityRow({ index, children, style }) {
  const [hover, setHover] = React.useState(false)
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
        color: 'var(--color-paper)',
        transition: 'padding-left var(--dur) var(--ease-out)',
        ...style,
      }}
    >
      {index && (
        <i style={{ fontStyle: 'normal', fontSize: '12px', color: '#7f93a3', letterSpacing: '.08em', width: '34px', flex: 'none' }}>
          {index}
        </i>
      )}
      {children}
    </div>
  )
}
