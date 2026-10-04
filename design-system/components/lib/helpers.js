import React from 'react';

const h = React.createElement;

export function cx(...a) { return a.filter(Boolean).join(' '); }

/* [ref, compact] — compact when the element itself is narrower than 768px (works inside phone frames too). */
export function useCompact(layout = 'auto', breakpoint = 768) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(() => (typeof window === 'undefined' ? 1280 : window.innerWidth));
  React.useLayoutEffect(() => {
    if (layout !== 'auto') return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.offsetWidth || window.innerWidth);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout]);
  const compact = layout === 'mobile' || (layout === 'auto' && width < breakpoint);
  return [ref, compact, width];
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion() {
  const [r, setR] = React.useState(prefersReducedMotion);
  React.useEffect(() => {
    if (!window.matchMedia) return undefined;
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(m.matches);
    if (m.addEventListener) m.addEventListener('change', on); else m.addListener(on);
    return () => { if (m.removeEventListener) m.removeEventListener('change', on); else m.removeListener(on); };
  }, []);
  return r;
}

/* Reveal once: fade + 24px rise. Elements already on screen at mount are left alone (no flash, no invisible captures). */
export function useReveal(ref, delay = 0, enabled = true) {
  React.useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;
    el.setAttribute('data-reveal', 'pending');
    if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { el.setAttribute('data-reveal', 'done'); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

/* 'idle' (static, drawn) | 'pending' (hidden, waiting) | 'drawn' (animating in). Used for line-draw motifs. */
export function useDrawOnView(ref, enabled = true) {
  const [state, setState] = React.useState('idle');
  React.useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;
    setState('pending');
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setState('drawn'); io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll('svg path, svg line, svg polyline, svg circle, svg rect, svg ellipse');
    paths.forEach((p) => {
      if (!p.getTotalLength) return;
      const len = p.getTotalLength();
      if (state === 'pending') { p.style.transition = 'none'; p.style.strokeDasharray = len; p.style.strokeDashoffset = len; }
      if (state === 'drawn') { p.getBoundingClientRect(); p.style.transition = 'stroke-dashoffset var(--dur-draw) var(--ease-heritage)'; p.style.strokeDashoffset = 0; }
    });
  }, [state]);
  return state;
}

/* A motif slot: URL string → <img>, React node → inline (so paths can line-draw), empty → null (caller renders fallback). */
export function renderMotif(src, className, alt) {
  if (!src) return null;
  if (typeof src === 'string') return h('img', { src, alt: alt || '', className, 'aria-hidden': alt ? undefined : true, draggable: false });
  return h('span', { className, 'aria-hidden': true }, src);
}

/* No crest artwork was supplied — the brand name is set in plain type wherever the mark would go. */
export function renderWordmark({ size = 'md', tone = 'light', tagline = true } = {}) {
  return h('span', { className: cx('bk-wordmark', 'bk-wordmark--' + size, 'bk-wordmark--' + tone) },
    h('span', { className: 'bk-wordmark__name' }, 'Baro Kuthi'),
    tagline ? h('span', { className: 'bk-wordmark__tag' }, 'Raj Bari · The Heritage Dining') : null);
}

export function lalpaarStyle(src) {
  return src ? { backgroundImage: 'url("' + src + '")', backgroundColor: 'transparent' } : undefined;
}

export const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

/* Icons: copied from Lucide (ISC licence), redrawn at the brand's 1.25px stroke. Only the phone glyph is used. */
const ICONS = {
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
};
export function renderIcon(name, className) {
  return h('svg', { className: cx('bk-icon', className), viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false' }, h('path', { d: ICONS[name] }));
}
