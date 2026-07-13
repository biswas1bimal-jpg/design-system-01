import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.css';

// Inline status pill built on the status/* tokens: soft tint background + the
// solid status color for text and dot. neutral / info / success / warning / error.

export type BadgeStatus = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic status. Defaults to "neutral". */
  status?: BadgeStatus;
  /** Show the leading dot. Defaults to true. */
  dot?: boolean;
  children?: ReactNode;
}

export function Badge({ status = 'neutral', dot = true, children, className, ...rest }: BadgeProps) {
  return (
    <span className={['ds-badge', `ds-badge--${status}`, className].filter(Boolean).join(' ')} {...rest}>
      {dot && <span className="ds-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
