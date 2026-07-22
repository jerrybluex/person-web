import React, { useState } from 'react'
import { Eyebrow } from '../components/Eyebrow'
import { useLang } from '../i18n/LangContext'

const wrap: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 40px' }

interface Project {
  name: string
  category: 'AI & Agents' | 'Web & Desktop' | 'Developer Tools'
  tags: string[]
  stars: number
  forks: number
  url: string
  demoUrl?: string
}

const PROJECTS: Project[] = [
  {
    name: 'multica',
    category: 'AI & Agents',
    tags: ['AI Agent', 'Orchestration', 'Platform'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/multica'
  },
  {
    name: 'everything-claude-code-zh',
    category: 'AI & Agents',
    tags: ['Claude Code', 'Config', 'Translation'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/everything-claude-code-zh'
  },
  {
    name: 'Claude-Code-x-OpenClaw-Guide-Zh',
    category: 'AI & Agents',
    tags: ['AI Agent', 'Tutorial', 'Guide'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/Claude-Code-x-OpenClaw-Guide-Zh'
  },
  {
    name: 'TradingAgents-CN',
    category: 'AI & Agents',
    tags: ['Multi-Agent', 'LLM', 'Quantitative Trading'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/TradingAgents-CN'
  },
  {
    name: 'Download-monitor',
    category: 'Web & Desktop',
    tags: ['JavaScript', 'CLI', 'Web Dashboard'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/Download-monitor'
  },
  {
    name: 'lan-file-transfer',
    category: 'Web & Desktop',
    tags: ['Electron', 'JavaScript', 'LAN Transfer'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/lan-file-transfer'
  },
  {
    name: 'mcp-jobs',
    category: 'Developer Tools',
    tags: ['MCP Server', 'Python', 'Web Scraper'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/mcp-jobs'
  },
  {
    name: 'gstack',
    category: 'AI & Agents',
    tags: ['Claude Code', 'Agent Toolkit', 'Configuration'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/gstack'
  },
  {
    name: 'claude_code_src',
    category: 'Developer Tools',
    tags: ['Reverse Engineering', 'Claude Code', 'Internal'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/claude_code_src'
  },
  {
    name: 'bid-simulator',
    category: 'Web & Desktop',
    tags: ['TypeScript', 'Calculator', 'Single Page'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/bid-simulator',
    demoUrl: 'https://jerrybluex.github.io/bid-simulator/',
  }
]

export function Lab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const { t } = useLang()

  const categories = ['All', 'AI & Agents', 'Web & Desktop', 'Developer Tools']

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory)

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: 'calc(100vh - 160px)', paddingBottom: 104 }}>
      {/* Hero Header */}
      <header style={{ padding: '96px 0 54px' }}>
        <div style={wrap}>
          <Eyebrow>{t('lab.eyebrow')}</Eyebrow>
          <h1 style={{ font: 'var(--type-hero)', letterSpacing: 'var(--tracking-display)', margin: '24px 0 20px' }}>
            {t('lab.title')}
          </h1>
          <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)', maxWidth: 720, margin: 0 }}>
            {t('lab.sub')}
          </p>
        </div>
      </header>

      {/* Filter Tabs */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ ...wrap, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const isActive = selectedCategory === cat
            return (
              <FilterTab
                key={cat}
                label={cat === 'All' ? t('lab.all') : cat}
                active={isActive}
                onClick={() => setSelectedCategory(cat)}
              />
            )
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {filteredProjects.map((proj) => {
              const origIdx = PROJECTS.indexOf(proj)
              return <ProjectCard key={proj.name} project={proj} description={t(`lab.projects.${origIdx}`)} />
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: active ? 'var(--color-steel-bright)' : (hover ? 'rgba(141, 248, 234, 0.08)' : 'transparent'),
        color: active ? 'var(--color-paper)' : (hover ? 'var(--color-slate-ink)' : 'var(--color-muted)'),
        border: '1px solid',
        borderColor: active ? 'var(--color-steel-bright)' : (hover ? 'var(--border-hair-strong)' : 'var(--border-hair)'),
        padding: '8px 16px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-sans)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: active ? 'var(--shadow-glow)' : 'none',
        transition: 'all var(--dur) var(--ease-out)',
      }}
    >
      {label}
    </button>
  )
}

function ProjectCard({ project, description }: { project: Project; description: string }) {
  const [hover, setHover] = useState(false)
  const { t } = useLang()

  const catColors: Record<string, string> = {
    'AI & Agents': 'var(--color-steel)',
    'Web & Desktop': '#06b6d4',
    'Developer Tools': '#10b981'
  }

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--color-white)',
        border: '1px solid',
        borderColor: hover ? 'var(--border-hair-strong)' : 'var(--border-hair-soft)',
        borderRadius: 'var(--radius-md)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxShadow: hover ? 'var(--shadow-card)' : 'none',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'all var(--dur) var(--ease-out)',
      }}
    >
      <div>
        {/* Card Header: Category indicator & Stars/Forks */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: catColors[project.category] || 'var(--color-faint)',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-faint)', textTransform: 'uppercase' }}>
              {project.category}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--color-faint)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
              </svg>
              {project.stars}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v4.256a2.251 2.251 0 1 0 1.5 0V5.372Zm8-.372a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v1.256a2.251 2.251 0 1 0 1.5 0V7.122ZM8 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v2.256a2.251 2.251 0 1 0 1.5 0V8.372Z" />
              </svg>
              {project.forks}
            </span>
          </div>
        </div>

        {/* Project Name */}
        <h3 style={{ margin: '0 0 12px', font: 'var(--type-h3)', letterSpacing: 'var(--tracking-tight)' }}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-slate-ink)',
              textDecoration: 'none',
              transition: 'color var(--dur) var(--ease-out)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-steel-bright)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-slate-ink)'}
          >
            {project.name}
          </a>
        </h3>

        {/* Project Description */}
        <p style={{
          margin: '0 0 24px',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-body)',
          color: 'var(--color-muted)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '78px'
        }}>
          {description}
        </p>
      </div>

      {/* Card Footer: Tags & Link */}
      <div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: '3px 8px',
                background: 'rgba(139, 92, 246, 0.08)',
                color: 'var(--color-muted)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 500,
                border: '1px solid var(--border-hair-soft)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--color-slate-ink)',
                textDecoration: 'none',
                background: 'var(--color-paper)',
                border: '1px solid var(--border-hair)',
                borderRadius: 'var(--radius)',
                padding: '6px 14px',
                transition: 'all var(--dur) var(--ease-out)',
              }}
            >
              {t('lab.liveDemo')}
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              fontWeight: 600,
              color: hover ? 'var(--color-steel-bright)' : 'var(--color-steel)',
              textDecoration: 'none',
              transition: 'color var(--dur) var(--ease-out)',
            }}
          >
            {t('lab.viewRepo')}
          </a>
        </div>
      </div>
    </article>
  )
}
