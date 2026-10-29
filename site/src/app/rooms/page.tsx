import { rooms, site } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { v } from '@/lib/asset';
import { cx, romanNumerals } from '@/lib/utils';
import { Hero } from '@/components/sections/Hero';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { CentredNote, PageSection } from '@/components/page/PageSection';
import { SectionNav } from '@/components/page/SectionNav';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'The Rooms',
  description: 'The Verandah, the Jalsaghar, the Thakur-dalan Courtyard and the Zamindar’s Study — four rooms, each with its own hour and table.',
  path: '/rooms/',
});

/**
 * §10 The Rooms — photo hero → sticky room bar → one split section per room (arch-framed photograph or lotus panel,
 * alternating sides; name, description, three figures, reserve button) → private occasions note → reservation.
 */
export default function RoomsPage() {
  return (
    <div className="pg-page">
      <Hero
        slides={[{ src: v('/images/boroKuthi_bari.webp')!, alt: 'The house dressed for an evening: a flower-decked gate and the lit façade' }]}
        alpona
        height="64svh"
        eyebrow="The Rooms"
        title="Four Rooms, Four Evenings"
        lead="Each room of the house keeps its own hour, light and table."
        primaryAction={{ label: 'Reserve by Telephone', href: site.phone.href }}
      />

      <SectionNav items={rooms.map((r) => ({ id: r.slug, label: r.name }))} label="The rooms" />

      {rooms.map((r, i) => (
        <PageSection key={r.slug} id={r.slug} tone={i % 2 ? 'alt' : 'light'} className="pg-room-section">
          <article className={cx('pg-room', i % 2 === 1 && 'pg-room--reverse')}>
            <div className="pg-room__media">
              <div className="pg-room__arch">
                {r.image ? (
                  <img className="pg-room__img" src={r.image} alt={r.imageAlt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                ) : (
                  <div className="pg-room__panel" role="img" aria-label={r.imageAlt}>
                    <img className="pg-room__lotus" src={v('/images/medallion.webp')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                    <span className="pg-room__panel-num" aria-hidden="true">
                      {romanNumerals[i]}
                    </span>
                  </div>
                )}
              </div>
              {r.image && (
                <span className="pg-room__seal" aria-hidden="true">
                  {romanNumerals[i]}
                </span>
              )}
            </div>

            <div className="pg-room__body">
              <Eyebrow numeral={romanNumerals[i]}>{r.eyebrow}</Eyebrow>
              <h2 className="pg-room__name">{r.name}</h2>
              <p className="pg-room__text">{r.text}</p>
              <dl className="pg-room__facts">
                <div className="pg-room__fact">
                  <dt>Seats</dt>
                  <dd>{r.capacity}</dd>
                </div>
                <div className="pg-room__fact">
                  <dt>Best</dt>
                  <dd>{r.best}</dd>
                </div>
                <div className="pg-room__fact">
                  <dt>Suits</dt>
                  <dd>{r.occasions}</dd>
                </div>
              </dl>
              <div className="pg-room__actions">
                <Button variant="primary" href={site.phone.href}>
                  Reserve this room
                </Button>
                <TextLink href="/menu/">See the menu</TextLink>
              </div>
            </div>
          </article>
        </PageSection>
      ))}

      <PageSection tone="band" className="py-[clamp(64px,7vw,104px)]!">
        <CentredNote line={<span className="pg-rooms-note">The whole house, or any one room, may be arranged for a private evening.</span>}>
          <Button variant="on-dark" href="/occasions/">
            Arrange an Occasion
          </Button>
        </CentredNote>
      </PageSection>

      <Reservation />
    </div>
  );
}
