import { ImageIcon } from './icons';
import './ProductListRow.css';

// Mirrors the Figma "Product List Row": thumbnail + title (Label/Large) +
// price (Strong/MD) on the trailing edge.

export interface ProductListRowProps {
  title: string;
  price: string;
  subtitle?: string;
  imageSrc?: string;
}

export function ProductListRow({ title, price, subtitle, imageSrc }: ProductListRowProps) {
  return (
    <div className="ds-list-row">
      <div className="ds-list-row__thumb">
        {imageSrc != null ? <img src={imageSrc} alt="" /> : <ImageIcon className="ds-photo-ph" />}
      </div>
      <div className="ds-list-row__info">
        <div className="ds-list-row__title text-label-large">{title}</div>
        {subtitle != null && <div className="ds-list-row__sub text-caption">{subtitle}</div>}
      </div>
      <div className="ds-list-row__price" style={{ fontWeight: 700 }}>{price}</div>
    </div>
  );
}
