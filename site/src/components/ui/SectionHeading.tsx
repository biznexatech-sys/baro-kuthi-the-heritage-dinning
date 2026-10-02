'use client';
import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cx, renderMotif, type Motif } from '@/lib/utils';
import { useReveal } from '@/lib/hooks';
import { Eyebrow, type Tone } from './Eyebrow';

export type SectionHeadingProps = {
  eyebrow?: ReactNode;
  numeral?: string;
  title?: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  align?: 'left' | 'center';
  /** Motif URL/node; false hides the ornament row; empty shows the copper hairline fallback. */
  ornament?: Motif | false;
  as?: ElementType;
  size?: 'h2' | 'h1' | 'display';
  reveal?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** §4 — the one heading block: ornament → eyebrow · numeral → Cinzel title → italic lead. Left on light, centred on dark. */
export function SectionHeading({ eyebrow, numeral, title, lead, tone = 'light', align, ornament, as: Tag = 'h2', size = 'h2', reveal = true, className, style }: SectionHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, 0, reveal);
  const a = align || (tone === 'light' ? 'left' : 'center');
  return (
    <header ref={ref} className={cx('bk-heading', 'bk-heading--' + tone, 'bk-heading--' + a, className)} style={style}>
      {ornament !== false && (
        <div className="bk-heading__ornament" aria-hidden="true">
          {renderMotif(ornament, 'bk-heading__motif') || <span className="bk-heading__rule" />}
        </div>
      )}
      {(eyebrow || numeral) && (
        <Eyebrow numeral={numeral} tone={tone}>
          {eyebrow}
        </Eyebrow>
      )}
      {title && <Tag className={cx('bk-heading__title', 'bk-heading__title--' + size)}>{title}</Tag>}
      {lead && <p className="bk-heading__lead">{lead}</p>}
    </header>
  );
}
