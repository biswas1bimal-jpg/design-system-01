import type { ReactNode } from 'react';
import './SpecTable.css';

// Mirrors the Figma "Spec Table" / "Spec Row": key/value rows separated by
// hairlines (the Details tab content). Both text cells use Body/Small.

export interface SpecRowProps {
  label: ReactNode;
  value: ReactNode;
}

export function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="ds-spec-row">
      <span className="ds-spec-row__label text-body-small">{label}</span>
      <span className="ds-spec-row__value text-body-small">{value}</span>
    </div>
  );
}

export interface SpecTableProps {
  rows: { label: ReactNode; value: ReactNode }[];
}

export function SpecTable({ rows }: SpecTableProps) {
  return (
    <div className="ds-spec-table">
      {rows.map((r, i) => (
        <SpecRow key={i} label={r.label} value={r.value} />
      ))}
    </div>
  );
}
