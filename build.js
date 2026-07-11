import StyleDictionary from 'style-dictionary';
import { readFileSync } from 'node:fs';

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
  tokens: { ...primitives, ...semantic.light },
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
  tokens: { ...primitives, ...semantic.dark },
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

console.log('✅ Tokens built: build/css/variables.light.css, variables.dark.css, build/ts/tokens.ts');
