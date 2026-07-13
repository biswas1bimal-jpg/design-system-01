import type { ReactNode } from 'react';
import './Sidebar.css';

// Mirrors the Figma "Sidebar": a floating frosted-glass rail of icon buttons
// with labels; any item can carry a counter badge (status/error).

export interface SidebarItem {
  icon: ReactNode;
  label: string;
  active?: boolean;
  count?: number;
}

export interface SidebarProps {
  items: SidebarItem[];
  onSelect?: (index: number) => void;
}

export function Sidebar({ items, onSelect }: SidebarProps) {
  return (
    <div className="ds-sidebar">
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          className={['ds-sidebar__item', it.active && 'ds-sidebar__item--active'].filter(Boolean).join(' ')}
          onClick={() => onSelect?.(i)}
        >
          <span className="ds-sidebar__square" aria-hidden="true">
            {it.icon}
            {it.count != null && <span className="ds-sidebar__badge text-caption">{it.count}</span>}
          </span>
          <span className="ds-sidebar__label text-extra-small">{it.label}</span>
        </button>
      ))}
    </div>
  );
}
