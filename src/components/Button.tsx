import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

// Reference component pattern for this design system (see CLAUDE.md):
// one file, typed props, a named export, and styling built ONLY from semantic
// tokens — so it works in light and dark with no extra code. Never put a raw
// hex/px or a var(--color-*)/var(--palette-*) primitive here; if a value is
// missing, add it in Figma and re-export instead of inventing a literal.

type Variant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Defaults to "primary". */
  variant?: Variant;
}

export function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  const classes = ['ds-button', `ds-button--${variant}`, className]
    .filter(Boolean)
    .join(' ');
  return <button className={classes} {...rest} />;
}
