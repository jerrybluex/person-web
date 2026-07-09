import React from 'react'
import { Eyebrow } from '../components/Eyebrow'
import { useLang } from '../i18n/LangContext'
import { OfdConverter } from './OfdConverter'

const wrap: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 40px' }

export function Tools() {
  const { t } = useLang()

  return (
    <div className="tools-page-container" style={{ background: 'var(--color-paper)', minHeight: 'calc(100vh - 160px)', paddingBottom: 104 }}>
      {/* Hero Header */}
      <header className="tools-header" style={{ padding: '96px 0 54px' }}>
        <div style={wrap}>
          <Eyebrow>{t('tools.eyebrow')}</Eyebrow>
          <h1 style={{ font: 'var(--type-hero)', letterSpacing: 'var(--tracking-display)', margin: '24px 0 20px' }}>
            {t('tools.title')}
          </h1>
          <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)', maxWidth: 720, margin: 0 }}>
            {t('tools.sub')}
          </p>
        </div>
      </header>

      {/* Converter Section */}
      <section style={{ paddingBottom: 54 }}>
        <div style={wrap}>
          <OfdConverter />
        </div>
      </section>
    </div>
  )
}
