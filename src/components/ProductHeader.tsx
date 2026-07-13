import { StarIcon } from './icons';
import './ProductHeader.css';

// Mirrors the Figma "Product Header": name (Heading/H3) + price (Strong/LG) +
// star rating with an optional review count.

export interface ProductHeaderProps {
  name: string;
  price: string;
  /** 0..5, supports halves visually by rounding. */
  rating?: number;
  reviews?: number;
}

export function ProductHeader({ name, price, rating = 0, reviews }: ProductHeaderProps) {
  const full = Math.round(rating);
  return (
    <div className="ds-pheader">
      <div className="ds-pheader__row">
        <div className="ds-pheader__name text-heading-h3">{name}</div>
        <div className="ds-pheader__price" style={{ fontWeight: 700 }}>{price}</div>
      </div>
      <div className="ds-pheader__rating">
        <span className="ds-pheader__stars" aria-label={`Rating ${rating} of 5`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className={i < full ? 'is-on' : 'is-off'} />
          ))}
        </span>
        {reviews != null && <span className="ds-pheader__reviews text-caption">{reviews} reviews</span>}
      </div>
    </div>
  );
}
