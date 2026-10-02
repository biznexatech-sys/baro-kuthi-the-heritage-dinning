import type { ReactNode, CSSProperties } from 'react';

/** Section divider: railing.svg repeated horizontally, 24px tall, max 480px, 96px space above/below. Max 3 per page. */
export interface DividerProps {
  /** railing.svg URL (repeat-x) or inline SVG node (line-draws on scroll). Omitted → copper hairline that draws itself */
  motif?: string | ReactNode;
  /** Max width in px (default 480) */
  width?: number;
  /** Vertical margin in px (default --divider-space: 96 desktop / 64 mobile) */
  space?: number;
  /** Line-draw on first view (1.6s). Disabled under reduced motion */
  draw?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function Divider(props: DividerProps): JSX.Element;
