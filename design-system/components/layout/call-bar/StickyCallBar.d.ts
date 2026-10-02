import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

/** Mobile-only bar fixed to the bottom: 64px, parchment, copper hairline top; Call (primary) | WhatsApp (secondary). */
export interface StickyCallBarProps {
  phoneHref?: string;
  /** Default: https://wa.me/91XXXXXXXXXX?text=I%20would%20like%20to%20reserve%20a%20table */
  whatsappHref?: string;
  callLabel?: string;
  whatsappLabel?: string;
  /** static for mocks and cards */
  position?: 'fixed' | 'static';
  /** mobile = hidden at ≥768px viewport */
  visibility?: 'mobile' | 'always';
  /** Adds a 64px spacer so content is not hidden behind the fixed bar */
  spacer?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function StickyCallBar(props: StickyCallBarProps): JSX.Element;
