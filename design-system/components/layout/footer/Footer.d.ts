import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface Row { label: string; value: ReactNode }

/**
 * "The Visitor's Note": terracotta-deep, four columns — Address + map | Hours | Getting here | Crest + Banquet House link. © line in copper small caps, lal-paar at the very bottom.
 */
export interface FooterProps {
  address?: string[];
  mapHref?: string;
  hours?: Row[];
  /** Metro, parking, dress code… */
  gettingHere?: Row[];
  banquetHref?: string;
  banquetLabel?: string;
  year?: number;
  crest?: string | ReactNode;
  lalpaar?: string;
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function Footer(props: FooterProps): JSX.Element;
