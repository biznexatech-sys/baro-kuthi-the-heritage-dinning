import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import { AlponaCorner } from '@/components/ui/Alpona';

export type PageSectionProps = {
  /** light = parchment, alt = parchment-dark, band = terracotta (pair with dark-tone headings). */
  tone?: 'light' | 'alt' | 'band';
  id?: string;
  flushTop?: boolean;
  flushBottom?: boolean;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  /** Decorative layer behind the content (absolutely positioned against the section). */
  decor?: ReactNode;
};

/** §4 — one page band: 160px vertical padding (96 mobile), 64px gutters (20 mobile), 1280px container. */
export function PageSection({ tone = 'light', id, flushTop, flushBottom, children, className, decor, ...rest }: PageSectionProps) {
  return (
    <section
      id={id}
      aria-label={rest['aria-label']}
      className={cx(
        'box-border px-[var(--gutter)] py-[var(--section-pad-y)]',
        tone === 'alt' ? 'bg-parchment-dark' : tone === 'band' ? 'pg-band' : 'bg-parchment',
        flushTop && 'pt-0',
        flushBottom && 'pb-0',
        !!decor && 'relative isolate overflow-x-clip',
        className,
      )}
    >
      {tone === 'band' &&
        (['tl', 'tr', 'bl', 'br'] as const).map((c) => <AlponaCorner key={c} className={'pg-band__corner pg-band__corner--' + c} />)}
      {decor}
      <div className={cx('mx-auto max-w-site', !!decor && 'relative z-[1]')}>{children}</div>
    </section>
  );
}

/** Heading block → content, separated by the standard 64px (40 mobile). */
export function Stack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('flex flex-col gap-[var(--heading-gap)]', className)}>{children}</div>;
}

/**
 * §4 asymmetric split on the 12-column grid (stacked below 1024px).
 *   '4-7' — heading (4 cols) | gap | content (7 cols)
 *   '7-4' — content (7 cols) | gap | aside (4 cols)
 */
export function Split({ ratio = '4-7', first, second, className }: { ratio?: '4-7' | '7-4'; first: ReactNode; second: ReactNode; className?: string }) {
  return (
    <div className={cx('grid grid-cols-1 items-start gap-x-[var(--card-gap)] gap-y-[var(--heading-gap)] lg:grid-cols-12', className)}>
      <div className={cx('min-w-0', ratio === '4-7' ? 'lg:col-[1/span_4]' : 'lg:col-[1/span_7]')}>{first}</div>
      <div className={cx('min-w-0', ratio === '4-7' ? 'lg:col-[6/span_7]' : 'lg:col-[9/span_4]')}>{second}</div>
    </div>
  );
}

/** Centred closing line + action (Menu seasonal note, Story CTA). */
export function CentredNote({ line, children }: { line: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="pg-centred-line">{line}</p>
      {children}
    </div>
  );
}
