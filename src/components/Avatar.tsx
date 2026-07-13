import './Avatar.css';

// Mirrors the Figma "Avatar": empty / filled / selected. Selected adds a
// border/inverse ring. Renders an image when `src` is given, else an initial.

export interface AvatarProps {
  /** Image URL — renders a photo avatar. */
  src?: string;
  /** Fallback initial when there is no image. */
  initial?: string;
  /** Selected state — inverse ring. */
  selected?: boolean;
  /** Pixel size. Defaults to 56. */
  size?: number;
  alt?: string;
}

export function Avatar({ src, initial, selected = false, size = 56, alt = '' }: AvatarProps) {
  const filled = src != null || initial != null;
  return (
    <span
      className={['ds-avatar', filled && 'ds-avatar--filled', selected && 'ds-avatar--selected']
        .filter(Boolean)
        .join(' ')}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
    >
      {src != null ? <img className="ds-avatar__img" src={src} alt={alt} /> : initial}
    </span>
  );
}
