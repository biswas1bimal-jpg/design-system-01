import type { HTMLAttributes, ReactNode } from 'react';
import { CheckIcon, CloseIcon, InfoIcon, WarningIcon, BellIcon } from './icons';
import './Toast.css';

// Mirrors the Figma "Toast": status icon-circle + title (Heading/H5) + text
// (Body/Small) + optional dismiss. Five states via the status/* tokens.

export type ToastStatus = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  status?: ToastStatus;
  title: ReactNode;
  /** Supporting line under the title. */
  text?: ReactNode;
  /** Called when the dismiss button is pressed. Hidden if omitted. */
  onDismiss?: () => void;
}

const ICON = {
  neutral: BellIcon,
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: CloseIcon
} as const;

export function Toast({ status = 'neutral', title, text, onDismiss, className, ...rest }: ToastProps) {
  const Icon = ICON[status];
  return (
    <div className={['ds-toast', `ds-toast--${status}`, className].filter(Boolean).join(' ')} role="status" {...rest}>
      <span className="ds-toast__icon" aria-hidden="true"><Icon /></span>
      <div className="ds-toast__content">
        <div className="ds-toast__title text-heading-h5">{title}</div>
        {text != null && <div className="ds-toast__text text-body-small">{text}</div>}
      </div>
      {onDismiss != null && (
        <button type="button" className="ds-toast__close" aria-label="Dismiss" onClick={onDismiss}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
