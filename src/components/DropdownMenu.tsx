import type { HTMLAttributes, ReactNode } from 'react';
import './DropdownMenu.css';

// Mirrors the Figma "Dropdown Menu": container of Menu Items with dividers.
// Container padding space/2, item gap space/1 (matching the tokens).

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function DropdownMenu({ children, className, ...rest }: DropdownMenuProps) {
  return (
    <div className={['ds-dropdown', className].filter(Boolean).join(' ')} role="menu" {...rest}>
      {children}
    </div>
  );
}

export function MenuDivider() {
  return <div className="ds-dropdown__divider" role="separator" />;
}
