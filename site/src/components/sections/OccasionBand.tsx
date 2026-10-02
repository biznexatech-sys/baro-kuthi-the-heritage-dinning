import { renderMotif } from '@/lib/utils';
import type { Action, OccasionItem } from '@/lib/content';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export type OccasionBandProps = {
  heading: SectionHeadingProps;
  items: OccasionItem[];
  action?: Action;
  /** checker.svg — tiled at 4% opacity. */
  checker?: string;
};

/** §9.11 — full-bleed terracotta band, centred heading block, three occasions with terracotta-panel icons. */
export function OccasionBand({ heading, items, action, checker }: OccasionBandProps) {
  return (
    <section className="bk-occasion">
      {checker && <div className="bk-occasion__texture" style={{ backgroundImage: `url("${checker}")` }} aria-hidden="true" />}
      <div className="bk-occasion__inner">
        <SectionHeading tone="terracotta" align="center" {...heading} />
        <ul className="bk-occasion__items">
          {items.map((it) => (
            <li key={it.title} className="bk-occasion__item">
              <span className="bk-niche" aria-hidden="true">
                {renderMotif(it.icon)}
              </span>
              <h3 className="bk-occasion__title">{it.title}</h3>
              <p className="bk-occasion__text">{it.text}</p>
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
