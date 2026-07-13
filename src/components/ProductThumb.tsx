import { ImageIcon } from './icons';
import './ProductThumb.css';

// Mirrors the Figma "Product Thumb": compact tile with two selectable states —
// Selected (1px border/inverse outline) and Detected (subtle tinted fill).

export interface ProductThumbProps {
  title: string;
  price: string;
  selected?: boolean;
  detected?: boolean;
  imageSrc?: string;
  onClick?: () => void;
}

export function ProductThumb({ title, price, selected, detected, imageSrc, onClick }: ProductThumbProps) {
  return (
    <button
      type="button"
      className={['ds-thumb', selected && 'ds-thumb--selected', detected && 'ds-thumb--detected'].filter(Boolean).join(' ')}
      aria-pressed={selected}
      onClick={onClick}
    >
      <div className="ds-thumb__cover">
        {imageSrc != null ? <img src={imageSrc} alt="" /> : <ImageIcon className="ds-photo-ph" />}
      </div>
      <div className="ds-thumb__title text-caption">{title}</div>
      <div className="ds-thumb__price" style={{ fontWeight: 700 }}>{price}</div>
    </button>
  );
}
