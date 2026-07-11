import { useState } from 'react';
import { Button, type ButtonVariant } from './components/Button';
import { IconButton } from './components/IconButton';

// Search icon — stroke-based, uses currentColor so it inherits the button's
// text color (mirrors the Figma "Interface / Search_Magnifying_Glass" icon).
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'glass', 'primary-dark'];

export function App() {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        background: 'var(--background-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'system-ui, sans-serif'
      }}
    >
      <header style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>Button demo</h1>
        <Button variant="secondary" onClick={toggle}>
          {dark ? 'Light theme' : 'Dark theme'}
        </Button>
      </header>

      {/* Every variant at md */}
      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} leadingIcon={<SearchIcon />}>
            {v}
          </Button>
        ))}
      </section>

      {/* Sizes */}
      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button size="sm" trailingIcon={<SearchIcon />}>Small</Button>
        <Button size="md" trailingIcon={<SearchIcon />}>Medium</Button>
        <Button size="lg" trailingIcon={<SearchIcon />}>Large</Button>
        <Button disabled>Disabled</Button>
      </section>

      {/* Icon buttons */}
      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        {VARIANTS.map((v) => (
          <IconButton key={v} variant={v} size="md" aria-label={`Search (${v})`}>
            <SearchIcon />
          </IconButton>
        ))}
      </section>

      {/* Full width */}
      <section>
        <Button variant="primary" fullWidth leadingIcon={<SearchIcon />}>
          Full width
        </Button>
      </section>

      {/* Glass reads best over a colored backdrop */}
      <section
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-2xl)',
          background: 'linear-gradient(135deg, #2563eb, #8b3df5)'
        }}
      >
        <Button variant="glass" leadingIcon={<SearchIcon />}>Glass</Button>
        <IconButton variant="glass" size="md" aria-label="Search">
          <SearchIcon />
        </IconButton>
      </section>

      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
        Toggle the theme — colors flip from the tokens alone. Secondary and primary-dark
        become outlined (transparent + inverse border) in dark.
      </p>
    </main>
  );
}
