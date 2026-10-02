import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface LinkItem { label: string; href: string }
export interface Phone { display: string; href: string }
export interface Action { label: string; href?: string; onClick?: MouseEventHandler }

/**
 * "The Gate": full-bleed dusk photograph, terracotta-deep gradient from the bottom, double copper frame inset 24px, chandelier from top centre; content bottom-left.
 */
export interface HeroProps {
  image?: string;
  imageAlt?: string;
  eyebrow?: ReactNode;
  /** Display title, max 8 words */
  title?: ReactNode;
  lead?: ReactNode;
  /** Default: Reserve by Telephone (primary) */
  primaryAction?: Action | null;
  /** Default: View the Menu (on-dark) */
  secondaryAction?: Action | null;
  /** chandelier.svg — sways ±1.5° with scroll velocity */
  chandelier?: string | ReactNode;
  /** CSS min-height; default fills the viewport under the header */
  height?: string;
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function Hero(props: HeroProps): JSX.Element;
