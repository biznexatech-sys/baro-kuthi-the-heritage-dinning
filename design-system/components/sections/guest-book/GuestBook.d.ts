import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface Review { date?: string; quote: string; name: string; href?: string; source?: string }

/**
 * Guest-book cards: parchment-dark pages with copper rules — date (small caps), italic 20px quote, name, "Google review →" source link.
 * REAL reviews only, quoted exactly; never invent testimonials.
 */
export interface GuestBookProps {
  reviews?: Review[];
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function GuestBook(props: GuestBookProps): JSX.Element;
