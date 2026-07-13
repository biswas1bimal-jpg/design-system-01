import { useState } from 'react';
import { Button, type ButtonVariant } from './components/Button';
import { IconButton } from './components/IconButton';
import { Input } from './components/Input';
import { Card } from './components/Card';
import { Checkbox } from './components/Checkbox';
import { Radio } from './components/Radio';
import { Badge } from './components/Badge';
import { Toast } from './components/Toast';
import { Tabs } from './components/Tabs';
import { Avatar } from './components/Avatar';
import { QuantityStepper } from './components/QuantityStepper';
import { MenuItem } from './components/MenuItem';
import { DropdownMenu, MenuDivider } from './components/DropdownMenu';
import { ProgressStepper } from './components/ProgressStepper';
import { ProductCard } from './components/ProductCard';
import { ProductThumb } from './components/ProductThumb';
import { ProductListRow } from './components/ProductListRow';
import { ProductHeader } from './components/ProductHeader';
import { LookPreview } from './components/LookPreview';
import { SpecTable } from './components/SpecTable';
import { SearchIcon, BellIcon } from './components/icons';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'glass', 'primary-dark'];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <h2 className="text-heading-h4" style={{ margin: 0, color: 'var(--text-primary)' }}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
        {children}
      </div>
    </section>
  );
}

export function App() {
  const [dark, setDark] = useState(false);
  const [checked, setChecked] = useState(true);
  const [picked, setPicked] = useState('courier');
  const [tab, setTab] = useState('details');
  const [qty, setQty] = useState(2);

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
        gap: 'var(--space-8)',
        background: 'var(--background-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-family-base)'
      }}
    >
      <header style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
        <h1 className="text-heading-h1" style={{ margin: 0 }}>Component gallery</h1>
        <Button variant="secondary" onClick={toggle}>{dark ? 'Light theme' : 'Dark theme'}</Button>
      </header>

      <Section title="Button">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} leadingIcon={<SearchIcon />}>{v}</Button>
        ))}
        <Button variant="success">success</Button>
        <Button variant="warning">warning</Button>
        <Button variant="error">error</Button>
        <Button disabled>disabled</Button>
      </Section>

      <Section title="Button · sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="IconButton">
        {VARIANTS.map((v) => (
          <IconButton key={v} variant={v} size="md" aria-label={`Search (${v})`}><SearchIcon /></IconButton>
        ))}
      </Section>

      <Section title="Input">
        <Input size="sm" placeholder="Small" />
        <Input size="md" label="E-mail" placeholder="you@studio.com" leadingIcon={<SearchIcon />} />
        <Input size="lg" placeholder="Large" />
        <Input size="md" label="Password" defaultValue="hunter2" error="Too short — min 8 characters" />
      </Section>

      <Section title="Card">
        <Card title="Card title" style={{ maxWidth: 280 }}>
          Supporting text that describes the card content in a sentence or two.
        </Card>
      </Section>

      <Section title="Checkbox & Radio">
        <Checkbox tone="blue" label="Blue" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <Checkbox tone="black" label="Black" defaultChecked />
        <Checkbox label="Off" />
        <Checkbox label="Disabled" disabled />
        <Radio name="ship" value="courier" label="Courier" checked={picked === 'courier'} onChange={() => setPicked('courier')} />
        <Radio name="ship" value="pickup" label="Pickup" checked={picked === 'pickup'} onChange={() => setPicked('pickup')} />
      </Section>

      <Section title="Badge · status">
        <Badge status="neutral">Neutral</Badge>
        <Badge status="info">Info</Badge>
        <Badge status="success">Success</Badge>
        <Badge status="warning">Warning</Badge>
        <Badge status="error">Error</Badge>
      </Section>

      <Section title="Toast">
        <Toast status="success" title="Successful toast" text="It's a green notification state" onDismiss={() => {}} />
        <Toast status="warning" title="Warning toast" text="It's an orange notification state" onDismiss={() => {}} />
        <Toast status="error" title="Error toast" text="It's a red notification state" onDismiss={() => {}} />
      </Section>

      <Section title="Tabs">
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'details', label: 'Details' },
            { value: 'reviews', label: 'Reviews' },
            { value: 'care', label: 'Care' }
          ]}
        />
      </Section>

      <Section title="Avatar">
        <Avatar />
        <Avatar initial="M" />
        <Avatar initial="K" selected />
      </Section>

      <Section title="Quantity Stepper">
        <QuantityStepper value={qty} onChange={setQty} min={0} max={9} />
        <QuantityStepper value={qty} onChange={setQty} min={0} max={9} size="sm" />
      </Section>

      <Section title="Menu & Dropdown">
        <DropdownMenu>
          <MenuItem icon={<SearchIcon />} label="New look" />
          <MenuItem icon={<BellIcon />} label="Save to pattern" />
          <MenuDivider />
          <MenuItem label="Delete look" />
        </DropdownMenu>
      </Section>

      <Section title="Progress Stepper">
        <ProgressStepper
          title="Creating your avatar…"
          progress={0.64}
          steps={[
            { state: 'done', label: 'Photos analysed' },
            { state: 'done', label: 'Body shape estimated' },
            { state: 'active', label: 'Building 3D avatar…' },
            { state: 'pending', label: 'Final render' }
          ]}
        />
      </Section>

      <Section title="Product Card">
        <ProductCard title="Knit sweater" price="21.00 €" />
        <ProductCard title="Knit sweater" price="21.00 €" oldPrice="28.00 €" />
        <ProductCard size="sm" title="Knit sweater" price="21.00 €" />
      </Section>

      <Section title="Product Thumb">
        <ProductThumb title="Sweater" price="21.00 €" />
        <ProductThumb title="Sweater" price="21.00 €" detected />
        <ProductThumb title="Sweater" price="21.00 €" selected />
      </Section>

      <Section title="Product List Row & Header">
        <ProductListRow title="Knit sweater" subtitle="Wool blend · size M" price="21.00 €" />
        <ProductHeader name="Knit sweater" price="21.00 €" rating={4} reviews={128} />
      </Section>

      <Section title="Look Preview">
        <LookPreview title="Summer · current" meta="3 items · 27.40 €" />
      </Section>

      <Section title="Spec Table">
        <SpecTable
          rows={[
            { label: 'Material', value: '80% wool, 20% nylon' },
            { label: 'Fit', value: 'Regular' },
            { label: 'Care', value: 'Hand wash' },
            { label: 'Origin', value: 'Portugal' }
          ]}
        />
      </Section>
    </main>
  );
}
