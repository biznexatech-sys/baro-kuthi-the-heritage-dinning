import type { ReactNode, CSSProperties } from 'react';

/** Image primitive. Arch (3:4, semicircular top) for rooms and story portraits; tall 2:3 for courses; wide/cinema for breaks; square for gallery. Missing src → labelled placeholder showing the alt text. */
export interface ArchImageProps {
  src?: string;
  /** Plain scene description: "Kosha mangsho on a kansa thala, lamp-lit" */
  alt?: string;
  shape?: 'arch' | 'tall' | 'wide' | 'cinema' | 'square';
  /** Placeholder tone: light (parchment-dark) or dark (for terracotta-deep bands) */
  tone?: 'light' | 'dark';
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  /** Scroll parallax, max 8% movement; off under reduced motion */
  parallax?: boolean;
  caption?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export declare function ArchImage(props: ArchImageProps): JSX.Element;
