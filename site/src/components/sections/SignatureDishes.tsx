'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SignatureDish } from '@/lib/content';
import { cx } from '@/lib/utils';

export type SignatureDishesProps = { dishes: SignatureDish[] };

/**
 * Our Signature Dishes — arch-topped cards in a copper outline, each with a round plate: the dish photograph in a
 * copper ring, or (until one is supplied) the carved lotus turning slowly behind the dish's initial.
 * A scroll-snap row: four cards on wide screens, three, two, then one and a peek on phones; arrows at the sides
 * (beneath on phones) and dots.
 */
export function SignatureDishes({ dishes }: SignatureDishesProps) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0') : 1;
    setActive(Math.min(dishes.length - 1, Math.round(el.scrollLeft / step)));
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, [dishes.length]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };
  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div className="bk-dishes">
      <button type="button" className="bk-dishes__arrow bk-dishes__arrow--prev" aria-label="Previous dishes" disabled={edges.start} onClick={() => page(-1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>

      <ul ref={track} className="bk-dishes__track" onScroll={measure}>
        {dishes.map((d) => (
          <li key={d.name} className="bk-dish">
            <div className="bk-dish__plate">
              {d.image ? (
                <img className="bk-dish__img" src={d.image} alt={d.name} loading="lazy" decoding="async" />
              ) : (
                <span className="bk-dish__placeholder" aria-hidden="true">
                  <img className="bk-dish__lotus" src="/images/medallion.webp" alt="" loading="lazy" decoding="async" />
                  <span className="bk-dish__initial">{d.name.charAt(0)}</span>
                </span>
              )}
            </div>
            <p className="bk-dish__table">{d.table}</p>
            <h3 className="bk-dish__name">{d.name}</h3>
            {d.description && <p className="bk-dish__desc">{d.description}</p>}
            <div className="bk-dish__foot" aria-hidden={!d.speciality}>
              {d.speciality && <span className="bk-dish__badge">✦ House speciality</span>}
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className="bk-dishes__arrow bk-dishes__arrow--next" aria-label="Next dishes" disabled={edges.end} onClick={() => page(1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="bk-dishes__dots">
        {dishes.map((d, i) => (
          <button key={d.name} type="button" className={cx('bk-dishes__dot', i === active && 'is-active')} aria-label={`Show ${d.name}`} aria-current={i === active ? 'true' : undefined} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}
