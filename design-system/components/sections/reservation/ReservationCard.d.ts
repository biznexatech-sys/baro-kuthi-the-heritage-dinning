import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface Phone { display: string; href: string }
export interface Row { label: string; value: ReactNode }

/**
 * The reservation card that ends every page: centred double frame, alpana border that draws itself, phone number in Cinzel 40px, WhatsApp secondary button, hours as a letterpress list with leaders.
 */
export interface ReservationCardProps {
  eyebrow?: ReactNode;
  numeral?: string;
  title?: ReactNode;
  message?: ReactNode;
  phone?: Phone;
  whatsappHref?: string | null;
  whatsappLabel?: string;
  hours?: Row[];
  /** alpana.svg URL, or an inline <svg> node (its paths line-draw on first view, 1.6s) */
  alpana?: string | ReactNode;
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function ReservationCard(props: ReservationCardProps): JSX.Element;
