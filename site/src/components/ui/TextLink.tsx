import Link from 'next/link';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { cx, isInternalHref } from '@/lib/utils';

export type TextLinkProps = {
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
  arrow?: boolean;
  tone?: 'light' | 'dark';
  target?: string;
  rel?: string;
  className?: string;
  style?: CSSProperties;
};

/** §9.1 — terracotta small caps + →; the copper underline grows from the left on hover. */
export function TextLink({ href, onClick, children, arrow = true, tone = 'light', target, rel, className, style }: TextLinkProps) {
  const cls = cx('bk-textlink', tone === 'dark' && 'bk-textlink--dark', className);
  const inner = (
    <>
      <span className="bk-textlink__label">{children}</span>
      {arrow && (
        <span className="bk-textlink__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );
  if (!href && onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} style={style}>
        {inner}
      </button>
    );
  }
  if (isInternalHref(href) && !target) {
    return (
      <Link className={cls} href={href!} onClick={onClick} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <a className={cls} href={href || '#'} onClick={onClick} target={target} rel={rel} style={style}>
      {inner}
    </a>
  );
}
