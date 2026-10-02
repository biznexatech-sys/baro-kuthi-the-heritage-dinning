import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface LinkItem { label: string; href: string }
export interface Phone { display: string; href: string }
export interface Action { label: string; href?: string; onClick?: MouseEventHandler }
export interface Occasion { title: string; text?: string; icon?: string | ReactNode }
export interface HeadingProps { eyebrow?: ReactNode; numeral?: string; title?: ReactNode; lead?: ReactNode }

/**
 * Full-bleed terracotta band: checker.svg texture at 4%, centred heading block, three occasions with terracotta-panel icons, on-dark button.
 */
export interface OccasionBandProps {
  heading?: HeadingProps | null;
  items?: Occasion[];
  action?: Action | null;
  /** checker.svg URL. Omitted → plain terracotta (no generic pattern substituted) */
  checker?: string;
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function OccasionBand(props: OccasionBandProps): JSX.Element;
