import type { ReactNode, CSSProperties, ElementType } from 'react';

/** Small-caps label (Cormorant 600, 0.22em). Prefix a Roman numeral for sections and courses: "I · The Courtyard". */
export interface EyebrowProps {
  children?: ReactNode;
  /** Roman numeral shown before the label, separated by a middle dot */
  numeral?: string;
  /** light: terracotta · dark (terracotta-deep bg): copper · terracotta (terracotta bg): parchment */
  tone?: 'light' | 'dark' | 'terracotta';
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;
