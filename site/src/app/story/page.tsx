import { story } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { StoryBlock } from '@/components/sections/StoryBlock';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { CentredNote, PageSection } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'The Story',
  description: 'Baro Kuthi, a zamindar’s house in Paikpara since 1823, and the evenings it has kept.',
  path: '/story/',
});

/** §10 The Story — archival hero → timeline (1823 → today) with alternating arches → pull quotes → CTA to menu. */
export default function StoryPage() {
  return (
    <div className="pg-page">
      <Hero height="72svh" eyebrow="The Story · Est. 1823" title="The House at Paikpara" lead="A zamindar’s house, and the evenings it has kept." imageAlt="Archival illustration of the Baro Kuthi façade" />
      <PageSection>
        <div className="flex flex-col gap-32 max-md:gap-24">
          {story.chapters.map((c, i) => (
            <StoryBlock key={c.year} year={c.year} title={c.title} reverse={i % 2 === 1} image={c.image} imageAlt={c.imageAlt} quote={c.quote}>
              {c.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </StoryBlock>
          ))}
        </div>
      </PageSection>
      <Divider space={0} />
      <PageSection>
        <CentredNote line="The story continues at the table.">
          <Button variant="secondary" href="/menu/">
            View the Menu
          </Button>
        </CentredNote>
      </PageSection>
      <Reservation />
    </div>
  );
}
