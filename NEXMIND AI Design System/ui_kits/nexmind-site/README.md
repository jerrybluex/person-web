# NEXMIND Site — UI Kit

A high-fidelity recreation of the **NEXMIND AI** marketing site in the
**cool-editorial** direction (the chosen redesign). Built entirely from the
design system's `components/core` primitives — no bespoke UI is re-implemented here.

## Files
- `index.html` — the interactive homepage. Open it directly; it loads `styles.css`,
  the compiled `_ds_bundle.js`, then the section files below.
- `sections.jsx` — stateless display sections: `Nav`, `Hero`, `Services`,
  `SystemLayers`, `Delivery`, `SiteFooter`. Exported on `window`.
- `Intake.jsx` — the one stateful section: the project-intake form (`Intake`),
  with local-only submit feedback.

## Composition
| Section | Built from |
|---|---|
| Nav | `BrandMark`, `Button` (ghost sm) |
| Hero | `Eyebrow`, `StatBlock` ×4, `Button` |
| Services | `SectionHeading`, `ServiceCard` ×3 in a hairline-ruled grid |
| System Layers | inverted dark block: `SectionHeading tone="dark"`, `CapabilityRow` ×6 |
| Delivery | `SectionHeading`, `StepCard` ×4 |
| Intake | `Eyebrow`, `Field` (input/select/textarea), `Button` |
| Footer | `BrandMark` |

## Notes
- Copy is the real Chinese marketing text from the `person-web/` codebase.
- The form is cosmetic (local validation + a confirmation line); wire to a real
  endpoint for production.
- This is a recreation of the agreed redesign, not the original dark/purple site —
  see `assets/screens/` for the original references.
