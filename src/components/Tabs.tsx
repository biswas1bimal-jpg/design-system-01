import './Tabs.css';

// Mirrors the Figma "Tab" set: active tab underlined with border/inverse, the
// rest in text/secondary. Label uses the Geist Label/Large style (Medium 16).

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={['ds-tabs', className].filter(Boolean).join(' ')} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={t.value === value}
          className={['ds-tabs__tab', 'text-label-large', t.value === value && 'ds-tabs__tab--active']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
