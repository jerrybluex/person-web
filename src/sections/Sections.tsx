import React, { useState } from 'react'
import { Button } from '../components/Button'
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
import { HudCorners, HudLabel, ScanOverlay, StatusDot, useReadouts, useTypewriter } from '../components/hud'

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="site-nav-status"><StatusDot /></span>
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
  const typedTitle = `${t('hero.title1')} ${t('hero.title2')}`
  const { text } = useTypewriter([`> ${t('hero.boot1')}`, `> ${t('hero.boot2')}`, `> ${typedTitle}`])
  const { signal, lat, nodes, uptime } = useReadouts()
  const typedLines = text.split('\n')
  const bootText = typedLines.slice(0, 2).join('\n')
  const titleText = (typedLines[2] ?? '').replace(/^> /, '')
  const readouts: [string, string][] = [['SIGNAL', `${signal}%`], ['LAT', `${lat}ms`], ['NODES', String(nodes)], ['UPTIME', uptime]]

  return (
    <header id="top" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-dark)' }}>
      <GridCanvas />
      <ScanOverlay />
      <div style={{ position: 'absolute', inset: 18, zIndex: 3, pointerEvents: 'none' }}>
        <HudCorners size={26} />
      </div>
      <div style={{ ...wrap, position: 'relative', zIndex: 4 }}>
        <div className="hero-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center', padding: '96px 0 64px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-terminal)', lineHeight: 1.9, minHeight: 46, whiteSpace: 'pre-wrap' }}>
              {bootText}
            </div>
            <h1 style={{ margin: '18px 0 20px', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)', fontSize: 'var(--text-hero)', lineHeight: 1.1, minHeight: '2.2em' }}>
              <span className="hud-glitch" data-text={titleText} style={{ textShadow: '0 0 30px rgba(79, 209, 197, .35)' }}>
                {titleText}
              </span>
              <span className="hud-cursor" />
            </h1>
            <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)', maxWidth: 540, margin: '0 0 26px' }}>
              {t('hero.lead')}
            </p>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 30, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em', color: 'var(--color-terminal)' }}>
              {readouts.map(([k, v]) => (
                <span key={k}>{k} <b style={{ color: 'var(--color-steel-bright)' }}>{v}</b></span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" style={{ background: 'var(--color-steel)', color: '#031b18', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, letterSpacing: '.06em', padding: '13px 24px', textDecoration: 'none', boxShadow: '0 0 22px rgba(79, 209, 197, .45)', transition: 'box-shadow var(--dur) var(--ease-out)' }}>
                [ {t('hero.ctaPrimary')} ]
              </a>
              <a href="#services" style={{ border: '1px solid rgba(79, 209, 197, .4)', color: 'var(--color-steel-bright)', fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '.06em', padding: '13px 24px', textDecoration: 'none' }}>
                [ {t('hero.ctaSecondary')} → ]
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-brain-col">
            <div style={{ position: 'relative', border: '1px solid rgba(79, 209, 197, .35)', background: 'rgba(5, 10, 12, .55)', backdropFilter: 'blur(4px)', padding: 28 }}>
              <HudLabel>NEURAL_CORE // LIVE</HudLabel>
              <BrainCanvas />
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(110, 231, 183, .8)', marginTop: 14, letterSpacing: '.1em' }}>
                <span>HEMISPHERES: 2</span><span>SYNAPSE: FIRING</span><span>MODE: PROD</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border-hair)' }} className="hero-stats-grid">
          {stats.map(([v, l], i) => (
            <StatBlock key={i} value={v} label={l}
              style={{ padding: '26px 24px', borderRight: i < 3 ? '1px solid var(--border-hair-soft)' : 'none' }} />
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
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, padding: '72px 64px', background: 'linear-gradient(135deg, rgba(5, 7, 10, 0.98), rgba(13, 20, 27, 0.96)), repeating-linear-gradient(0deg, rgba(141,248,234,.02) 0 1px, transparent 1px 4px)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(79, 209, 197, .28)', boxShadow: 'var(--shadow-card)' }}>
          <HudLabel style={{ background: 'var(--color-dark-2)' }}>SYSTEM // PROD_LAYERS</HudLabel>
          <HudCorners size={18} style={{ opacity: .55 }} />
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
      <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <BrandMark size={32} />
        <span style={{ fontSize: 13, color: 'var(--color-faint)', letterSpacing: '.04em' }}>{t('footer.tagline')}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: 'var(--color-faint)' }}>
          BUILD 2026.07 // SYS.NOMINAL
        </span>
      </div>
    </footer>
  )
}
