'use client';
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

export type MenuSliderTab = { id: string; label: string };

const Arrow = ({ dir }: { dir: 1 | -1 }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={dir === 1 ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'} />
  </svg>
);

/**
 * The menu pages as a slider: category tabs on top, then a scroll-snap track (two pages side by side on wide screens,
 * one on phones) with arrows, swipe, keyboard arrows and a page counter. The track's height follows the pages in view,
 * so a short page never leaves a tall empty band. A #category hash (or a link to one) opens that page.
 */
export function MenuSlider({ tabs, children, label = 'The menu' }: { tabs: MenuSliderTab[]; children: ReactNode; label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tabList = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const count = Children.count(children);
  const last = Math.max(0, count - perView);

  const pages = () => Array.from(track.current?.children ?? []) as HTMLElement[];

  /** Height of the tallest page currently in view (plus the track's own padding for the shadow). */
  const fit = useCallback((i: number, pv: number) => {
    const el = track.current;
    if (!el) return;
    const inView = pages().slice(i, i + pv);
    if (!inView.length) return;
    const cs = getComputedStyle(el);
    const h = Math.max(...inView.map((p) => p.offsetHeight)) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    el.style.height = `${Math.ceil(h)}px`;
  }, []);

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const el = track.current;
      const p = pages()[Math.min(Math.max(i, 0), count - 1)];
      if (!el || !p) return;
      el.scrollTo({ left: p.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: smooth ? 'smooth' : 'auto' });
    },
    [count],
  );

  // Work out the current page from the scroll position.
  const onScroll = () => {
    const el = track.current;
    const ps = pages();
    if (!el || ps.length < 2) return;
    const step = ps[1].offsetLeft - ps[0].offsetLeft;
    const i = Math.min(Math.max(Math.round(el.scrollLeft / step), 0), count - 1);
    if (i !== index) setIndex(i);
  };

  // Pages per view follows the CSS (2 at ≥1100px).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)');
    const set = () => setPerView(mq.matches ? 2 : 1);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  // Refit on page change, resize and once the fonts/sketches have loaded.
  useEffect(() => {
    fit(index, perView);
    const ro = new ResizeObserver(() => fit(index, perView));
    pages().forEach((p) => ro.observe(p));
    return () => ro.disconnect();
  }, [index, perView, fit]);

  // Keep the active tab in view in the tab strip (horizontally only).
  useEffect(() => {
    const list = tabList.current;
    const tab = list?.querySelector<HTMLElement>(`[data-i="${index}"]`);
    if (list && tab && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [index]);

  // #category in the URL (on load, or from any link on the page) opens that page.
  useEffect(() => {
    const open = (hash: string, smooth: boolean) => {
      const i = tabs.findIndex((t) => `#${t.id}` === hash);
      if (i < 0) return false;
      goTo(i, smooth);
      root.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      return true;
    };
    if (location.hash) requestAnimationFrame(() => open(location.hash, false));
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (a && open(a.getAttribute('href')!, true)) {
        e.preventDefault();
        history.replaceState(null, '', a.getAttribute('href'));
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [tabs, goTo]);

  /** Arrow buttons: turn the page and, if the reader is down a long page, bring the top of the new one into view. */
  const turn = (dir: 1 | -1) => {
    goTo(index + dir);
    if ((root.current?.getBoundingClientRect().top ?? 0) < 0) root.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const shown = Math.min(index, last);
  const counter = perView > 1 && shown + 1 < count ? `${shown + 1}–${shown + 2}` : `${shown + 1}`;

  return (
    <div ref={root} className="bk-ms" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={tabList} className="bk-ms__tabs" role="tablist" aria-label="Menu categories">
        {tabs.map((t, i) => {
          const on = i >= shown && i < shown + perView;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              data-i={i}
              aria-selected={on}
              aria-controls={t.id}
              className={cx('bk-ms__tab', on && 'is-active')}
              onClick={() => goTo(i)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="bk-ms__stage">
        <button type="button" className="bk-ms__arrow bk-ms__arrow--prev" onClick={() => turn(-1)} disabled={shown <= 0} aria-label="Previous page">
          <Arrow dir={-1} />
        </button>
        <div ref={track} className="bk-ms__track" onScroll={onScroll} onKeyDown={onKey} tabIndex={0} aria-live="polite">
          {children}
        </div>
        <button type="button" className="bk-ms__arrow bk-ms__arrow--next" onClick={() => turn(1)} disabled={shown >= last} aria-label="Next page">
          <Arrow dir={1} />
        </button>
        <p className="bk-ms__count">
          <span className="bk-ms__count-label">{tabs.slice(shown, shown + perView).map((t) => t.label).join(' · ')}</span>
          <span className="bk-ms__count-num">
            Page {counter} of {count}
          </span>
        </p>
      </div>

    </div>
  );
}
