import { Radio } from './Radio';
import './OrderOptionRow.css';

// Mirrors the Figma "Order Option Row": a Radio + label with trailing meta
// (e.g. delivery / payment options). Reuses the Radio component.

export interface OrderOptionRowProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  meta?: string;
}

export function OrderOptionRow({ name, value, checked, onChange, label, meta }: OrderOptionRowProps) {
  return (
    <div className="ds-order-option">
      <Radio name={name} value={value} checked={checked} onChange={() => onChange(value)} label={label} />
      {meta != null && <span className="ds-order-option__meta text-body-small">{meta}</span>}
    </div>
  );
}
