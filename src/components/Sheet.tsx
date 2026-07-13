import type { ReactNode } from 'react';
import './Sheet.css';

// Mirrors the Figma "Sheet - iPhone": a bottom sheet surface with a grab
// handle and Medium / Large detents. Holds arbitrary content.

export interface SheetProps {
  title?: ReactNode;
  detent?: 'medium' | 'large';
  children?: ReactNode;
}

export function Sheet({ title, detent = 'medium', children }: SheetProps) {
  return (
    <div className={`ds-sheet ds-sheet--${detent}`}>
      <div className="ds-sheet__grabber" aria-hidden="true" />
      {title != null && <div className="ds-sheet__title text-heading-h3">{title}</div>}
      <div className="ds-sheet__content">{children}</div>
    </div>
  );
}
