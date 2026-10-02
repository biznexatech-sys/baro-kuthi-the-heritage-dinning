import type { ReactNode, CSSProperties, ElementType } from 'react';

/**
 * The fixed section heading block: ornament (48px) → eyebrow · numeral → Cinzel title → one italic lead line.
 * Left-aligned on light sections, centred on dark bands. Reveals once (fade + 24px rise).
 */
export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  /** Roman numeral, e.g. "IV" */
  numeral?: string;
  /** Max 8 words */
  title?: ReactNode;
  /** One italic line, max 20 words */
  lead?: ReactNode;
  tone?: 'light' | 'dark' | 'terracotta';
  /** Defaults: left on light, center on dark/terracotta */
  align?: 'left' | 'center';
  /** crest.svg / railing.svg URL or inline SVG node. Omitted → 48px copper hairline */
  ornament?: string | ReactNode;
  as?: ElementType;
  size?: 'h2' | 'h1' | 'display';
  reveal?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
