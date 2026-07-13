import type { ReactNode } from 'react';
import { EditIcon } from './icons';
import './OrderSection.css';

// Mirrors the Figma "Order Section" cards (Address / Delivery / Payment /
// Summary): a titled, bordered card with an optional edit action + content.

export interface OrderSectionProps {
  title: string;
  onEdit?: () => void;
  children?: ReactNode;
}

export function OrderSection({ title, onEdit, children }: OrderSectionProps) {
  return (
    <section className="ds-order-section">
      <header className="ds-order-section__head">
        <h3 className="ds-order-section__title text-heading-h5">{title}</h3>
        {onEdit != null && (
          <button type="button" className="ds-order-section__edit" aria-label={`Edit ${title}`} onClick={onEdit}>
            <EditIcon />
          </button>
        )}
      </header>
      <div className="ds-order-section__body">{children}</div>
    </section>
  );
}
