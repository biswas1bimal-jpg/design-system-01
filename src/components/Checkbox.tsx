import type { InputHTMLAttributes, ReactNode } from 'react';
import { CheckIcon } from './icons';
import './Checkbox.css';

// Mirrors the Figma "Checkbox": blue and black tones, off / on / disabled.
// The native input drives state + a11y; the visual box is a styled sibling.

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Tone of the checked state. Defaults to "blue". */
  tone?: 'blue' | 'black';
  /** Optional label to the right of the box. */
  label?: ReactNode;
}

export function Checkbox({ tone = 'blue', label, className, ...rest }: CheckboxProps) {
  return (
    <label className={['ds-check', `ds-check--${tone}`, className].filter(Boolean).join(' ')}>
      <input type="checkbox" className="ds-check__input" {...rest} />
      <span className="ds-check__box" aria-hidden="true">
        <CheckIcon className="ds-check__mark" />
      </span>
      {label != null && <span className="ds-check__label text-body-small">{label}</span>}
    </label>
  );
}
