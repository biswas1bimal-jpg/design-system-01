# Design system — rules for Claude

This repository is the code side of a Figma-driven design system.
**Figma is the source of truth for tokens.** The files in `tokens/` are exported
from Figma Variables in W3C DTCG format and must not be hand-edited to "fix" a value —
fix it in Figma and re-export.

## Token architecture (3 tiers)
1. **Primitives** (`tokens/primitives.tokens.json`) — raw values: `palette.*`, `size.space.*`,
   `size.radius.*`, `font.*`. Never reference these directly in components.
2. **Semantic** (`tokens/semantic.*.tokens.json`) — intent-based aliases: `color.bg.*`,
   `color.text.*`, `color.action.*`, `color.border.*`, `space.*`, `radius.*`, `typography.*`.
   **Components use ONLY these.**
3. **Component tokens** — add these later under a `component.*` group if a component needs
   its own knobs (e.g. `component.button.bg`). Optional for now.

## Modes (light / dark)
- Light values live in `semantic.light.tokens.json`, dark in `semantic.dark.tokens.json`.
- The build emits one `build/tokens.css`: `:root` = light, `[data-theme="dark"]` = dark overrides.
- To switch themes, set `data-theme="dark"` on `<html>` (or any ancestor). Never hardcode a
  second color for dark — add/adjust the token instead.

## How to consume tokens in React
- Import the CSS once at the app root: `import "../build/tokens.css";`
- Reference variables via CSS: `background: var(--color-action-primary)`.
- Or use the typed map: `import { tokens } from "../build/tokens.ts"` then
  `style={{ color: tokens.colorTextDefault }}`. `TokenName` is a union of all valid tokens.

## Hard rules when generating or editing code
- ✅ Use semantic tokens: `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--font-*)`.
- ❌ Never write raw hex, px, or `var(--palette-*)` inside a component.
- ❌ Never introduce a new color/size literal. If one is missing, tell me to add it in Figma.
- ✅ Every component must work in both light and dark with no extra code (tokens handle it).
- ✅ New components go in `src/components/`, one file each, typed props, a default export-free
  named export. Follow `src/components/Button.tsx` as the reference pattern.

## Build
- `npm run build` regenerates `build/tokens.css` and `build/tokens.ts` from `tokens/`.
- In this repo the build also runs automatically in GitHub Actions on every token change,
  so `build/` is always current on the main branch.

## Working with Figma (MCP)
- When I paste a Figma frame/selection link, read it via the Figma MCP tools and map every
  visual property to an existing semantic token. If a value has no matching token, list the
  gaps instead of inventing a literal.
- Prefer components that already exist in `src/components/` over generating new markup.
