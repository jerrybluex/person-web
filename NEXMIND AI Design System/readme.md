# NEXMIND AI — Design System

> Enterprise-AI engineering studio. Bilingual (中文 + Latin) marketing brand for a
> company that delivers **intelligent hardware, business agents, and custom LLMs**.
> The aesthetic (chosen redesign): a **cool off-white canvas, graphite-slate ink, a single
> restrained steel-blue accent, medium-weight editorial type, hairline structure, and sharp
> 2px corners.** Calm premium-consultancy, deliberately non-"tech."

---

## Sources

This system was reverse-engineered from one provided codebase. Nothing here assumes
the reader has access; paths are recorded in case they do.

- **Codebase:** `person-web/` — a Vite + React 19 + TypeScript single-page marketing site
  for **NEXMIND AI** (`<title>NEXMIND AI | 企业 AI 解决方案</title>`). Source of truth for
  tokens and layout: `src/index.css`, `src/App.css`, `src/App.tsx`.
- **Exploration screenshots** (in-repo, copied to `assets/screens/`):
  - `point-cloud-brain-v2-desktop.png` — the **shipped** dark direction (point-cloud brain hero).
  - `desktop-home.png` — a darker teal-glow variant with the isometric LLM stack.
  - `redesign-desktop.png` — a **light "studio"** alternate direction (off-white page, navy
    cards, lime accent). Captured as a token set but NOT the primary direction.
- **Brand marks:** `public/favicon.svg` → `assets/nexmind-mark.svg`; `public/icons.svg` →
  `assets/icons.svg` (social + utility sprite); `src/assets/hero.png` → `assets/hero-stack.png`
  (the isometric two-layer stack illustration).

The product UI is in **Simplified Chinese** with **uppercase Latin** structural labels.

---

## CONTENT FUNDAMENTALS

How NEXMIND writes. The voice is **confident, engineering-led, and anti-hype** — it sells
production systems, not demos.

- **Bilingual by structure.** Chinese carries the message; Latin carries the *scaffolding*.
  Every section opens with a small uppercase Latin **eyebrow** (`WHAT WE BUILD`,
  `SYSTEM LAYERS`, `DELIVERY PATH`, `PROJECT INTAKE`) above a Chinese headline. Latin is
  also used for product codes (`EDGE HARDWARE`, `AGENT SYSTEM`, `CUSTOM MODEL`) and the
  footer tagline (`Intelligent Hardware / Agent Systems / Custom LLMs`).
- **Headlines are declarative statements, often with a period.** e.g.
  「构建企业自己的 AI 大脑。」 /「不是展示型 Demo，而是生产级 AI 系统。」/「让 AI 从演示走进设备、流程与生产系统。」
  They make a claim and end it. Frequently structured as a contrast ("not X, but Y").
- **Anti-demo positioning is the core message.** Repeated explicitly:
  「不是展示型 Demo，而是生产级 AI 系统」("not a showcase demo, but a production-grade AI system").
  Copy stresses 可观测/可授权/可运维/可持续 (observable / authorizable / operable / sustainable).
- **Voice = "we" (我们) to the enterprise "you" (你).** Direct, second-person CTAs:
  「告诉我们，智能应该出现在哪里。」「先聊业务问题。」 Imperative, low-ceremony.
- **CTAs are plain and operational:** 预约方案诊断 ("book a solution diagnosis"),
  查看业务模块, 提交咨询. Latin nav CTA: `REQUEST ACCESS`.
- **Numbers are concrete, never vague:** 2–4 周 (weeks), 私有化, 端云一体, 6200 VOLUME POINTS.
  Stats appear as terse stat-bars (big value + tiny label), not paragraphs.
- **Casing:** Chinese as written; Latin eyebrows/codes/buttons are **UPPERCASE** with
  wide letter-spacing. Sentence case is never used for Latin labels.
- **No emoji. No exclamation.** Tone is calm authority. Punchy but never loud.
- **Vibe:** quietly futuristic, infrastructural, "we build the nervous system of your company."

---

## VISUAL FOUNDATIONS

> **Direction: Cool-Editorial.** After review, the brand was deliberately moved *away*
> from its original dark/purple "tech" look toward a calm, premium-consultancy aesthetic.
> The system below is that chosen direction. The original dark direction is archived (see
> "History" at the end) and `assets/screens/` keeps its reference shots.

- **Canvas:** **cool off-white `#eef0f2`** (`--color-paper`). Not warm, not pure-white — a
  faintly grey, even paper. Inverted sections use a **cool dark block `#161c26`**
  (`--color-dark`) — no glow, just a flat slate-black panel.
- **Color:** intentionally **non-"tech."** One restrained accent — **steel blue `#3d5a73`**
  (`--color-steel`) — used only for eyebrows, focus rings, numerals, and small marks. Text
  is a **cool graphite ramp**: slate-ink `#1a2330` → slate-2 `#3a4659` → muted `#626c7a` →
  faint `#949ba6`. **No warm tones, no gradients, no glow, no second accent.**
- **Type:** **editorial, not gothic.** Headlines are **medium weight (500)**, tight
  (`-0.035em`), up to 68px — restrained, not heavy. Body is airy: 16px at **1.74**
  line-height in graphite. Eyebrows are 12px / 600 / `+0.22em` / UPPERCASE small-caps in
  steel, often in Title-Case Latin (`What We Build`, `System Layers`). Fonts: product uses
  Aptos + Microsoft YaHei UI; here **Hanken Grotesk + Noto Sans SC**.
