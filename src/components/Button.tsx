import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './surface.css';
import './Button.css';

// Reference component for this design system (see CLAUDE.md): one file, typed
// props, a named export, styling built from semantic tokens so light/dark come
// for free. Mirrors the Figma "Button" component set — Variant × Size × Width,
// plus optional leading/trailing icon slots. Figma's "State" axis maps to native
// CSS here: Hover is `:hover`, Disabled is the native `disabled` attribute.

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'glass'
  | 'primary-dark';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Control height / padding / font / icon size. Defaults to "md". */
  size?: ButtonSize;
  /** Stretch to the parent's width (for mobile). Defaults to false. */
  fullWidth?: boolean;
  /** Icon rendered before the label. Inherits the button's text color (currentColor). */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. Inherits the button's text color (currentColor). */
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
    'ds-surface',
    `ds-surface--${variant}`,
    `ds-button--${size}`,
    fullWidth && 'ds-button--full',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {leadingIcon != null && (
        <span className="ds-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children != null && <span className="ds-button__label">{children}</span>}
      {trailingIcon != null && (
        <span className="ds-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
