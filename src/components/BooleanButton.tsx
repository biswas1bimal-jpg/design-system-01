import type { ReactNode } from 'react';
import './BooleanButton.css';

// Mirrors the Figma "Boolean Button": an on/off toggle used to pick cards or
// options. On uses the inverse surface (dark on light, light on dark).

export interface BooleanButtonProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  icon?: ReactNode;
  children?: ReactNode;
}

export function BooleanButton({ pressed, onPressedChange, icon, children }: BooleanButtonProps) {
  return (
    <button
      type="button"
      className={['ds-bool', pressed && 'ds-bool--on'].filter(Boolean).join(' ')}
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
    >
      {icon != null && <span className="ds-bool__icon" aria-hidden="true">{icon}</span>}
      {children != null && <span className="ds-bool__label text-label-large">{children}</span>}
    </button>
  );
}
