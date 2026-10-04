'use client';
import { useEffect, useRef, useState } from 'react';
import type { Review } from '@/lib/content';
import { cx } from '@/lib/utils';
import { TextLink } from '@/components/ui/TextLink';
import { AlponaCorner } from '@/components/ui/Alpona';

/**
 * §9.12 — guest-book cards. Real reviews only, quoted exactly, each with its source link.
 * Desktop: three cards in a row. Below 1200px: a swipeable scroll-snap row (two cards on tablet, one and a peek on phones)
 * with arrows and dots underneath. Stars render only when a review carries a real `rating`.
 */
export function GuestBook({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const on = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
      setActive(Math.min(reviews.length - 1, Math.round(track.scrollLeft / step)));
      setEdges({ start: track.scrollLeft < 4, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4 });
    };
    on();
    track.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      track.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [reviews.length]);

  const scrollToCard = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div className="bk-guestbook-wrap">
      <div ref={trackRef} className="bk-guestbook" role="list">
        {reviews.map((r, i) => (
          <figure key={i} className="bk-guest" role="listitem">
            <AlponaCorner className="bk-guest__ornament" />
            <span className="bk-guest__mark" aria-hidden="true">“</span>
            {typeof r.rating === 'number' && (
              <p className="bk-guest__stars" aria-label={`Rated ${r.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <span key={s} className={cx('bk-guest__star', s < Math.round(r.rating!) && 'is-on')} aria-hidden="true">★</span>
                ))}
              </p>
            )}
            <blockquote className="bk-guest__quote">{r.quote}</blockquote>
            <figcaption className="bk-guest__foot">
              <span className="bk-guest__avatar" aria-hidden="true">{r.name.trim().charAt(0)}</span>
              <span className="bk-guest__who">
                <span className="bk-guest__name">{r.name}</span>
                {r.date && <span className="bk-guest__date">{r.date}</span>}
              </span>
              {r.href && (
                <TextLink className="bk-guest__source" href={r.href} target="_blank" rel="noopener">
                  {r.source || 'Google review'}
                </TextLink>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="bk-guestbook__nav">
          <button type="button" className="bk-guestbook__arrow" aria-label="Previous review" disabled={edges.start} onClick={() => scrollToCard(Math.max(0, active - 1))}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="bk-guestbook__dots">
            {reviews.map((_, i) => (
              <button key={i} type="button" className={cx('bk-guestbook__dot', i === active && 'is-active')} aria-label={`Show review ${i + 1}`} aria-current={i === active ? 'true' : undefined} onClick={() => scrollToCard(i)} />
            ))}
          </div>
          <button type="button" className="bk-guestbook__arrow" aria-label="Next review" disabled={edges.end} onClick={() => scrollToCard(Math.min(reviews.length - 1, active + 1))}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
