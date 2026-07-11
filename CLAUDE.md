# Design system — rules for Claude

This repository is the code side of a Figma-driven design system.
**Figma is the source of truth for tokens.** The files in `tokens/` are exported
from the Figma **"Design Tokens"** plugin and must not be hand-edited to "fix" a value —
fix it in Figma and re-export. (Format is the plugin's legacy `value`/`type`, not
DTCG `$value`/`$type`.)

## Token architecture (2 tiers today)
1. **Primitives** — raw values. Never reference these directly for color in a component.
   - `tokens/primitives.json`: `color.*` (e.g. `color.neutral.0`, `color.blue.600`),
     `space.*`, `radius.*`, `font.size.*`.
   - `tokens/icon.json`: `icon.size.*` (sm/md/lg/xl).
2. **Semantic** (`tokens/semantic.json`) — intent-based aliases that point at primitives:
   `background.*` (primary/secondary/brand), `text.*` (primary/secondary/on-brand),
   `border.*` (default), `interactive.*` (primary/hover). **Use these for color in components.**
3. **Component tokens** — optional, add later under a `component.*` group if a component
   needs its own knobs (e.g. `component.button.bg`).

## Modes (light / dark)
- `tokens/semantic.json` holds both modes under top-level `light` and `dark` groups.
- The build emits two files under `build/css/`:
  - `variables.light.css` → `:root` (primitives + light semantic),
  - `variables.dark.css` → `[data-theme="dark"]` (only the dark semantic overrides).
- The CSS variable name is identical in both, so dark overrides light automatically.
- To switch themes, set `data-theme="dark"` on `<html>` (or any ancestor). Never hardcode a
  second color for dark — add/adjust the token in Figma instead.

## Token names in code
- **Colors (semantic):** `--background-primary`, `--background-secondary`, `--background-brand`,
  `--text-primary`, `--text-secondary`, `--text-on-brand`, `--border-default`,
  `--interactive-primary`, `--interactive-hover`.
- **Sizes (primitives, used directly):** `--space-*`, `--radius-*`, `--font-size-*`, `--icon-size-*`
  (these already include `px` in CSS, e.g. `--space-4: 16px`).
- **Color primitives** (`--color-*`) exist in `:root` but are for semantic tokens to reference —
  do not use them directly in a component.

## How to consume tokens in React
- Import the CSS once at the app root:
  `import "../build/css/variables.light.css";` and `import "../build/css/variables.dark.css";`
- Reference variables via CSS: `background: var(--interactive-primary)`.
- Or use the typed map: `import { InteractivePrimary } from "../build/ts/tokens";`
  (names are PascalCase, e.g. `BackgroundPrimary`, `TextOnBrand`, `Space4`, `IconSizeMd`).

## Hard rules when generating or editing code
- ✅ Color from semantic tokens only: `var(--background-*)`, `var(--text-*)`, `var(--border-*)`,
  `var(--interactive-*)`.
- ✅ Sizing from the size tokens: `var(--space-*)`, `var(--radius-*)`, `var(--font-size-*)`,
  `var(--icon-size-*)`.
- ❌ Never write a raw hex or px inside a component, and never use a `--color-*` primitive for color.
- ❌ Never introduce a new color/size literal. If one is missing, tell me to add it in Figma.
- ✅ Every component must work in both light and dark with no extra code (tokens handle it).
- ✅ New components go in `src/components/`, one file each, typed props, a named export (no default).
  Follow `src/components/Button.tsx` as the reference pattern.

## Build
- `npm run build` regenerates `build/css/*` and `build/ts/*` from `tokens/`.
- CI (`.github/workflows/build-tokens.yml`) rebuilds and commits `build/` automatically on every
  push to `main` that touches `tokens/`, so `build/` is always current on the main branch.
- Demo app: `npm run dev` (local) / `npm run build:app` (production build of `src/`).

## Working with Figma
- Preferred: paste a Figma frame/selection link and, if the Figma MCP is connected, I read it and
  map every visual property to an existing semantic token. If a value has no matching token, I list
  the gaps instead of inventing a literal.
- Fallback (browser-only): export variables with the "Design Tokens" plugin and drop the JSON into
  `tokens/`; CI rebuilds. Use this when the Figma MCP isn't available in the session.
- Prefer components that already exist in `src/components/` over generating new markup.
