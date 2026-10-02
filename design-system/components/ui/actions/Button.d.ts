import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

/**
 * Square, small-caps action. Primary = terracotta with a 1px copper inset frame; the phone CTA always reads "Reserve by Telephone".
 */
export interface ButtonProps {
  /** primary: terracotta fill · secondary: terracotta hairline on light · on-dark: copper hairline inside dark bands */
  variant?: 'primary' | 'secondary' | 'on-dark';
  /** Renders an <a> when set (tel:, wa.me, page links) */
  href?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
