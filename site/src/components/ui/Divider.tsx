'use client';
import { useRef, type CSSProperties } from 'react';
import { cx, type Motif } from '@/lib/utils';
import { useDrawOnView } from '@/lib/hooks';

export type DividerProps = {
  /** railing.svg URL or inline SVG. Until supplied, a copper hairline that draws itself. */
  motif?: Motif;
  width?: number;
  space?: number;
  draw?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** §9.6 — railing motif repeated, 24px tall, max 480px, 96px above and below. */
export function Divider({ motif, width = 480, space, draw = true, className, style }: DividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useDrawOnView(ref, draw);
  const vars = { '--divider-w': width + 'px', ...(space != null ? { '--divider-space': space + 'px' } : {}) } as CSSProperties;
  let body;
  if (typeof motif === 'string') body = <span className="bk-divider__motif" style={{ backgroundImage: `url("${motif}")` }} />;
  else if (motif) body = <span className="bk-divider__motif bk-divider__motif--inline">{motif}</span>;
  else body = <span className={cx('bk-divider__rule', 'is-' + state)} />;
  return (
    <div ref={ref} role="separator" className={cx('bk-divider', className)} style={{ ...vars, ...style }}>
      {body}
    </div>
  );
}
