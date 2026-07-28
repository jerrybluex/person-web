import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * HUD kit — 赛博控制台设计语言共享件
 * HudStyle: 注入全局 keyframes（扫描/闪烁/脉冲/glitch/入场）
 * HudCorners: 四角瞄准框（父元素需 position:relative）
 * HudLabel: 悬浮标签页签（父元素需 position:relative）
 * ScanOverlay: 扫描线底纹 + 下移扫描条
 * useTypewriter / useReadouts: 终端打字与实时遥测
 */

const hudCSS = `
  @keyframes hudScan {
    from { top: -140px; }
    to   { top: 110%; }
  }
  @keyframes hudBlink {
    50% { opacity: 0; }
  }
  @keyframes hudPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(110, 231, 183, .9); }
    50%      { opacity: .45; box-shadow: 0 0 2px rgba(110, 231, 183, .4); }
  }
  @keyframes hudGlitch1 {
    0%, 92%, 100% { transform: none; opacity: 0; }
    93% { transform: translate(-4px, -2px); opacity: .8; }
    96% { transform: translate(3px, 1px); opacity: .8; }
  }
  @keyframes hudGlitch2 {
    0%, 88%, 100% { transform: none; opacity: 0; }
    89% { transform: translate(4px, 2px); opacity: .8; }
    95% { transform: translate(-3px, -1px); opacity: .8; }
  }
  @keyframes hudFadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
  .hud-glitch { position: relative; display: inline-block; }
  .hud-glitch::before, .hud-glitch::after {
    content: attr(data-text); position: absolute; inset: 0; overflow: hidden;
    pointer-events: none;
  }
  .hud-glitch::before {
    color: #9d7cff; animation: hudGlitch1 3.2s steps(2) infinite; clip-path: inset(20% 0 55% 0);
  }
  .hud-glitch::after {
    color: #4fd1c5; animation: hudGlitch2 2.7s steps(2) infinite; clip-path: inset(60% 0 15% 0);
  }
  .hud-cursor {
    display: inline-block; width: .16em; height: .92em; margin-left: 6px;
    background: #8df8ea; vertical-align: -0.1em;
    animation: hudBlink .85s steps(1) infinite;
    box-shadow: 0 0 14px rgba(141, 248, 234, .8);
  }
  .hud-fade-up {
    opacity: 0; transform: translateY(22px);
    animation: hudFadeUp .8s cubic-bezier(.16, 1, .3, 1) forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .hud-glitch::before, .hud-glitch::after, .hud-cursor, .hud-fade-up {
      animation: none !important; opacity: 1; transform: none;
    }
  }
`

export function HudStyle() {
  return <style>{hudCSS}</style>
}

export function HudCorners({ size = 22, color = 'var(--color-steel)', style }: {
  size?: number
  color?: string
  style?: CSSProperties
}) {
  const base: CSSProperties = { position: 'absolute', width: size, height: size, pointerEvents: 'none' }
  const bar = (pos: CSSProperties): CSSProperties => ({ position: 'absolute', background: color, ...pos })
  const corner = (pos: CSSProperties, key: string) => (
    <span key={key} style={{ ...base, ...pos }}>
      <span style={bar({ width: '100%', height: 2, top: 0, left: 0 })} />
      <span style={bar({ width: 2, height: '100%', top: 0, left: 0 })} />
    </span>
  )
  return (
    <span style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }} aria-hidden>
      {corner({ top: 0, left: 0 }, 'tl')}
      {corner({ top: 0, right: 0, transform: 'scaleX(-1)' }, 'tr')}
      {corner({ bottom: 0, left: 0, transform: 'scaleY(-1)' }, 'bl')}
      {corner({ bottom: 0, right: 0, transform: 'scale(-1)' }, 'br')}
    </span>
  )
}

export function HudLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{
      position: 'absolute', top: -9, left: 14, padding: '0 8px', zIndex: 2,
      background: 'var(--color-paper)', fontFamily: 'var(--font-mono)', fontSize: 11,
      letterSpacing: '.14em', color: 'var(--color-steel)', whiteSpace: 'nowrap',
      ...style,
    }}>
      {children}
    </span>
  )
}

export function ScanOverlay() {
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'repeating-linear-gradient(0deg, rgba(141,248,234,.028) 0 1px, transparent 1px 4px)',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 120, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent, rgba(79,209,197,.06) 45%, rgba(141,248,234,.10) 50%, rgba(79,209,197,.06) 55%, transparent)',
        animation: 'hudScan 7s linear infinite',
      }} />
    </>
  )
}

export function StatusDot({ label = 'ONLINE' }: { label?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', color: 'var(--color-terminal, #6ee7b7)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6ee7b7', animation: 'hudPulse 1.6s ease-in-out infinite' }} />
      {label}
    </span>
  )
}

export function useTypewriter(lines: string[], speed = 34) {
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const joined = lines.join('\n')
  useEffect(() => {
    setText('')
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i++
      setText(joined.slice(0, i))
      if (i >= joined.length) {
        setDone(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [joined, speed])
  return { text, done }
}

export function useReadouts(intervalMs = 900) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  const signal = (97.2 + ((tick * 37) % 26) / 10).toFixed(1)
  const lat = 9 + ((tick * 13) % 14)
  const nodes = 4096 + ((tick * 7) % 512)
  const uptime = `${String(Math.floor(tick / 60)).padStart(2, '0')}:${String(tick % 60).padStart(2, '0')}`
  return { signal, lat, nodes, uptime }
}
