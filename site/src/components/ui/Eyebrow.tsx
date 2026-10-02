import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cx } from '@/lib/utils';

export type Tone = 'light' | 'dark' | 'terracotta';

export type EyebrowProps = {
  children?: ReactNode;
  numeral?: string;
  tone?: Tone;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/** Cormorant 600 small caps. Terracotta on light · copper on terracotta-deep · parchment on terracotta. */
export function Eyebrow({ children, numeral, tone = 'light', as: Tag = 'p', className, style }: EyebrowProps) {
  return (
    <Tag className={cx('bk-eyebrow', 'bk-eyebrow--' + tone, className)} style={style}>
      {numeral && <span className="bk-eyebrow__numeral">{numeral}</span>}
      {numeral && children && (
        <span className="bk-eyebrow__sep" aria-hidden="true">
          ·
        </span>
      )}
      {children}
    </Tag>
  );
}
