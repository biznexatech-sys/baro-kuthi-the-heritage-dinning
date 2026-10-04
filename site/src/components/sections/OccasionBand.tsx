import { cx, renderMotif, romanNumerals } from '@/lib/utils';
import type { Action, OccasionItem } from '@/lib/content';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { AlponaCorner } from '@/components/ui/Alpona';

export type OccasionBandProps = {
  heading: SectionHeadingProps;
  items: OccasionItem[];
  action?: Action;
  /** Per-card link, e.g. { label: 'Arrange this', href: '/occasions/' }. */
  itemAction?: Action;
  /** checker.svg — tiled at 4% opacity. */
  checker?: string;
};

/**
 * §9.11 — full-bleed terracotta band (candle-lit: gradient, jaali, copper rules, alpona corners), centred heading,
 * three occasion cards: an arch-topped photograph in a copper frame, a numbered seal, title, copy and a link.
 * Items without an image fall back to the terracotta-panel niche icon.
 */
export function OccasionBand({ heading, items, action, itemAction, checker }: OccasionBandProps) {
  return (
    <section className="bk-occasion pg-band">
      {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
        <AlponaCorner key={c} className={'pg-band__corner pg-band__corner--' + c} />
      ))}
      {checker && <div className="bk-occasion__texture" style={{ backgroundImage: `url("${checker}")` }} aria-hidden="true" />}
      <div className="bk-occasion__inner">
        <SectionHeading tone="terracotta" align="center" {...heading} />
        <ul className="bk-occasion__items">
          {items.map((it, i) => (
            <li key={it.title} className={cx('bk-occasion__item', it.image && 'bk-occasion__item--card')}>
              {it.image ? (
                <div className="bk-occasion__media">
                  <div className="bk-occasion__arch">
                    <img className="bk-occasion__img" src={it.image} alt={it.imageAlt || ''} loading="lazy" decoding="async" />
                  </div>
                  <span className="bk-occasion__seal" aria-hidden="true">
                    {romanNumerals[i]}
                  </span>
                </div>
              ) : (
                <span className="bk-niche" aria-hidden="true">
                  {renderMotif(it.icon)}
                </span>
              )}
              <div className="bk-occasion__body">
                <h3 className="bk-occasion__title">{it.title}</h3>
                <p className="bk-occasion__text">{it.text}</p>
                {itemAction && (
                  <TextLink tone="dark" href={itemAction.href} className="bk-occasion__link">
                    {itemAction.label}
                  </TextLink>
                )}
              </div>
            </li>
          ))}
        </ul>
        {action && (
          <div className="bk-occasion__action">
            <Button variant="on-dark" href={action.href}>
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
