// Client hooks ported from design-system/components/lib/helpers.js. Import only from 'use client' components.
// Difference from the design system: layout responds to the viewport through CSS media queries
// (src/styles/responsive.css) instead of each component measuring itself, so the prerendered HTML is
// already right on phones before JavaScript loads. useMediaQuery covers the few behaviours that need JS.
import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';
import { MQ_REDUCED_MOTION } from './utils';

/** false while prerendering and hydrating, then the live result — so it never causes a hydration mismatch. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query);
      m.addEventListener('change', onChange);
      return () => m.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(MQ_REDUCED_MOTION).matches;
}

export function useReducedMotion() {
  return useMediaQuery(MQ_REDUCED_MOTION);
}

/** true after the first client render. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Reveal once: fade + 24px rise. Elements already on screen at mount are left alone (no flash). */
export function useReveal(ref: RefObject<HTMLElement | null>, delay = 0, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;
    el.setAttribute('data-reveal', 'pending');
    if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-reveal', 'done');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, delay, enabled]);
}

export type DrawState = 'idle' | 'pending' | 'drawn';

/** Line-draw for motifs: 'idle' (static, drawn) | 'pending' (hidden, waiting) | 'drawn' (animating in). */
export function useDrawOnView(ref: RefObject<HTMLElement | null>, enabled = true): DrawState {
  const [state, setState] = useState<DrawState>('idle');
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;
    setState('pending');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('drawn');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<SVGGeometryElement>('svg path, svg line, svg polyline, svg circle, svg rect, svg ellipse').forEach((p) => {
      if (!p.getTotalLength) return;
      const len = String(p.getTotalLength());
      if (state === 'pending') {
        p.style.transition = 'none';
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
      }
      if (state === 'drawn') {
        p.getBoundingClientRect();
        p.style.transition = 'stroke-dashoffset var(--dur-draw) var(--ease-heritage)';
        p.style.strokeDashoffset = '0';
      }
    });
  }, [ref, state]);
  return state;
}
