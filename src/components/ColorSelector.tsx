import './ColorSelector.css';

// Mirrors the Figma "Color Swatch" / "Color Selector": a row of round color
// samples with a selected state (inverse ring), plus an optional label.

export interface ColorSwatchProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  title?: string;
}

export function ColorSwatch({ color, selected, onClick, title }: ColorSwatchProps) {
  return (
    <button
      type="button"
      className={['ds-swatch', selected && 'ds-swatch--selected'].filter(Boolean).join(' ')}
      style={{ ['--swatch' as string]: color }}
      aria-pressed={selected}
      aria-label={title ?? color}
      title={title}
      onClick={onClick}
    />
  );
}

export interface ColorSelectorProps {
  label?: string;
  colors: { value: string; name?: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function ColorSelector({ label, colors, value, onChange }: ColorSelectorProps) {
  return (
    <div className="ds-color-selector">
      {label != null && <span className="ds-color-selector__label text-label">{label}</span>}
      <div className="ds-color-selector__row">
        {colors.map((c) => (
          <ColorSwatch key={c.value} color={c.value} title={c.name} selected={c.value === value} onClick={() => onChange(c.value)} />
        ))}
      </div>
    </div>
  );
}
