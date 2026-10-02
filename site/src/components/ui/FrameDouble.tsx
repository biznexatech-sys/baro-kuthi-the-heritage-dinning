import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cx } from '@/lib/utils';

const FILLS: Record<string, string> = {
  none: 'transparent',
  parchment: 'var(--parchment)',
  'parchment-dark': 'var(--parchment-dark)',
  'terracotta-deep': 'var(--terracotta-deep)',
};

export type FrameDoubleProps = {
  as?: ElementType;
  fill?: 'none' | 'parchment' | 'parchment-dark' | 'terracotta-deep';
  padding?: number | string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** §5 — the signature container: 1px copper · 6px gap · 1px copper, square corners. */
export function FrameDouble({ as: Tag = 'div', fill = 'none', padding = 48, children, className, style }: FrameDoubleProps) {
  const pad = typeof padding === 'number' ? padding + 'px' : padding;
  return (
    <Tag className={cx('bk-frame', className)} style={{ background: FILLS[fill], padding: pad, ...style }}>
      {children}
    </Tag>
  );
}
