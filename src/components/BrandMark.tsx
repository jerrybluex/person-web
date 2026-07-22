import type { CSSProperties } from 'react'
import { useLang } from '../i18n/LangContext'

export function BrandMark({ size = 44, style }: {
  name?: string
  size?: number
  style?: CSSProperties
}) {
  const { lang } = useLang()
  const isChinese = lang === 'zh'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 1,
        ...style,
      }}
      aria-label={isChinese ? '栖问智能' : 'SWARQ'}
    >
      {isChinese ? (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: Math.max(2, Math.round(size * 0.08)),
            color: 'var(--color-slate-ink)',
            fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei UI', sans-serif",
            fontSize: Math.max(20, Math.round(size * 0.72)),
            fontWeight: 750,
            letterSpacing: '.08em',
            whiteSpace: 'nowrap',
          }}
        >
          <span>栖</span>
          <span style={{ color: 'var(--color-steel-bright)' }}>问</span>
          <span>智能</span>
        </span>
      ) : (
        <span
          aria-hidden="true"
          style={{
            color: 'var(--color-steel-bright)',
            fontFamily: "'Pixelify Sans', 'JetBrains Mono', monospace",
            fontSize: size,
            fontWeight: 500,
            letterSpacing: '.03em',
            textTransform: 'lowercase',
            textShadow: '0 0 18px rgba(79, 209, 197, 0.24)',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          swarq
        </span>
      )}
    </span>
  )
}
