import type { CSSProperties } from 'react'

export function BrandMark({ name = 'swarq', size = 44, style }: {
  name?: string
  size?: number
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        color: '#5faef2',
        fontFamily: "'Pixelify Sans', 'JetBrains Mono', monospace",
        fontSize: size,
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '.03em',
        textTransform: 'lowercase',
        textShadow: '2px 2px 0 rgba(26, 35, 48, 0.28)',
        WebkitFontSmoothing: 'none',
        MozOsxFontSmoothing: 'auto',
        imageRendering: 'pixelated',
        ...style
      }}
      aria-label={name}
    >
      {name}
    </span>
  )
}
