'use client';
import { useEffect, useState } from 'react';
import { cx } from '@/lib/utils';

export type SectionNavItem = { id: string; label: string };

/**
 * A sticky bar of in-page links that sits under the header and highlights the section in view.
 * Horizontal scroll on phones; the active link is kept in view.
 */
export function SectionNav({ items, label = 'On this page' }: { items: SectionNavItem[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  // Keep the active link centred in the (phone) scroll strip — horizontally only, never moving the page.
  useEffect(() => {
    const link = document.querySelector<HTMLElement>(`.pg-secnav a[href="#${active}"]`);
    const list = link?.closest<HTMLElement>('.pg-secnav__list');
    if (link && list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <nav className="pg-secnav" aria-label={label}>
      <ul className="pg-secnav__list">
        {items.map((i, n) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={cx('pg-secnav__link', i.id === active && 'is-active')} aria-current={i.id === active ? 'true' : undefined}>
              <span className="pg-secnav__num" aria-hidden="true">
                {['I', 'II', 'III', 'IV', 'V', 'VI'][n]}
              </span>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
