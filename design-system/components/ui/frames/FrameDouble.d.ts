import type { ReactNode, CSSProperties, ElementType } from 'react';

/** The signature container: 1px copper · 6px gap · 1px copper, square corners. Hero inset, invitation, reservation card, menu book. */
export interface FrameDoubleProps {
  as?: ElementType;
  fill?: 'none' | 'parchment' | 'parchment-dark' | 'terracotta-deep';
  /** px number or CSS value (default 48) */
  padding?: number | string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export declare function FrameDouble(props: FrameDoubleProps): JSX.Element;
