'use client';
import { useEffect, useState } from 'react';
import type { Hours } from '@/lib/content';
import { cx } from '@/lib/utils';

/** "19:00" → minutes after midnight. */
const mins = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

/** "23:00" → "11 pm", "12:30" → "12.30 pm" (the house writes times this way). */
const say = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  const h12 = h % 12 || 12;
  return `${h12}${m ? '.' + String(m).padStart(2, '0') : ''} ${h >= 12 ? 'pm' : 'am'}`;
};

/** Minutes after midnight right now in Kolkata, whatever the visitor's own time zone. */
function nowInKolkata() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (k: string) => Number(parts.find((p) => p.type === k)?.value || 0);
  return get('hour') * 60 + get('minute');
}

/**
 * A live "Open now / Closed" badge worked out from the house hours in Kolkata time. Rendered after mount only
 * (the static page cannot know the visitor's time), and refreshed every minute.
 */
export function OpenStatus({ hours }: { hours: Hours[] }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(nowInKolkata());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (now === null) return <p className="pg-open" aria-hidden="true" />;

  const sittings = hours.filter((h) => h.opens && h.closes);
  const open = sittings.filter((h) => now >= mins(h.opens!) && now < mins(h.closes!)).sort((a, b) => mins(b.closes!) - mins(a.closes!))[0];
  const next = sittings.filter((h) => mins(h.opens!) > now).sort((a, b) => mins(a.opens!) - mins(b.opens!))[0] || [...sittings].sort((a, b) => mins(a.opens!) - mins(b.opens!))[0];

  return (
    <p className={cx('pg-open', open ? 'is-open' : 'is-closed')} role="status">
      <span className="pg-open__dot" aria-hidden="true" />
      {open ? (
        <>
          <strong>Open now</strong> · {open.label} until {say(open.closes!)}
        </>
      ) : (
        <>
          <strong>Closed now</strong>
          {next && (
            <>
              {' '}
              · {next.label} from {say(next.opens!)}
            </>
          )}
        </>
      )}
    </p>
  );
}
