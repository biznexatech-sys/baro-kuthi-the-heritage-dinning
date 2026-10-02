import type { Review } from '@/lib/content';
import { TextLink } from '@/components/ui/TextLink';

/** §9.12 — ruled guest-book cards. Real reviews only, quoted exactly, each with its source link. */
export function GuestBook({ reviews }: { reviews: Review[] }) {
  return (
    <div className="bk-guestbook">
      {reviews.map((r, i) => (
        <figure key={i} className="bk-guest">
          {r.date && <p className="bk-guest__date">{r.date}</p>}
          <blockquote className="bk-guest__quote">“{r.quote}”</blockquote>
          <figcaption className="bk-guest__foot">
            <span className="bk-guest__name">{r.name}</span>
            {r.href && (
              <TextLink href={r.href} target="_blank" rel="noopener">
                {r.source || 'Google review'}
              </TextLink>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
