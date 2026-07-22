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
        background: hover ? 'rgba(141, 248, 234, 0.08)' : 'rgba(243, 247, 244, 0.02)',
        border: '1px solid',
        borderColor: hover ? 'var(--color-steel)' : 'var(--border-hair)',
        padding: '7px 12px',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '.04em',
        color: hover ? 'var(--color-steel-bright)' : 'var(--color-muted)',
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
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(6, 8, 11, .82)', backdropFilter: 'blur(var(--blur-nav))', borderBottom: '1px solid var(--border-hair-soft)' }}>
      <div className="site-nav-inner" style={{ ...wrap, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none' }}><BrandMark /></a>
        <div className="site-nav-links" style={{ display: 'flex', gap: 30, fontSize: 14, fontWeight: 550, fontFamily: 'var(--font-sans)' }}>
          {links.map(([label, h]) => {
            const isActive = currentHash === h
            return (
              <a
                key={h}
                href={h}
                style={{
                  color: isActive ? 'var(--color-slate-ink)' : 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--dur) var(--ease-out)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-steel-bright)')}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-muted)'
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
  const stats: string[][] = (zh.hero.stats as string[][]).map((_, i) => t(`hero.stats.${i}`).split('||'))

  return (
    <header id="top" style={{ padding: '108px 0 0', position: 'relative', overflow: 'hidden' }}>
      <GridCanvas />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 72% 20%, rgba(79, 209, 197, 0.16), transparent 28%), radial-gradient(circle at 16% 26%, rgba(157, 124, 255, 0.12), transparent 24%)', pointerEvents: 'none' }} />
      <div style={{ ...wrap, position: 'relative', zIndex: 1 }}>
        <div className="hero-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center', paddingBottom: 64, borderBottom: '1px solid var(--border-hair)' }}>
          <div>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            <h1 style={{ margin: '26px 0 24px', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)', fontSize: 'var(--text-hero)', lineHeight: 1.06, letterSpacing: 0, maxWidth: 620 }}>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{t('hero.title1')}</span>
              <span style={{ display: 'block', marginTop: 8, color: 'var(--color-steel-bright)', textShadow: '0 0 26px rgba(79, 209, 197, 0.18)' }}>{t('hero.title2')}</span>
            </h1>
            <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)', margin: '0 0 30px', maxWidth: 540 }}>
              {t('hero.lead')}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button as="a" href="#contact">{t('hero.ctaPrimary')}</Button>
              <Button variant="ghost" as="a" href="#services">{t('hero.ctaSecondary')}</Button>
            </div>
          </div>
          <div style={{ border: '1px solid var(--border-hair)', borderRadius: 'var(--radius-md)', background: 'linear-gradient(180deg, rgba(14, 21, 29, 0.68), rgba(7, 11, 15, 0.86))', boxShadow: 'var(--shadow-pop)', overflow: 'hidden', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 420 }}>
              <BrainCanvas />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: 'rgba(243, 247, 244, 0.018)' }}>
          {stats.map(([v, l], i) => (
            <StatBlock key={i} value={v} label={l}
              style={{ padding: '30px 24px', borderRight: i < 3 ? '1px solid var(--border-hair-soft)' : 'none' }} />
          ))}
        </div>
      </div>
    </header>
  )
}

export function Services() {
  const { t } = useLang()
  const items: string[][] = (zh.services.items as string[][]).map((_, i) => t(`services.items.${i}`).split('||'))

  return (
    <section id="services" style={{ padding: '84px 0 104px' }}>
      <div style={wrap}>
        <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} style={{ marginBottom: 56 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--border-hair)', borderLeft: '1px solid var(--border-hair-soft)' }}>
          {items.map(([idx, label, title, body]) => (
            <ServiceCard key={idx} index={idx} label={label} title={title} body={body}
              style={{ borderRight: '1px solid var(--border-hair-soft)', borderBottom: '1px solid var(--border-hair-soft)' }} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function SystemLayers() {
  const { t } = useLang()
  const caps: string[][] = (zh.system.caps as string[][]).map((_, i) => t(`system.caps.${i}`).split('||'))

  return (
    <section id="system" style={{ paddingBottom: 104 }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, padding: '72px 64px', background: 'linear-gradient(135deg, rgba(5, 7, 10, 0.98), rgba(13, 20, 27, 0.96))', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-hair-soft)', boxShadow: 'var(--shadow-card)' }}>
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
  const steps: string[][] = (zh.delivery.steps as string[][]).map((_, i) => t(`delivery.steps.${i}`).split('||'))

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
