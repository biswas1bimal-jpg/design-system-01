import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

// Tokens are exported from the Figma "Design Tokens" plugin into tokens/.
// That plugin writes the LEGACY format (value/type, NOT DTCG $value/$type),
// keeps every primitive in primitives.json, and both modes in a single
// semantic.json under top-level "light" and "dark" groups.
//
// So this build:
//   - leaves usesDtcg OFF (default) to read value/type;
//   - merges primitives + one mode per run, so {color.*} references resolve
//     and the "light"/"dark" segment never leaks into the CSS variable name
//     (the var name must be identical in :root and [data-theme="dark"] for the
//     dark values to override the light ones).

const primitives = JSON.parse(readFileSync('tokens/primitives.json', 'utf8'));
const icon = JSON.parse(readFileSync('tokens/icon.json', 'utf8'));
const semantic = JSON.parse(readFileSync('tokens/semantic.json', 'utf8'));

// The plugin tags every token with prefix: "primitives" | "semantic".
const isSemantic = (token) => token.prefix === 'semantic';

// The plugin marks sizes/spacing/radii/font-sizes as type "number", so they
// export unitless (16, not 16px) — invalid for `padding: var(--space-4)`.
// Append px in CSS only. The TS map keeps raw numbers (React adds px itself).
StyleDictionary.registerTransform({
  name: 'dimension/px',
  type: 'value',
  filter: (token) => token.type === 'number',
  transform: (token) => `${token.value}px`
});
StyleDictionary.registerTransformGroup({
  name: 'css-px',
  transforms: [...StyleDictionary.hooks.transformGroups.css, 'dimension/px']
});

// ---- LIGHT: primitives + light semantics -> :root, plus TS types ----
const light = new StyleDictionary({
  tokens: { ...primitives, ...icon, ...semantic.light },
  platforms: {
    css: {
      transformGroup: 'css-px',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.light.css',
          format: 'css/variables',
          options: { outputReferences: true, selector: ':root' }
        }
      ]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'build/ts/',
      files: [
        { destination: 'tokens.ts', format: 'javascript/es6' },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' }
      ]
    }
  }
});

// ---- DARK: only the dark semantic overrides -> [data-theme="dark"] ----
// primitives are merged in only so {color.*} references resolve; they are
// filtered out of the output. outputReferences is forced on so each override
// is emitted as var(--color-*), resolving against the primitives in :root.
const dark = new StyleDictionary({
  tokens: { ...primitives, ...icon, ...semantic.dark },
  platforms: {
    css: {
      transformGroup: 'css-px',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.dark.css',
          format: 'css/variables',
          filter: isSemantic,
          options: { outputReferences: () => true, selector: '[data-theme="dark"]' }
        }
      ]
    }
  }
});

await light.buildAllPlatforms();
await dark.buildAllPlatforms();

// ---- TYPOGRAPHY ----------------------------------------------------------
// The Geist type styles (mirrored from Figma's "Typography — Geist" text
// styles) are composite — family + weight + size + line-height together — which
// the legacy Style Dictionary color/number pipeline can't express as a single
// variable. So we emit them directly: a `.text-*` utility class per style plus
// a typed CSS-in-JS map. Consume the class in CSS (`class="text-heading-h3"`)
// or the map in React (`style={Typography.HeadingH3}`).
const typography = JSON.parse(readFileSync('tokens/typography.json', 'utf8'));
const family = typography.fontFamily;
const styles = typography.styles;

const pascal = (k) => k.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');

let css = `/* AUTO-GENERATED from tokens/typography.json — do not edit by hand. */\n`;
css += `:root {\n  --font-family-base: ${family};\n}\n\n`;
for (const [name, s] of Object.entries(styles)) {
  css += `.text-${name} {\n`;
  css += `  font-family: var(--font-family-base);\n`;
  css += `  font-weight: ${s.weight};\n`;
  css += `  font-size: ${s.size}px;\n`;
  css += `  line-height: ${s.lineHeight};\n`;
  css += `}\n`;
}

let ts = `/* AUTO-GENERATED from tokens/typography.json — do not edit by hand. */\n`;
ts += `import type { CSSProperties } from 'react';\n\n`;
ts += `export const FontFamilyBase = ${JSON.stringify(family)};\n\n`;
ts += `export const Typography = {\n`;
for (const [name, s] of Object.entries(styles)) {
  ts += `  ${pascal(name)}: { fontFamily: FontFamilyBase, fontWeight: ${s.weight}, fontSize: ${s.size}, lineHeight: ${s.lineHeight} },\n`;
}
ts += `} satisfies Record<string, CSSProperties>;\n\n`;
ts += `export type TypographyStyle = keyof typeof Typography;\n`;

mkdirSync('build/css', { recursive: true });
mkdirSync('build/ts', { recursive: true });
writeFileSync('build/css/typography.css', css);
writeFileSync('build/ts/typography.ts', ts);

console.log('✅ Tokens built: build/css/variables.light.css, variables.dark.css, build/css/typography.css, build/ts/tokens.ts, build/ts/typography.ts');
