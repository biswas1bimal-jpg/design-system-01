import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './MenuItem.css';

// Mirrors the Figma "Menu Item": leading icon + label, default / hover.
// Padding is a uniform space/3 inset, gap space/2 (matching the tokens).

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label: ReactNode;
}

export function MenuItem({ icon, label, className, ...rest }: MenuItemProps) {
  return (
    <button type="button" className={['ds-menu-item', className].filter(Boolean).join(' ')} {...rest}>
      {icon != null && <span className="ds-menu-item__icon" aria-hidden="true">{icon}</span>}
      <span className="ds-menu-item__label text-body-small">{label}</span>
    </button>
  );
}
