'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { prefersReducedMotion } from '@/lib/hooks';

/** Headings whose words rise out of a mask, one after another. Static text only — never anything React re-renders. */
const TITLES = ['.bk-hero__title', '.bk-heading__title', '.bk-resv__title', '.bk-occasion__title', '.bk-resv__form-title'].join(',');

/** Supporting text that fades up from a soft blur, staggered among its siblings. */
const FADES = [
  '.bk-eyebrow',
  '.bk-heading__lead',
  '.bk-hero__lead',
  '.bk-hero__actions',
  '.bk-story__body p',
  '.bk-story__fact',
  '.bk-story__action',
  '.bk-book__title',
  '.bk-book__subtitle',
  '.bk-menuitem',
  '.bk-occasion__text',
  '.bk-occasion__link',
  '.bk-guest__quote',
  '.bk-dish',
  '.bk-resv__message',
].join(',');

const STAGGER_MS = 90;
const MAX_STAGGER = 6;

/** Wrap each word of the element's text nodes in a mask span + inner span carrying its index. */
function splitWords(el: HTMLElement) {
  let i = 0;
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent || '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            continue;
          }
          const mask = document.createElement('span');
          mask.className = 'tr-w';
          const word = document.createElement('span');
          word.className = 'tr-i';
          word.style.setProperty('--i', String(i++));
          word.textContent = part;
          mask.appendChild(word);
          frag.appendChild(mask);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    }
  };
  walk(el);
}

/**
 * Scroll-driven text animation for the whole site, run after hydration (and again on each client navigation).
 * Classes are only added by script, so text is fully visible without JavaScript or under reduced motion.
 */
export function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    const root = document.documentElement;
    root.classList.add('tr-on');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('tr-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const t = window.setTimeout(() => {
      const main = document.getElementById('main');
      if (!main) return;

      main.querySelectorAll<HTMLElement>(TITLES).forEach((el) => {
        if (el.dataset.tr) return;
        el.dataset.tr = 'title';
        splitWords(el);
        el.classList.add('tr-title');
        io.observe(el);
      });

      const seen = new Map<Element, number>();
      main.querySelectorAll<HTMLElement>(FADES).forEach((el) => {
        if (el.dataset.tr || el.closest('[data-tr="title"]')) return;
        el.dataset.tr = 'fade';
        const parent = el.parentElement!;
        const n = seen.get(parent) ?? 0;
        seen.set(parent, n + 1);
        el.style.setProperty('--d', `${Math.min(n, MAX_STAGGER) * STAGGER_MS}ms`);
        el.classList.add('tr-fade');
        io.observe(el);
      });
    }, 0);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
