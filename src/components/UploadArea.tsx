import { ImageIcon, PlusIcon, TrashIcon } from './icons';
import './UploadArea.css';

// Mirrors the Figma "Upload Area": empty state (dashed dropzone, darkens on
// hover) and filled state (image fills the frame + a remove button).

export interface UploadAreaProps {
  imageSrc?: string;
  onSelect?: () => void;
  onRemove?: () => void;
  label?: string;
}

export function UploadArea({ imageSrc, onSelect, onRemove, label = 'Upload photo' }: UploadAreaProps) {
  if (imageSrc != null) {
    return (
      <div className="ds-upload ds-upload--filled">
        <img className="ds-upload__img" src={imageSrc} alt="" />
        <button type="button" className="ds-upload__remove" aria-label="Remove photo" onClick={onRemove}>
          <TrashIcon />
        </button>
      </div>
    );
  }
  return (
    <button type="button" className="ds-upload ds-upload--empty" onClick={onSelect}>
      <span className="ds-upload__icon" aria-hidden="true"><ImageIcon /></span>
      <span className="ds-upload__label text-body-small">{label}</span>
      <span className="ds-upload__hint text-caption"><PlusIcon /> Tap to add</span>
    </button>
  );
}
