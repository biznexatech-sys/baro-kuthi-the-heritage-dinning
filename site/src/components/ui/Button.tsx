import Link from 'next/link';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { cx, isInternalHref } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'on-dark';

export type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
  tabIndex?: number;
  className?: string;
  style?: CSSProperties;
};

/** §9.1 — primary (terracotta), secondary (outline), on-dark (copper outline). Square, small caps, 300ms. */
export function Button({ variant = 'primary', href, onClick, children, fullWidth = false, disabled = false, type = 'button', target, rel, tabIndex, className, style }: ButtonProps) {
  const cls = cx('bk-btn', 'bk-btn--' + variant, fullWidth && 'bk-btn--full', className);
  const label = <span className="bk-btn__label">{children}</span>;
  if (href && !disabled) {
    if (isInternalHref(href) && !target) {
      return (
        <Link className={cls} href={href} onClick={onClick} style={style} tabIndex={tabIndex}>
          {label}
        </Link>
      );
    }
    return (
      <a className={cls} href={href} onClick={onClick} target={target} rel={rel} style={style} tabIndex={tabIndex}>
        {label}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style} tabIndex={tabIndex}>
      {label}
    </button>
  );
}
