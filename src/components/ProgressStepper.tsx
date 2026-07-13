import { Step, type StepState } from './Step';
import './ProgressStepper.css';

// Mirrors the Figma "Progress Stepper": title (Heading/H2) + progress track +
// a list of Steps. Spacing from space/6 (root) and space/4 (list).

export interface ProgressStepperProps {
  title: string;
  /** 0..1 fill fraction of the track. */
  progress: number;
  steps: { state: StepState; label: string }[];
}

export function ProgressStepper({ title, progress, steps }: ProgressStepperProps) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return (
    <div className="ds-pstepper">
      <div className="ds-pstepper__title text-heading-h2">{title}</div>
      <div className="ds-pstepper__track">
        <span className="ds-pstepper__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="ds-pstepper__steps">
        {steps.map((s, i) => (
          <Step key={i} state={s.state}>{s.label}</Step>
        ))}
      </div>
    </div>
  );
}
