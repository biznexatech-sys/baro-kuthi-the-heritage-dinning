import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface LinkItem { label: string; href: string }
export interface Phone { display: string; href: string }
export interface Action { label: string; href?: string; onClick?: MouseEventHandler }

/**
 * "The Courtyard": asymmetric arched image (5 cols) + text (5 cols) with a 2-column offset; alternate with reverse. Optional year marker (Cinzel 56px) and pull quote (italic 32px, copper hairline left).
 */
export interface StoryBlockProps {
  image?: string;
  imageAlt?: string;
  eyebrow?: ReactNode;
  numeral?: string;
  /** "1823" — replaces the heading ornament */
  year?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  /** Paragraphs (≤60 words each). A string is wrapped in <p> */
  children?: ReactNode;
  quote?: ReactNode;
  action?: Action;
  /** Image on the right */
  reverse?: boolean;
  tone?: 'light' | 'dark';
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function StoryBlock(props: StoryBlockProps): JSX.Element;
