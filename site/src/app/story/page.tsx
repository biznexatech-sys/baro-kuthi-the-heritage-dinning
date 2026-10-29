import { site, story } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { v } from '@/lib/asset';
import { cx } from '@/lib/utils';
import { Hero } from '@/components/sections/Hero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { CentredNote, PageSection, Stack } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'The Story',
  description: 'Baro Kuthi, a zamindar’s house in Paikpara since 1823, and the evenings it has kept.',
  path: '/story/',
});

/** Present-day photographs for chapters that describe the house as it is now (never used for historic chapters). */
const TODAY_IMAGE = '/images/slide1.webp';

/**
 * §10 The Story — photo hero → the house in brief (seal + chandelier watermark) → a timeline down a copper line,
 * one card per chapter alternating sides (year marker, title, text, pull quote; "in preparation" tag on drafts) →
 * closing band → reservation. Chapter text is the family's own and is shown exactly as written in story.json.
 */
export default function StoryPage() {
  return (
    <div className="pg-page">
      <Hero
        slides={[{ src: v('/images/gallery-20.webp')!, alt: 'Baro Kuthi from above: the white rajbari, its gateway and the rooftop terrace' }]}
        alpona
        height="64svh"
        eyebrow="The Story · Est. 1823"
        title="The House at Paikpara"
        lead="A zamindar’s house, and the evenings it has kept."
      />

      <PageSection className="pg-story-intro-section">
        <img className="pg-story-intro__jhar" src={v('/images/jhar-bati-watermark.webp')} alt="" aria-hidden="true" width={520} height={811} loading="lazy" decoding="async" />
        <div className="pg-story-intro">
          <span className="pg-story-intro__seal" aria-hidden="true">
            <span>Since</span>
            <strong>1823</strong>
          </span>
          <p className="pg-story-intro__text">{story.homeExcerpt}</p>
        </div>
      </PageSection>

      <PageSection tone="alt">
        <Stack>
          <SectionHeading align="center" eyebrow="Through the Years" title="The Chapters of the House" />
          <ol className="pg-timeline">
            {story.chapters.map((c, i) => {
              const image = c.image ? v(c.image) : c.year === 'Today' ? v(TODAY_IMAGE) : undefined;
              return (
                <li key={c.year + c.title} className={cx('pg-chapter', i % 2 === 1 && 'pg-chapter--right')}>
                  <span className="pg-chapter__marker" aria-hidden="true">
                    {c.year}
                  </span>
                  <article className="pg-chapter__card">
                    <div className="pg-chapter__media">
                      {image ? (
                        <img className="pg-chapter__img" src={image} alt={c.imageAlt} loading="lazy" decoding="async" />
                      ) : (
                        <div className="pg-chapter__panel" role="img" aria-label={c.imageAlt}>
                          <img className="pg-room__lotus" src={v('/images/medallion.webp')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                          <span className="pg-chapter__panel-year" aria-hidden="true">
                            {c.year}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="pg-chapter__body">
                      <p className="pg-chapter__year">{c.year}</p>
                      <h2 className="pg-chapter__title">{c.title}</h2>
                      {c.draft && <span className="pg-chapter__draft">In preparation</span>}
                      {c.body.map((p) => (
                        <p key={p} className="pg-chapter__text">
                          {p}
                        </p>
                      ))}
                      {c.quote && <blockquote className="pg-chapter__quote">{c.quote}</blockquote>}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Stack>
      </PageSection>

      <PageSection tone="band" className="py-[clamp(72px,8vw,120px)]!">
        <CentredNote line={<span className="pg-rooms-note">The story continues at the table.</span>}>
          <div className="pg-story-cta">
            <Button variant="on-dark" href="/menu/">
              View the Menu
            </Button>
            <Button variant="primary" href={site.phone.href}>
              Reserve by Telephone
            </Button>
          </div>
        </CentredNote>
      </PageSection>

      <Reservation />
    </div>
  );
}
