import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

// Reference component pattern for this design system (see CLAUDE.md):
// one file, typed props, a named export, and styling built ONLY from tokens —
// so it works in light and dark with no extra code. Never put a raw hex/px or a
// var(--color-*) primitive here; if a value is missing, add it in Figma and
// re-export instead of inventing a literal.

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Defaults to "primary". */
  variant?: Variant;
  /** Control size. Defaults to "md". */
  size?: Size;
  /** Stretch to the full width of the parent (use on mobile / stacked layouts). */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    fullWidth && 'ds-button--full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {leadingIcon && (
        <span className="ds-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children != null && <span className="ds-button__label">{children}</span>}
      {trailingIcon && (
        <span className="ds-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
