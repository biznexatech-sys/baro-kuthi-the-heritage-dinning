import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

/** Terracotta small-caps link with → ; a copper 1px underline grows from the left on hover. */
export interface TextLinkProps {
  href?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  /** Show the trailing → (default true) */
  arrow?: boolean;
  /** dark = parchment text for terracotta / terracotta-deep bands */
  tone?: 'light' | 'dark';
  target?: string;
  rel?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function TextLink(props: TextLinkProps): JSX.Element;
