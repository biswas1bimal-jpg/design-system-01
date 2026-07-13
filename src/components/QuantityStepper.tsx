import './QuantityStepper.css';

// Mirrors the Figma "Quantity Stepper": − / value / +, pill container.

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, onChange, min = 0, max = Infinity, size = 'md' }: QuantityStepperProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className={`ds-qty ds-qty--${size}`}>
      <button type="button" className="ds-qty__btn" aria-label="Decrease" disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M5 12h14" /></svg>
      </button>
      <span className="ds-qty__value" aria-live="polite">{value}</span>
      <button type="button" className="ds-qty__btn" aria-label="Increase" disabled={value >= max} onClick={() => onChange(clamp(value + 1))}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}
