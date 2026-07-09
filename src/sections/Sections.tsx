import React, { useState } from 'react'
import { Button } from '../components/Button'
import { Eyebrow } from '../components/Eyebrow'
import { SectionHeading } from '../components/SectionHeading'
import { StatBlock } from '../components/StatBlock'
import { ServiceCard } from '../components/ServiceCard'
import { CapabilityRow } from '../components/CapabilityRow'
import { StepCard } from '../components/StepCard'
import { BrandMark } from '../components/BrandMark'
import { useLang } from '../i18n/LangContext'
import { zh } from '../i18n/zh'
import { GridCanvas } from '../components/GridCanvas'
import { BrainCanvas } from '../components/BrainCanvas'

const wrap: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 40px' }

function LangToggle() {
  const { lang, setLang } = useLang()
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'transparent',
        border: '1px solid',
        borderColor: hover ? 'var(--color-slate-ink)' : 'var(--border-hair)',
        padding: '6px 12px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-sans)',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '.04em',
        color: hover ? 'var(--color-slate-ink)' : 'var(--color-muted)',
        cursor: 'pointer',
        transition: 'all var(--dur) var(--ease-out)',
      }}
    >
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
  )
}

export function Nav({ currentHash = '' }: { currentHash?: string }) {
  const { t } = useLang()
  const links: [string, string][] = [
    [t('nav.services'), '#services'],
    [t('nav.system'), '#system'],
    [t('nav.delivery'), '#delivery'],
    [t('nav.lab'), '#lab'],
    [t('nav.tools'), '#tools'],
  ]
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(251,251,250,.86)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-hair-soft)' }}>
      <div className="site-nav-inner" style={{ ...wrap, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none' }}><BrandMark /></a>
        <div className="site-nav-links" style={{ display: 'flex', gap: 36, fontSize: 14, fontWeight: 500 }}>
          {links.map(([label, h]) => {
            const isActive = currentHash === h
            return (
              <a
                key={h}
                href={h}
                style={{
                  color: isActive ? 'var(--color-slate-ink)' : 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--dur) var(--ease-out)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-slate-ink)')}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--color-muted)'
                  }
                }}
              >
                {label}
              </a>
            )
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangToggle />
          <Button className="site-nav-action" size="sm" variant="ghost" as="a" href="#contact">{t('nav.cta')}</Button>
        </div>
      </div>
    </nav>
  )
}

export function Hero() {
  const { t } = useLang()
  const stats: string[][] = (zh.hero.stats as string[][]).map((_, i) => {
    const raw = t(`hero.stats.${i}`)
    return raw.split('||')
  })
  return (
    <header id="top" style={{ padding: '108px 0 0', position: 'relative', overflow: 'hidden' }}>
      <GridCanvas />
      <div style={{ ...wrap, position: 'relative', zIndex: 1 }}>
        <div className="hero-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center', paddingBottom: 64, borderBottom: '1px solid var(--border-hair)' }}>
          <div>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            <h1 style={{ font: 'var(--type-hero)', letterSpacing: 'var(--tracking-display)', margin: '26px 0 24px' }}>{t('hero.title1')}<br />{t('hero.title2')}</h1>
            <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)', margin: '0 0 30px', maxWidth: 540 }}>
              {t('hero.lead')}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button as="a" href="#contact">{t('hero.ctaPrimary')}</Button>
              <Button variant="ghost" as="a" href="#services">{t('hero.ctaSecondary')}</Button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BrainCanvas />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {stats.map(([v, l], i) => (
            <StatBlock key={i} value={v} label={l}
              style={{ padding: '30px 24px 30px 0', borderRight: i < 3 ? '1px solid var(--border-hair-soft)' : 'none' }} />
          ))}
        </div>
      </div>
    </header>
  )
}

export function Services() {
  const { t } = useLang()
  const items: string[][] = (zh.services.items as string[][]).map((_, i) => {
    const raw = t(`services.items.${i}`)
    return raw.split('||')
  })
  return (
    <section id="services" style={{ padding: '84px 0 104px' }}>
      <div style={wrap}>
        <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} style={{ marginBottom: 56 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--border-hair)' }}>
          {items.map(([idx, label, title, body], i) => (
            <ServiceCard key={idx} index={idx} label={label} title={title} body={body}
              style={{ borderRight: i < 2 ? '1px solid var(--border-hair-soft)' : 'none', borderBottom: '1px solid var(--border-hair-soft)' }} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function SystemLayers() {
  const { t } = useLang()
  const caps: string[][] = (zh.system.caps as string[][]).map((_, i) => {
    const raw = t(`system.caps.${i}`)
    return raw.split('||')
  })
  return (
    <section id="system" style={{ paddingBottom: 104 }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, padding: '72px 64px', background: 'var(--color-dark)', borderRadius: 'var(--radius-md)' }}>
          <SectionHeading tone="dark" eyebrow={t('system.eyebrow')}
            title={<>{t('system.title1')}<br />{t('system.title2')}</>}
            sub={t('system.sub')} />
          <div style={{ borderTop: '1px solid var(--border-on-dark)' }}>
            {caps.map(([i, label]) => <CapabilityRow key={i} index={i}>{label}</CapabilityRow>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Delivery() {
  const { t } = useLang()
  const steps: string[][] = (zh.delivery.steps as string[][]).map((_, i) => {
    const raw = t(`delivery.steps.${i}`)
    return raw.split('||')
  })
  return (
    <section id="delivery" style={{ paddingBottom: 104 }}>
      <div style={wrap}>
        <SectionHeading eyebrow={t('delivery.eyebrow')} title={<>{t('delivery.title1')}<br />{t('delivery.title2')}</>} style={{ marginBottom: 56 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
          {steps.map(([n, title, body]) => <StepCard key={n} number={n} title={title} body={body} />)}
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer style={{ borderTop: '1px solid var(--border-hair)', padding: '48px 0' }}>
      <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BrandMark size={32} />
        <span style={{ fontSize: 13, color: 'var(--color-faint)', letterSpacing: '.04em' }}>{t('footer.tagline')}</span>
      </div>
    </footer>
  )
}
