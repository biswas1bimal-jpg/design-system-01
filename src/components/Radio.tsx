import type { InputHTMLAttributes, ReactNode } from 'react';
import './Radio.css';

// Mirrors the Figma "Radio" component: Selected (inverse ring + filled dot) and
// Unselected (default ring). Native radio drives grouping + a11y.

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Optional label to the right of the control. */
  label?: ReactNode;
}

export function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label className={['ds-radio', className].filter(Boolean).join(' ')}>
      <input type="radio" className="ds-radio__input" {...rest} />
      <span className="ds-radio__ring" aria-hidden="true" />
      {label != null && <span className="ds-radio__label text-body-small">{label}</span>}
    </label>
  );
}
