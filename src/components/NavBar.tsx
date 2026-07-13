import type { ReactNode } from 'react';
import './NavBar.css';

// Mirrors the Figma "Nav Bar" / "Nav Item": bottom mobile navigation — icon +
// Extra-small label per item, active item in text/primary.

export interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button type="button" className={['ds-nav-item', active && 'ds-nav-item--active'].filter(Boolean).join(' ')} aria-current={active ? 'page' : undefined} onClick={onClick}>
      <span className="ds-nav-item__icon" aria-hidden="true">{icon}</span>
      <span className="ds-nav-item__label text-extra-small">{label}</span>
    </button>
  );
}

export interface NavBarProps {
  children?: ReactNode;
}

export function NavBar({ children }: NavBarProps) {
  return (
    <nav className="ds-navbar">{children}</nav>
  );
}
