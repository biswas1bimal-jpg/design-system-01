import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Input.css';

// Mirrors the Figma "Input" component set: Size SM·MD·LG·XL, an optional label
// and leading icon, plus default / focus / error / disabled states. Colors and
// sizing come from semantic + primitive tokens, so light/dark are automatic.

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Control height / padding / font. Defaults to "md". */
  size?: InputSize;
  /** Optional label rendered above the field. */
  label?: string;
  /** Icon rendered before the text (inherits text color). */
  leadingIcon?: ReactNode;
  /** Error message; also switches the field to the error style. */
  error?: string;
}

export function Input({ size = 'md', label, leadingIcon, error, className, id, ...rest }: InputProps) {
  const generated = useId();
  const inputId = id ?? generated;

  return (
    <div className={['ds-field', className].filter(Boolean).join(' ')}>
      {label != null && (
        <label className="ds-field__label text-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={['ds-input', `ds-input--${size}`, error != null && 'ds-input--error'].filter(Boolean).join(' ')}>
        {leadingIcon != null && (
          <span className="ds-input__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input id={inputId} className="ds-input__control" aria-invalid={error != null} {...rest} />
      </div>
      {error != null && <span className="ds-field__error text-caption">{error}</span>}
    </div>
  );
}
