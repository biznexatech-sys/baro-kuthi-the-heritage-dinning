import type { Action } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

export type RoomCardProps = {
  name: string;
  /** Roman numeral shown on the seal (and on the panel when there is no photograph). */
  numeral?: string;
  eyebrow?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  /** Short facts shown as tags, e.g. ['Seats 40', 'Dusk', 'Dinners, anniversaries']. */
  facts?: string[];
  action?: Action;
};

/**
 * §9.10 — arch-topped photograph in a copper frame with a numbered seal; name, fact tags, one sentence, text link.
 * Without a photograph the arch shows a terracotta panel with the carved lotus and the room's numeral.
 */
export function RoomCard({ name, numeral, eyebrow, description, image, imageAlt, facts, action }: RoomCardProps) {
  return (
    <article className="bk-room">
      <div className="bk-room__media">
        <div className="bk-room__arch">
          {image ? (
            <img className="bk-room__img" src={image} alt={imageAlt || ''} loading="lazy" decoding="async" />
          ) : (
            <div className="bk-room__panel" role="img" aria-label={imageAlt || name}>
              <img className="bk-room__lotus" src="/images/medallion.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
              {numeral && <span className="bk-room__panel-num">{numeral}</span>}
            </div>
          )}
        </div>
        {numeral && image && (
          <span className="bk-room__seal" aria-hidden="true">
            {numeral}
          </span>
        )}
      </div>
      <div className="bk-room__body">
        <h3 className="bk-room__name">{name}</h3>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {facts && facts.length > 0 && (
          <ul className="bk-room__facts">
            {facts.map((f) => (
              <li key={f} className="bk-room__fact">
                {f}
              </li>
            ))}
          </ul>
        )}
        {description && <p className="bk-room__desc">{description}</p>}
        {action && <TextLink href={action.href}>{action.label}</TextLink>}
      </div>
    </article>
  );
}
