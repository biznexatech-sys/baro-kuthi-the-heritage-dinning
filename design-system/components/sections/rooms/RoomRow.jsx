import React from 'react';
import { cx, useCompact } from '../../lib/helpers.js';
import { RoomCard } from './RoomCard.jsx';

export function RoomRow({ rooms = [], layout = 'auto', className, style }) {
  const [ref, compact, width] = useCompact(layout);
  const scroller = React.useRef(null);
  const [bar, setBar] = React.useState({ left: 0, size: 100 });
  const cols = compact ? 0 : width < 1100 ? 2 : 4;
  const measure = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const size = el.scrollWidth ? (el.clientWidth / el.scrollWidth) * 100 : 100;
    setBar({ size, left: max > 0 ? (el.scrollLeft / max) * (100 - size) : 0 });
  };
  React.useEffect(() => { if (compact) measure(); }, [compact, rooms.length, width]);
  return (
    <div ref={ref} className={cx('bk-rooms', compact ? 'bk-rooms--swipe bk-compact' : 'bk-rooms--cols-' + cols, className)} style={style}>
      <div ref={scroller} className="bk-rooms__scroller" onScroll={compact ? measure : undefined}>
        {rooms.map((r, i) => <RoomCard key={r.name + i} {...r} />)}
      </div>
      {compact && (
        <div className="bk-rooms__progress" aria-hidden="true">
          <span className="bk-rooms__thumb" style={{ left: bar.left + '%', width: bar.size + '%' }} />
        </div>
      )}
    </div>
  );
}
