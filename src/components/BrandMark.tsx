import type { CSSProperties } from 'react'

export function BrandMark({ name = 'swarq', size = 44, style }: {
  name?: string
  size?: number
  style?: CSSProperties
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', minWidth: size * 3.95, ...style }} aria-label={name}>
      <img
        src="/logo-swarq.png"
        alt=""
        aria-hidden="true"
        style={{ display: 'block', height: size, width: 'auto', filter: 'contrast(1.14) saturate(1.08)' }}
      />
    </span>
  )
}