- **Spacing:** a calm, even editorial scale (8/12/16/24/32/40/64/104). Sections pad **104px**
  vertically; content maxes at **1120px** with **40px** gutters.
- **Radii:** **sharp.** A near-square **2px** radius on buttons, inputs, cards, and blocks
  (`--radius`); large inverted blocks / the intake panel go to **4px**. This sharpness — a
  deliberate reversal of the original 24px — is the new brand constant. Pills are rare.
- **Backgrounds:** flat cool paper. **No** photos, gradients, glows, point-cloud brains, or
  isometric stacks in this direction — structure comes from whitespace and hairlines alone.
- **Borders:** hairlines are *the* structural device — `rgba(26,35,48,.08)` soft,
  `.14` default, `.26` strong. Service cards have **no border of their own**; the grid
  supplies the rules. On dark, hairlines are `rgba(255,255,255,.10–.14)`.
- **Depth = hairlines + whitespace, NOT shadow.** Elevation is almost never a shadow; a
  single faint `--shadow-pop` exists for optional lift but the default is borderless calm.
  The sticky nav uses a 12px backdrop-blur over translucent paper.
- **Buttons:** primary = **solid slate-ink `#1a2330`**, paper text, 2px radius, ~46px tall,
  weight 600 (hover → pure black). Ghost = transparent with a hairline border (hover →
  ink). **No uppercase, no gradients, no colored fills.**
- **Cards:** transparent fill, **2px** radius; the bordered service grid fills faintly
  (`--color-card`) on hover. Header pattern: steel index + small Latin label → Chinese `h3`
  (weight 600) → muted body.
- **Hover:** muted text → ink; hairline → ink; rows in the dark block **nudge 8px right**;
  cards fill faintly. **No scale, no glow, no bounce.** **Press:** none beyond the color
  shift. **Animation:** quiet 200ms eases (`cubic-bezier(0.22,1,0.36,1)`) only — the page
  is still by default.
- **Transparency & blur:** reserved for the sticky nav alone (translucent paper + 12px
  blur). Everything else is opaque.

---

## ICONOGRAPHY

- **Style:** thin **line icons**, ~1.35 stroke, **round** caps/joins — Lucide-family. In the
  product they're stroked in the bright purple **`#aa3bff`** (see `assets/icons.svg`:
  `documentation-icon`, `social-icon`).
- **Brand/social marks** are solid single-color glyphs in near-black `#08060d` (GitHub, X,
  Discord, Bluesky) — see the same sprite.
- **Provided set:** `assets/icons.svg` is an SVG `<symbol>` sprite. Use via
  `<svg><use href="assets/icons.svg#github-icon"/></svg>`. It's small (social + docs only).
- **Recommended extension:** for general UI iconography use **[Lucide](https://lucide.dev)**
  (CDN) at 1.5 stroke, rounded — it matches the provided line style. ⚠️ *Substitution flagged:*
  Lucide is a near-match, not the product's exact custom set; swap if a fuller brand set surfaces.
- **The brand glyph** in the **cool-editorial** direction is a **small solid slate square**
  (`BrandMark`) — the original purple gradient mark (`assets/nexmind-mark.svg`) was dropped
  as too "tech." Keep the favicon file for archival/back-compat only.
- **No emoji.** No unicode-glyph icons. Numerals (`01`–`06`) act as the primary iconography
  in this direction — sequence over symbols.

---

## INDEX — what's in this system

**Root**
- `styles.css` — entry point (import-only). Consumers link this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `assets/` — `nexmind-mark.svg` (favicon mark), `icons.svg` (social/utility sprite),
  `hero-stack.png` (isometric stack illustration), `screens/` (reference screenshots).
- `readme.md` — this file. `SKILL.md` — Agent-Skill manifest.

**Foundations** (Design System tab → Colors / Type / Spacing / Brand)
- Specimen cards under `guidelines/` (colors, type, spacing, radii, effects, brand mark).

**Components** (`components/core/`)
- `Button`, `Eyebrow`, `SectionHeading`, `StatBlock`, `ServiceCard`, `CapabilityRow`,
  `StepCard`, `Field` (input/select/textarea), `BrandMark`. Each has `.jsx` + `.d.ts` +
  `.prompt.md`; `core.card.html` is the live specimen. Namespace: `NEXMINDAIDesignSystem_999124`.

**UI kit** (`ui_kits/nexmind-site/`)
- Interactive recreation of the redesigned NEXMIND site, composed from the core components:
  nav, hero + stat strip, services grid, inverted system block, delivery steps, intake form,
  footer. `index.html` is the demo; `sections.jsx` + `Intake.jsx` hold the sections.

**Design deliverables** (root)
- `NEXMIND Redesign v2.html` — the chosen cool-editorial redesign (single file).
- `NEXMIND Redesign.html` — earlier two-direction exploration (Studio + Spectrum), archived.

See each component's `.prompt.md` for usage, and the `@dsCard` HTML in each directory for live specimens.

---

## HISTORY — original direction (archived)

The product shipped a **dark / electric-purple** look: pure-black canvas, plum-voltage
`#8052ff` accent, heavy gothic display, **24px** radius everywhere, colored glow + glass,
and signature motifs (point-cloud brain, isometric LLM stack). At the user's direction this
was replaced by the cool-editorial system above. Reference screenshots remain in
`assets/screens/` and the original isometric illustration in `assets/hero-stack.png`.
