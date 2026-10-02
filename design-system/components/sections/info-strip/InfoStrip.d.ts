import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface Phone { display: string; href: string }

/** Three columns under the hero — Hours · Address · Call / WhatsApp — separated by copper hairlines. Stacks when narrow. */
export interface InfoStripProps {
  hours?: ReactNode;
  address?: ReactNode;
  mapHref?: string;
  phone?: Phone;
  whatsappHref?: string;
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function InfoStrip(props: InfoStripProps): JSX.Element;
