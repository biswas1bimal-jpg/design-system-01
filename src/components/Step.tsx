import type { ReactNode } from 'react';
import { CheckIcon } from './icons';
import './Step.css';

// Mirrors the Figma "Step" set: Done (check), Active (filled dot), Pending
// (empty ring). Indicator size = icon/size/sm, gap = space/2.

export type StepState = 'done' | 'active' | 'pending';

export interface StepProps {
  state: StepState;
  children: ReactNode;
}

export function Step({ state, children }: StepProps) {
  return (
    <div className={`ds-step ds-step--${state}`}>
      <span className="ds-step__indicator" aria-hidden="true">
        {state === 'done' && <CheckIcon className="ds-step__check" />}
      </span>
      <span className="ds-step__label text-body-default">{children}</span>
    </div>
  );
}
