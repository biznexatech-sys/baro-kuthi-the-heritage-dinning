// Programmatic scrolling that cooperates with Lenis. When Lenis is running, native smooth scrolling fights its
// interpolation and overshoots, so every scripted scroll goes through here.
import type Lenis from 'lenis';
import { prefersReducedMotion } from './hooks';

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
