import StyleDictionary from 'style-dictionary';

// Style Dictionary v5 reads DTCG ($value/$type) when usesDtcg: true.
// outputReferences: true keeps var() aliases so themes stay dynamic.

const PRIMITIVES = 'tokens/primitives.tokens.json';

// ---- LIGHT: primitives + light semantics -> :root, plus TS types ----
const light = new StyleDictionary({
  source: [PRIMITIVES, 'tokens/semantic.light.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      usesDtcg: true,
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
      usesDtcg: true,
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6'
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    }
  }
});

// ---- DARK: primitives + dark semantics -> [data-theme="dark"] ----
const dark = new StyleDictionary({
  source: [PRIMITIVES, 'tokens/semantic.dark.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      usesDtcg: true,
      files: [
        {
          destination: 'variables.dark.css',
          format: 'css/variables',
          options: { outputReferences: true, selector: '[data-theme="dark"]' }
        }
      ]
    }
  }
});

await light.buildAllPlatforms();
await dark.buildAllPlatforms();

console.log('✅ Tokens built: build/css/variables.light.css, variables.dark.css, build/ts/tokens.ts');
