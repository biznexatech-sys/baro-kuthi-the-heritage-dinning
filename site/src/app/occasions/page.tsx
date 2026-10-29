import { occasions, site } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { v } from '@/lib/asset';
import { cx, romanNumerals } from '@/lib/utils';
import { Hero } from '@/components/sections/Hero';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageSection, Stack } from '@/components/page/PageSection';
import { SectionNav } from '@/components/page/SectionNav';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'Occasions',
  description: 'Private dining, family celebrations and corporate lunches at Baro Kuthi, all arranged personally by telephone.',
  path: '/occasions/',
});

/**
 * §10 Occasions — photo hero → sticky section bar → one split section per occasion (arch-framed photograph, figures,
 * enquire buttons; same layout as the Rooms page) → how an occasion is arranged (three steps on the terracotta band)
 * → reservation.
 */
export default function OccasionsPage() {
  const nav = [...occasions.details.map((o) => ({ id: o.slug, label: o.title })), { id: 'how-it-works', label: 'How It Works' }];
  return (
    <div className="pg-page">
      <Hero
        slides={[{ src: v('/images/courtyard.webp')!, alt: 'The courtyard laid for an evening, the white façade strung with lights' }]}
        alpona
        height="64svh"
        eyebrow="Occasions"
        title="Occasions of the House"
        lead="Private dinners, family gatherings and midday tables, all arranged by telephone."
        primaryAction={{ label: 'Telephone the Host', href: site.phone.href }}
        secondaryAction={{ label: 'Message on WhatsApp', href: site.whatsapp }}
      />

      <SectionNav items={nav} label="Occasions" />

      {occasions.details.map((o, i) => (
        <PageSection key={o.slug} id={o.slug} tone={i % 2 ? 'alt' : 'light'} className="pg-room-section">
          <article className={cx('pg-room', i % 2 === 1 && 'pg-room--reverse')}>
            <div className="pg-room__media">
              <div className="pg-room__arch">
                {o.image ? (
                  <img className="pg-room__img" src={o.image} alt={o.imageAlt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                ) : (
                  <div className="pg-room__panel" role="img" aria-label={o.imageAlt}>
                    <img className="pg-room__lotus" src={v('/images/medallion.webp')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                    <span className="pg-room__panel-num" aria-hidden="true">
                      {romanNumerals[i]}
                    </span>
                  </div>
                )}
              </div>
              {o.image && (
                <span className="pg-room__seal" aria-hidden="true">
                  {romanNumerals[i]}
                </span>
              )}
            </div>

            <div className="pg-room__body">
              <Eyebrow numeral={romanNumerals[i]}>{o.eyebrow}</Eyebrow>
              <h2 className="pg-room__name">{o.title}</h2>
              <p className="pg-room__text">{o.text}</p>
              {o.facts && (
                <dl className="pg-room__facts">
                  {o.facts.map((f) => (
                    <div key={f.label} className="pg-room__fact">
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="pg-room__actions">
                <Button variant="primary" href={site.phone.href}>
                  Enquire by Telephone
                </Button>
                <TextLink href={site.whatsapp} target="_blank" rel="noopener">
                  WhatsApp
                </TextLink>
              </div>
            </div>
          </article>
        </PageSection>
      ))}

      <PageSection tone="band" id="how-it-works" className="pg-room-section">
        <Stack>
          <SectionHeading tone="dark" numeral="IV" eyebrow="How It Works" title="How an Occasion Is Arranged" lead="Everything is settled by telephone, with the host, in person." />
          <ol className="pg-steps">
            {occasions.steps.map((s) => (
              <li key={s.numeral} className="pg-steps__item">
                <span className="pg-steps__seal" aria-hidden="true">
                  {s.numeral}
                </span>
                <h3 className="pg-steps__title">{s.title}</h3>
                <p className="pg-steps__text">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="pg-steps__cta">
            <Button variant="on-dark" href={site.phone.href}>
              Telephone the Host · {site.phone.display}
            </Button>
          </div>
        </Stack>
      </PageSection>

      <Reservation />
    </div>
  );
}
