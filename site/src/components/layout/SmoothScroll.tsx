'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/hooks';
import { registerLenis } from '@/lib/scroll';

/**
 * §8 — Lenis smooth scroll (lerp 0.08). Off under reduced motion and on touch devices (native momentum is better).
 * Components lock scrolling by setting overflow:hidden on <html> (mobile menu, invitation); Lenis drives the
 * scroll position itself, so we pause it whenever that lock is on.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return undefined;
    const lenis = new Lenis({ lerp: 0.08, anchors: true });
    registerLenis(lenis);
    let raf = requestAnimationFrame(function frame(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(frame);
    });
    const root = document.documentElement;
    const sync = () => (root.style.overflow === 'hidden' ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ['style'] });
    sync();
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);
  return null;
}
