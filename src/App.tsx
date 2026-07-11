import { useState } from 'react';
import { Button } from './components/Button';

// Minimal demo: renders the reference Button and toggles data-theme on <html>,
// so you can see the same tokens drive both light and dark with no extra code.
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
        <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>Token demo</h1>
        <Button variant="secondary" onClick={toggle}>
          {dark ? 'Light theme' : 'Dark theme'}
        </Button>
      </header>

      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </section>

      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
        Toggle the theme — every color flips from the tokens alone.
      </p>
    </main>
  );
}
