import { ImageIcon } from './icons';
import './OrderItemCard.css';

// Mirrors the Figma "Order Item Card": product line in an order — thumbnail +
// title/meta + price (Strong/MD) and optional quantity.

export interface OrderItemCardProps {
  title: string;
  meta?: string;
  price: string;
  qty?: number;
  imageSrc?: string;
}

export function OrderItemCard({ title, meta, price, qty, imageSrc }: OrderItemCardProps) {
  return (
    <div className="ds-order-item">
      <div className="ds-order-item__thumb">
        {imageSrc != null ? <img src={imageSrc} alt="" /> : <ImageIcon className="ds-photo-ph" />}
      </div>
      <div className="ds-order-item__info">
        <div className="ds-order-item__title text-body-default">{title}</div>
        {meta != null && <div className="ds-order-item__meta text-caption">{meta}</div>}
      </div>
      <div className="ds-order-item__right">
        <div className="ds-order-item__price" style={{ fontWeight: 700 }}>{price}</div>
        {qty != null && <div className="ds-order-item__qty text-caption">× {qty}</div>}
      </div>
    </div>
  );
}
