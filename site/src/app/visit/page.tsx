import { faqs, site } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LeaderList } from '@/components/page/LeaderList';
import { MapEmbed } from '@/components/page/MapEmbed';
import { PageSection, Split } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'Visit',
  description: 'How to find Baro Kuthi in Paikpara, Kolkata — hours, directions, parking, dress code and questions guests ask.',
  path: '/visit/',
});

/** §10 Visit — click-to-load map, address, hours, directions, parking, dress code, etiquette, FAQs. */
export default function VisitPage() {
  return (
    <div className="pg-page">
      <PageSection flushBottom>
        <SectionHeading size="h1" as="h1" eyebrow="Visit" title="Visit the House" lead="The house receives guests from 7 pm. Tables are arranged by telephone." />
      </PageSection>
      <PageSection>
        <Split
          ratio="7-4"
          first={<MapEmbed src={site.mapEmbed} address={site.address.lines.join(', ')} />}
          second={
            <div className="pg-visit flex flex-col gap-12">
              <div>
                <Eyebrow as="h2">Address</Eyebrow>
                <address className="pg-visit__text not-italic">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </div>
              <div>
                <Eyebrow as="h2">Hours</Eyebrow>
                <LeaderList rows={site.hours} />
              </div>
              <div>
                <Eyebrow as="h2">Getting here</Eyebrow>
                <LeaderList rows={site.gettingHere} />
              </div>
            </div>
          }
        />
      </PageSection>
      <PageSection tone="alt">
        <Split
          first={<SectionHeading eyebrow="House Etiquette" title="Questions Guests Ask" lead="If your question is not here, the host will be glad to answer it." />}
          second={
            <dl className="pg-faq">
              {faqs.map((f) => (
                <div key={f.q} className="pg-faq__item">
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          }
        />
      </PageSection>
      <Reservation />
    </div>
  );
}
