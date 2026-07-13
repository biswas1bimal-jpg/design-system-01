# Design system — rules for Claude

This repository is the code side of a Figma-driven design system.
**Figma is the primary source of truth for tokens**, but `tokens/` may be edited
directly in code when convenient — either re-export from the Figma **"Design Tokens"**
plugin, or hand-edit the JSON to match Figma. Keep code and Figma in sync either way.
(Format is the plugin's legacy `value`/`type`, not DTCG `$value`/`$type`.)

## Token architecture (2 tiers today)
1. **Primitives** — raw values. Never reference these directly for color in a component.
   - `tokens/primitives.json`: `color.*` (e.g. `color.neutral.0`, `color.blue.600`,
     status ramps `color.red/green/amber.500/600`, `color.border.*` overlay hairlines),
     `space.*`, `radius.*`, `font.size.*`, `weight.*` (border widths).
   - `tokens/icon.json`: `icon.size.*` (sm/md/lg/xl).
2. **Semantic** (`tokens/semantic.json`) — intent-based aliases that point at primitives.
   **Use these for color in components.** Groups:
   - `background.*` — primary/secondary/brand/brand-dark/brand-dark-hover/ghost-hover/inverse/glass
   - `text.*` — primary/secondary/on-brand/inverse/placeholder/error
   - `border.*` — default (a visible grey, `neutral.500` in light) / subtle / inverse / brand-dark
   - `interactive.*` — primary/hover **+ success/warning/error (each with a `-hover`)**
   - `status.*` — neutral/info/success/warning/error (for badges, toasts, inline status)
3. **Typography** (`tokens/typography.json`) — the Geist text styles (mirror of Figma's
   "Typography — Geist" local text styles). See the Typography section below.
4. **Component tokens** — optional, add later under a `component.*` group if a component
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
- **Colors (semantic):** `--background-*` (primary/secondary/brand/brand-dark/brand-dark-hover/
  ghost-hover/inverse/glass), `--text-*` (primary/secondary/on-brand/inverse/placeholder/error),
  `--border-*` (default/subtle/inverse/brand-dark), `--interactive-*` (primary/hover and
  success/warning/error each with `-hover`), `--status-*` (neutral/info/success/warning/error).
- **Sizes (primitives, used directly):** `--space-*`, `--radius-*`, `--font-size-*`, `--icon-size-*`,
  `--weight-border-*` (these already include `px` in CSS, e.g. `--space-4: 16px`).
- **Color primitives** (`--color-*`) exist in `:root` but are for semantic tokens to reference —
  do not use them directly in a component.

## Typography (Geist)
- Source: Figma local text styles **"Typography — Geist"**, mirrored in `tokens/typography.json`.
  Weights: Geist Regular 400 / Medium 500 / SemiBold 600 / Bold 700.
- The build emits two artifacts (not through Style Dictionary — these are composite styles):
  - `build/css/typography.css` — `--font-family-base` plus a utility class per style:
    `.text-display`, `.text-heading-h1…h5`, `.text-body-large/default/small`,
    `.text-label`, `.text-label-large`, `.text-label-xl`, `.text-caption`,
    `.text-extra-small`, `.text-strong-sm/md/lg`.
  - `build/ts/typography.ts` — a typed `Typography` map (PascalCase keys, e.g.
    `Typography.HeadingH3`, `Typography.BodySmall`) usable as a React `style={...}`.
- **Use a text style for every piece of text** — never hand-set font-size/weight ad hoc.
  Import `build/css/typography.css` once at the app root (already done in `src/main.tsx`).
  Add a new style to `tokens/typography.json` (and mirror it in Figma) if none fits.

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
- ✅ Prefer semantic tokens over raw hex/px, and avoid `--color-*` primitives for color in a component.
- ✅ If a token is missing, add it to `tokens/` (and mirror it in Figma when possible); raw literals
  are acceptable only for values intentionally not tokenized (e.g. the glass translucency).
- ✅ Every component must work in both light and dark with no extra code (tokens handle it).
- ✅ New components go in `src/components/`, one file each, typed props, a named export (no default).
  Follow `src/components/Button.tsx` as the reference pattern.

## Build
- `npm run build` regenerates `build/css/*` and `build/ts/*` from `tokens/` — token CSS vars,
  the TS token map, **and** `typography.css` / `typography.ts` (from `tokens/typography.json`).
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
