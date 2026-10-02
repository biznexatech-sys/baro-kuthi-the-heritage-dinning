import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface LinkItem { label: string; href: string }
export interface Phone { display: string; href: string }
export interface Action { label: string; href?: string; onClick?: MouseEventHandler }

/**
 * Site header: lal-paar band, 88px parchment bar, copper hairline. Left nav | centred crest + wordmark | right nav + phone.
 * Condenses to 64px after 120px of scroll. Below 1200px of its own width (where the desktop nav stops fitting): two-line menu button, name, phone icon; menu opens full-screen on terracotta-deep.
 */
export interface HeaderProps {
  leftLinks?: LinkItem[];
  rightLinks?: LinkItem[];
  phone?: Phone;
  /** href of the current page — gets a copper underline and aria-current */
  activeHref?: string;
  homeHref?: string;
  /** Intercept navigation (SPA). Receives the href; default link behaviour is prevented */
  onNavigate?: (href: string) => void;
  /** crest.svg URL. Omitted → the brand name is set in Cinzel (no crest artwork supplied yet) */
  crest?: string | ReactNode;
  /** lalpaar.svg URL. Omitted → 6px solid terracotta band */
  lalpaar?: string;
  /** auto measures the header's own width; force 'desktop' or 'mobile' for mocks */
  layout?: 'auto' | 'desktop' | 'mobile';
  /** Force the condensed (64px) state; omitted → condenses after 120px scroll */
  condensed?: boolean;
  sticky?: boolean;
  /** Controlled mobile-menu state */
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}
export declare function Header(props: HeaderProps): JSX.Element;
