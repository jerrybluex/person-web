import React, { useState } from 'react'
import { Eyebrow } from '../components/Eyebrow'

const wrap: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 40px' }

interface Project {
  name: string
  description: string
  category: 'AI & Agents' | 'Web & Desktop' | 'Developer Tools'
  tags: string[]
  stars: number
  forks: number
  url: string
}

// ==========================================
// 您的 GitHub 真实项目数据
// ==========================================
const PROJECTS: Project[] = [
  {
    name: 'multica',
    description: '开源托管式智能体平台。将编程智能体转化为真正的团队成员——分配任务、跟踪进度、复利累积技能',
    category: 'AI & Agents',
    tags: ['AI Agent', 'Orchestration', 'Platform'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/multica'
  },
  {
    name: 'everything-claude-code-zh',
    description: 'everything-claude-code 中文翻译与实战项目：完整的 Claude Code 配置集合（agents, skills, hooks, commands, rules, MCPs）。源自 Anthropic 黑客松获胜者的实战配置',
    category: 'AI & Agents',
    tags: ['Claude Code', 'Config', 'Translation'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/everything-claude-code-zh'
  },
  {
    name: 'Claude-Code-x-OpenClaw-Guide-Zh',
    description: '从零到企业实战：Claude Code 官方编程神器 + OpenClaw 开源 AI 助手中文双顶流实战教程，深度解析 AI 辅助编程最佳实践',
    category: 'AI & Agents',
    tags: ['AI Agent', 'Tutorial', 'Guide'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/Claude-Code-x-OpenClaw-Guide-Zh'
  },
  {
    name: 'TradingAgents-CN',
    description: '基于多智能体（Multi-Agent）大模型的中文金融交易与量化投资框架，TradingAgents 中文增强版',
    category: 'AI & Agents',
    tags: ['Multi-Agent', 'LLM', 'Quantitative Trading'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/TradingAgents-CN'
  },
  {
    name: 'Download-monitor',
    description: '一款智能的命令行下载监控工具，带有精美的 Web 仪表盘，支持实时速度追踪和任务管理',
    category: 'Web & Desktop',
    tags: ['JavaScript', 'CLI', 'Web Dashboard'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/Download-monitor'
  },
  {
    name: 'lan-file-transfer',
    description: '基于 Electron 构建的 Windows 和 macOS 局域网文件互传桌面端应用，界面精美，传输速度极快',
    category: 'Web & Desktop',
    tags: ['Electron', 'JavaScript', 'LAN Transfer'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/lan-file-transfer'
  },
  {
    name: 'mcp-jobs',
    description: '基于 Model Context Protocol (MCP) 实现的招聘信息抓取服务，支持获取猎聘、Boss直聘、智联招聘、51job的职位信息',
    category: 'Developer Tools',
    tags: ['MCP Server', 'Python', 'Web Scraper'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/mcp-jobs'
  },
  {
    name: 'gstack',
    description: '开箱即用的 Garry Tan (Y Combinator 总裁) 精选 Claude Code 配置套件，集成 CEO、设计师、开发经理、发布经理等 23 项定制化角色与工具',
    category: 'AI & Agents',
    tags: ['Claude Code', 'Agent Toolkit', 'Configuration'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/gstack'
  },
  {
    name: 'claude_code_src',
    description: 'Claude Code 命令行工具核心机制与结构解析（基于还原后的 cli.js 代码），深度拆解 AI 辅助编程神器的内部实现原理',
    category: 'Developer Tools',
    tags: ['Reverse Engineering', 'Claude Code', 'Internal'],
    stars: 0,
    forks: 0,
    url: 'https://github.com/jerrybluex/claude_code_src'
  }
]

export function Lab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'AI & Agents', 'Web & Desktop', 'Developer Tools']

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory)

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: 'calc(100vh - 160px)', paddingBottom: 104 }}>
      {/* Hero Header */}
      <header style={{ padding: '96px 0 54px' }}>
        <div style={wrap}>
          <Eyebrow>Open Source & Personal Sandbox</Eyebrow>
          <h1 style={{ font: 'var(--type-hero)', letterSpacing: 'var(--tracking-display)', margin: '24px 0 20px' }}>
            实验室 / Lab
          </h1>
          <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--color-muted)', maxWidth: 720, margin: 0 }}>
            这里是我在日常开发、技术研究与业余时间中沉淀的开源项目与实验工具。所有项目均发布于 GitHub，欢迎 Star 或贡献代码
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
                label={cat}
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
            {filteredProjects.map(proj => (
              <ProjectCard key={proj.name} project={proj} />
            ))}
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
        background: active ? 'var(--color-slate-ink)' : 'transparent',
        color: active ? 'var(--color-paper)' : (hover ? 'var(--color-slate-ink)' : 'var(--color-muted)'),
        border: '1px solid',
        borderColor: active ? 'var(--color-slate-ink)' : (hover ? 'var(--color-slate-ink)' : 'var(--border-hair)'),
        padding: '8px 16px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-sans)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all var(--dur) var(--ease-out)',
      }}
    >
      {label === 'All' ? '全部' : label}
    </button>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [hover, setHover] = useState(false)

  // 类别对应的标记颜色
  const catColors: Record<string, string> = {
    'AI & Agents': 'var(--color-steel)',
    'Web & Desktop': '#3572A5',
    'Developer Tools': '#4a5d4e'
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
          {project.description}
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
                background: 'var(--color-paper)',
                color: 'var(--color-muted)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 500
              }}
            >
              {tag}
            </span>
          ))}
        </div>

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
          查看仓库
        </a>
      </div>
    </article>
  )
}
