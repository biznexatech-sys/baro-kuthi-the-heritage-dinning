// Server-safe helpers ported from design-system/components/lib/helpers.js (no hooks, no browser APIs).
import type { CSSProperties, ReactNode } from 'react';

export function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(' ');
}

/** Must match the media queries in src/styles/responsive.css. */
export const BREAKPOINTS = { md: 768, header: 1200 } as const;
export const MQ_MOBILE = `(max-width: ${BREAKPOINTS.md - 0.02}px)`;
export const MQ_REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

/** A motif slot: URL → <img>, React node → inline (so paths can line-draw), empty → null (caller renders a fallback). */
export type Motif = string | ReactNode;

export function renderMotif(src: Motif | undefined, className?: string, alt?: string) {
  if (!src) return null;
  if (typeof src === 'string') {
    return <img src={src} alt={alt || ''} className={className} aria-hidden={alt ? undefined : true} draggable={false} />;
  }
  return (
    <span className={className} aria-hidden="true">
      {src}
    </span>
  );
}

export function lalpaarStyle(src?: string): CSSProperties | undefined {
  return src ? { backgroundImage: `url("${src}")`, backgroundColor: 'transparent' } : undefined;
}

/** No crest artwork was supplied — the brand name is set in plain type wherever the mark would go. */
export function Wordmark({ size = 'md', tone = 'light', tagline = true }: { size?: 'sm' | 'md' | 'lg'; tone?: 'light' | 'dark'; tagline?: boolean }) {
  return (
    <span className={cx('bk-wordmark', 'bk-wordmark--' + size, 'bk-wordmark--' + tone)}>
      <span className="bk-wordmark__name">Baro Kuthi</span>
      {tagline && <span className="bk-wordmark__tag">Raj Bari · The Heritage Dining</span>}
    </span>
  );
}

/** Lucide `phone` (ISC licence), redrawn at the brand's 1.25px stroke. The only UI glyph on the site. */
export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={cx('bk-icon', className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** Internal links get client-side navigation; tel:, wa.me, mailto:, http(s) and # stay plain anchors. */
export function isInternalHref(href?: string) {
  return !!href && href.startsWith('/') && !href.startsWith('//');
}
