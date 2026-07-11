import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './surface.css';
import './IconButton.css';

// Square, icon-only button. Mirrors the Figma "IconButton" component set
// (Variant × Size). Shares the variant surface styles with Button, so colors
// and light/dark behavior stay identical. Always pass an accessible label via
// `aria-label`, since there is no visible text.

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'glass'
  | 'primary-dark';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Defaults to "primary". */
  variant?: IconButtonVariant;
  /** Square size (32/40/48). Defaults to "md". */
  size?: IconButtonSize;
  /** The icon. Inherits the button's color (currentColor). */
  children: ReactNode;
  /** Required for accessibility — the button has no visible label. */
  'aria-label': string;
}

export function IconButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: IconButtonProps) {
  const classes = [
    'ds-icon-button',
    'ds-surface',
    `ds-surface--${variant}`,
    `ds-icon-button--${size}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      <span className="ds-icon-button__icon" aria-hidden="true">
        {children}
      </span>
    </button>
  );
}
