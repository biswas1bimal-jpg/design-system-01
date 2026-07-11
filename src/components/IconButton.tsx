import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './IconButton.css';

// Icon-only button. Same variants/sizes as Button, but square and label-less,
// so it needs an explicit aria-label for accessibility. Styling is token-only
// (see CLAUDE.md): color from semantic tokens, sizing from space/icon-size.

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual emphasis. Defaults to "primary". */
  variant?: Variant;
  /** Control size. Defaults to "md". */
  size?: Size;
  /** The icon to render, centered. */
  icon: ReactNode;
  /** Required: describes the action for screen readers (there is no visible label). */
  'aria-label': string;
}

export function IconButton({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  ...rest
}: IconButtonProps) {
  const classes = [
    'ds-icon-button',
    `ds-icon-button--${variant}`,
    `ds-icon-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      <span className="ds-icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
