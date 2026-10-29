import type { ReactNode } from 'react';
import { faqs, site } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { v } from '@/lib/asset';
import { PhoneIcon } from '@/lib/utils';
import { Hero } from '@/components/sections/Hero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { MapEmbed } from '@/components/page/MapEmbed';
import { OpenStatus } from '@/components/page/OpenStatus';
import { PageSection, Stack } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'Visit',
  description: 'How to find Baro Kuthi in Paikpara, Kolkata — hours, directions, parking, dress code and questions guests ask.',
  path: '/visit/',
});

/** Line icons (Lucide-style, brand stroke) for the info cards and the getting-here rows. */
function Icon({ name }: { name: 'pin' | 'clock' | 'train' | 'car' | 'shirt' }) {
  const paths: Record<string, ReactNode> = {
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    train: (
      <>
        <rect x="5" y="3" width="14" height="13" rx="3" />
        <path d="M5 11h14M9 20l-2 2M15 20l2 2M8.5 16v.01M15.5 16v.01" />
      </>
    ),
    car: (
      <>
        <path d="M5 17h14v-5l-2-5H7l-2 5v5Z" />
        <path d="M5 12h14M7.5 17v2M16.5 17v2" />
      </>
    ),
    shirt: <path d="M8 3 4 6l2 4 2-1v12h8V9l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3Z" />,
  };
  return (
    <svg className="pg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

const GETTING_ICON: Record<string, 'train' | 'car' | 'shirt'> = { Metro: 'train', Parking: 'car', 'Dress code': 'shirt' };

/**
 * §10 Visit — photo hero → three info cards (address, hours with a live open/closed badge, reach the host) →
 * click-to-load map beside "getting here" → questions guests ask (tap to open) → reservation.
 */
export default function VisitPage() {
  return (
    <div className="pg-page">
      <Hero
        slides={[{ src: v('/images/slide2.webp')!, alt: 'The Baro Kuthi façade at dusk, lit for the evening' }]}
        alpona
        height="64svh"
        eyebrow="Visit"
        title="Visit the House"
        lead="Paikpara, Kolkata. The house receives guests from 7 pm; tables are arranged by telephone."
        primaryAction={{ label: 'Get Directions', href: site.mapHref }}
        secondaryAction={{ label: 'Telephone the Host', href: site.phone.href }}
      />

      <PageSection className="pg-visit-cards-section">
        <ul className="pg-infocards">
          <li className="pg-infocard">
            <span className="pg-infocard__seal">
              <Icon name="pin" />
            </span>
            <h2 className="pg-infocard__title">Address</h2>
            <address className="pg-infocard__text">
              {site.address.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <TextLink href={site.mapHref} target="_blank" rel="noopener">
              Get directions
            </TextLink>
          </li>
          <li className="pg-infocard">
            <span className="pg-infocard__seal">
              <Icon name="clock" />
            </span>
            <h2 className="pg-infocard__title">Hours</h2>
            <OpenStatus hours={site.hours} />
            <dl className="pg-infocard__hours">
              {site.hours.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
          </li>
          <li className="pg-infocard">
            <span className="pg-infocard__seal">
              <PhoneIcon />
            </span>
            <h2 className="pg-infocard__title">Reach the Host</h2>
            <a className="pg-infocard__phone" href={site.phone.href}>
              {site.phone.display}
            </a>
            <a className="pg-infocard__mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <TextLink href={site.whatsapp} target="_blank" rel="noopener">
              Message on WhatsApp
            </TextLink>
          </li>
        </ul>
      </PageSection>

      <PageSection tone="alt">
        <div className="pg-findus">
          <div className="pg-findus__map">
            <MapEmbed src={site.mapEmbed} address={site.address.lines.join(', ')} />
          </div>
          <div className="pg-findus__aside">
            <SectionHeading eyebrow="Finding the House" title="Getting Here" lead="The gate is on the street side; the host will meet you there." />
            <ul className="pg-getting">
              {site.gettingHere.map((g) => (
                <li key={g.label} className="pg-getting__row">
                  <span className="pg-getting__icon">
                    <Icon name={GETTING_ICON[g.label] || 'pin'} />
                  </span>
                  <span>
                    <span className="pg-getting__label">{g.label}</span>
                    <span className="pg-getting__value">{g.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <Stack>
          <SectionHeading align="center" eyebrow="House Etiquette" title="Questions Guests Ask" lead="If your question is not here, the host will be glad to answer it." />
          <div className="pg-faq-list">
            {faqs.map((f, i) => (
              <details key={f.q} className="pg-faq-item" open={i === 0}>
                <summary className="pg-faq-item__q">
                  <span>{f.q}</span>
                  <span className="pg-faq-item__mark" aria-hidden="true" />
                </summary>
                <p className="pg-faq-item__a">{f.a}</p>
              </details>
            ))}
          </div>
        </Stack>
      </PageSection>

      <Reservation />
    </div>
  );
}
