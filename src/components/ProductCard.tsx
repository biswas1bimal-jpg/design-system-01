import { ImageIcon } from './icons';
import './ProductCard.css';

// Mirrors the Figma "Product Card": Small / Medium, optional Sale (old price
// struck through + sale price in the error color). Price uses Strong/MD.

export interface ProductCardProps {
  title: string;
  price: string;
  /** When set, shows a struck-through original price and a sale price. */
  oldPrice?: string;
  size?: 'sm' | 'md';
  imageSrc?: string;
}

export function ProductCard({ title, price, oldPrice, size = 'md', imageSrc }: ProductCardProps) {
  const onSale = oldPrice != null;
  return (
    <div className={`ds-product-card ds-product-card--${size}`}>
      <div className="ds-product-card__cover">
        {imageSrc != null ? <img src={imageSrc} alt="" /> : <ImageIcon className="ds-photo-ph" />}
      </div>
      <div className="ds-product-card__price">
        {onSale && <span className="text-caption ds-product-card__old">{oldPrice}</span>}
        <span className={onSale ? 'ds-product-card__sale' : 'ds-product-card__reg'} style={{ fontWeight: 700 }}>{price}</span>
      </div>
      <div className="ds-product-card__title text-body-small">{title}</div>
    </div>
  );
}
