import type { ReactNode } from 'react';
import './SuggestionSheet.css';

// Mirrors the Figma "Suggestion Sheet": a sheet with a bold title, a supporting
// line, and a horizontal strip of suggestion content (e.g. Product Thumbs).

export interface SuggestionSheetProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export function SuggestionSheet({ title, subtitle, children }: SuggestionSheetProps) {
  return (
    <div className="ds-suggestion">
      <div className="ds-suggestion__grabber" aria-hidden="true" />
      <div className="ds-suggestion__head">
        <div className="ds-suggestion__title" style={{ fontWeight: 700 }}>{title}</div>
        {subtitle != null && <div className="ds-suggestion__sub text-caption">{subtitle}</div>}
      </div>
      <div className="ds-suggestion__strip">{children}</div>
    </div>
  );
}
