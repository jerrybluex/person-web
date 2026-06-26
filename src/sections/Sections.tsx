import React from 'react'
import { Button } from '../components/Button'
import { Eyebrow } from '../components/Eyebrow'
import { SectionHeading } from '../components/SectionHeading'
import { StatBlock } from '../components/StatBlock'
import { ServiceCard } from '../components/ServiceCard'
import { CapabilityRow } from '../components/CapabilityRow'
import { StepCard } from '../components/StepCard'
import { BrandMark } from '../components/BrandMark'

const wrap: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 40px' }

export function Nav({ currentHash = '' }: { currentHash?: string }) {
  const links: [string, string][] = [
    ['服务', '#services'],
    ['系统', '#system'],
    ['交付', '#delivery'],
    ['实验室', '#lab']
  ]
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(238,240,242,.86)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-hair-soft)' }}>
      <div className="site-nav-inner" style={{ ...wrap, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none' }}><BrandMark /></a>
        <div className="site-nav-links" style={{ display: 'flex', gap: 36, fontSize: 14, fontWeight: 500 }}>
          {links.map(([t, h]) => {
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
                {t}
              </a>
            )
          })}
        </div>
        <Button className="site-nav-action" size="sm" variant="ghost" as="a" href="#contact">预约方案诊断</Button>
      </div>
    </nav>
  )
}

export function Hero() {
  const stats: [string, string][] = [['2–4 周', '原型链路验证'], ['端云一体', '设备 + 私有部署'], ['可观测', '可授权 · 可运维'], ['3 条业务线', '硬件 / 智能体 / 模型']]
  return (
    <header id="top" style={{ padding: '108px 0 0' }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 64, alignItems: 'end', paddingBottom: 64, borderBottom: '1px solid var(--border-hair)' }}>
          <div>
            <Eyebrow>企业 AI 工程 · Enterprise AI Engineering</Eyebrow>
            <h1 style={{ font: 'var(--type-hero)', letterSpacing: 'var(--tracking-display)', margin: '26px 0 0' }}>构建企业自己的<br />AI 大脑</h1>
          </div>
          <div style={{ paddingBottom: 6 }}>
            <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)', margin: 0 }}>
              交付智能硬件、业务智能体与定制大模型，把分散的数据、设备和流程，聚合成可上线、可运维、可持续进化的 AI 系统
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
              <Button as="a" href="#contact">预约方案诊断</Button>
              <Button variant="ghost" as="a" href="#services">查看业务模块</Button>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {stats.map(([v, l], i) => (
            <StatBlock key={l} value={v} label={l}
              style={{ padding: '30px 24px 30px 0', borderRight: i < 3 ? '1px solid var(--border-hair-soft)' : 'none' }} />
          ))}
        </div>
      </div>
    </header>
  )
}

export function Services() {
  const items: [string, string, string, string][] = [
    ['01', 'Edge Hardware', '智能硬件开发', '传感器、边缘推理、设备云与工业设计一体化，让 AI 能力进入真实终端'],
    ['02', 'Agent System', '智能体开发与部署', '为销售、运营、客服和研发流程构建可观测、可授权、可接入企业系统的智能体'],
    ['03', 'Custom Model', '大模型定制', '围绕行业语料、私有部署和任务指标，完成微调、评测、压缩与长期运维'],
  ]
  return (
    <section id="services" style={{ padding: '84px 0 104px' }}>
      <div style={wrap}>
        <SectionHeading eyebrow="What We Build" title="三条业务线，组成企业 AI 落地的核心神经网络" style={{ marginBottom: 56 }} />
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
  const caps: [string, string][] = [['01', '多模态感知'], ['02', '边缘推理'], ['03', 'RAG 知识工程'], ['04', 'Agent 编排'], ['05', '模型微调'], ['06', '私有化部署']]
  return (
    <section id="system" style={{ paddingBottom: 104 }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, padding: '72px 64px', background: 'var(--color-dark)', borderRadius: 'var(--radius-md)' }}>
          <SectionHeading tone="dark" eyebrow="System Layers"
            title={<>不是展示型 Demo，<br />而是生产级 AI 系统</>}
            sub="围绕数据、权限、部署、评测和运维建立持续演进的工程体系，让模型能力真正进入设备和业务流程" />
          <div style={{ borderTop: '1px solid var(--border-on-dark)' }}>
            {caps.map(([i, t]) => <CapabilityRow key={i} index={i}>{t}</CapabilityRow>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Delivery() {
  const steps: [string, string, string][] = [
    ['01', '诊断业务场景', '先聊业务问题，确认智能应该出现在哪里'],
    ['02', '验证原型链路', '2–4 周搭出可跑通的原型链路'],
    ['03', '集成企业系统', '接入权限、数据与现有业务系统'],
    ['04', '进入生产迭代', '建立评测与运维，持续演进'],
  ]
  return (
    <section id="delivery" style={{ paddingBottom: 104 }}>
      <div style={wrap}>
        <SectionHeading eyebrow="Delivery Path" title={<>用清晰交付节奏<br />降低 AI 项目不确定性</>} style={{ marginBottom: 56 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
          {steps.map(([n, t, b]) => <StepCard key={n} number={n} title={t} body={b} />)}
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-hair)', padding: '48px 0' }}>
      <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BrandMark size={32} />
        <span style={{ fontSize: 13, color: 'var(--color-faint)', letterSpacing: '.04em' }}>Intelligent Hardware / Agent Systems / Custom LLMs</span>
      </div>
    </footer>
  )
}
