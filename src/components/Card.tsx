import type { HTMLAttributes, ReactNode } from 'react';
import './Card.css';

// Mirrors the Figma "Card": bordered container with a Heading/H3 title and a
// Body/Small description. Title uses the Geist text style via typography.css.

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card title (Heading/H3). */
  title?: ReactNode;
  /** Body content (Body/Small). */
  children?: ReactNode;
}

export function Card({ title, children, className, ...rest }: CardProps) {
  return (
    <div className={['ds-card', className].filter(Boolean).join(' ')} {...rest}>
      {title != null && <div className="ds-card__title text-heading-h3">{title}</div>}
      {children != null && <div className="ds-card__body text-body-small">{children}</div>}
    </div>
  );
}
