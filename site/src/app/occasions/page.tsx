import { occasions } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { romanNumerals } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StoryBlock } from '@/components/sections/StoryBlock';
import { PageSection, Stack } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'Occasions',
  description: 'Private dining, family celebrations and corporate lunches at Baro Kuthi, all arranged personally by telephone.',
  path: '/occasions/',
});

/** §10 Occasions — private dining, family celebrations, corporate lunches; how arrangements work (all by phone). */
export default function OccasionsPage() {
  return (
    <div className="pg-page">
      <PageSection flushBottom>
        <SectionHeading size="h1" as="h1" eyebrow="Occasions" title="Occasions of the House" lead="Private dinners, family gatherings and midday tables, all arranged by telephone." />
      </PageSection>
      <PageSection>
        <div className="flex flex-col gap-32 max-md:gap-24">
          {occasions.details.map((o, i) => (
            <StoryBlock key={o.title} eyebrow={o.eyebrow} numeral={romanNumerals[i]} title={o.title} image={o.image} imageAlt={o.imageAlt} reverse={i % 2 === 1}>
              <p>{o.text}</p>
            </StoryBlock>
          ))}
        </div>
      </PageSection>
      <PageSection tone="alt">
        <Stack>
          <SectionHeading eyebrow="How It Works" title="How an Occasion Is Arranged" lead="Everything is settled by telephone, with the host, in person." />
          <ol className="m-0 grid list-none grid-cols-1 gap-[var(--card-gap)] p-0 lg:grid-cols-3">
            {occasions.steps.map((s) => (
              <li key={s.numeral} className="pg-step">
                <span className="pg-step__n" aria-hidden="true">
                  {s.numeral}
                </span>
                <h3 className="pg-step__title">{s.title}</h3>
                <p className="pg-step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </Stack>
      </PageSection>
      <Reservation />
    </div>
  );
}
