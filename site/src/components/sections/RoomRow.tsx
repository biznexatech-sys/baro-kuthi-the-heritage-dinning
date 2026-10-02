'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RoomCard, type RoomCardProps } from './RoomCard';

export type RoomRowProps = { rooms: RoomCardProps[] };

/**
 * §9.10 — four columns on desktop, two on tablet; below 768px CSS turns the row into a horizontal swipe
 * with a copper progress line (no auto-play).
 */
export function RoomRow({ rooms }: RoomRowProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ left: 0, size: 100 });
  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const size = el.scrollWidth ? (el.clientWidth / el.scrollWidth) * 100 : 100;
    setBar({ size, left: max > 0 ? (el.scrollLeft / max) * (100 - size) : 0 });
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, rooms.length]);
  return (
    <div className="bk-rooms">
      <div ref={scroller} className="bk-rooms__scroller" onScroll={measure}>
        {rooms.map((r) => (
          <RoomCard key={r.name} {...r} />
        ))}
      </div>
      <div className="bk-rooms__progress" aria-hidden="true">
        <span className="bk-rooms__thumb" style={{ left: bar.left + '%', width: bar.size + '%' }} />
      </div>
    </div>
  );
}
