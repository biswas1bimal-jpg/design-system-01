import { ImageIcon } from './icons';
import './LookPreview.css';

// Mirrors the Figma "Look Preview": a saved-outfit card — cover image with a
// two-line caption (title Label + meta Caption).

export interface LookPreviewProps {
  title: string;
  meta: string;
  coverSrc?: string;
}

export function LookPreview({ title, meta, coverSrc }: LookPreviewProps) {
  return (
    <div className="ds-look">
      <div className="ds-look__cover">
        {coverSrc != null ? <img src={coverSrc} alt="" /> : <ImageIcon className="ds-photo-ph" />}
      </div>
      <div className="ds-look__caption">
        <div className="ds-look__title text-label">{title}</div>
        <div className="ds-look__meta text-caption">{meta}</div>
      </div>
    </div>
  );
}
