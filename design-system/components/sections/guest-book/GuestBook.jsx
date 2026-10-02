import React from 'react';
import { cx, useCompact } from '../../lib/helpers.js';
import { TextLink } from '../../ui/actions/TextLink.jsx';

export function GuestBook({ reviews = [], layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  return (
    <div ref={ref} className={cx('bk-guestbook', compact && 'bk-compact', className)} style={style}>
      {reviews.map((r, i) => (
        <figure key={i} className="bk-guest">
          {r.date && <p className="bk-guest__date">{r.date}</p>}
          <blockquote className="bk-guest__quote">“{r.quote}”</blockquote>
          <figcaption className="bk-guest__foot">
            <span className="bk-guest__name">{r.name}</span>
            {r.href && <TextLink href={r.href} target="_blank" rel="noopener">{r.source || 'Google review'}</TextLink>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
