import { rooms } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { romanNumerals } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArchImage } from '@/components/ui/ArchImage';
import { LeaderList } from '@/components/page/LeaderList';
import { PageSection, Split } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'The Rooms',
  description: 'The Verandah, the Jalsaghar, the Thakur-dalan Courtyard and the Zamindar’s Study — four rooms, each with its own hour and table.',
  path: '/rooms/',
});

/** §10 The Rooms — one full section per room: wide photo, description, capacity, best time, occasions. */
export default function RoomsPage() {
  return (
    <div className="pg-page">
      <PageSection flushBottom>
        <SectionHeading size="h1" as="h1" eyebrow="The Rooms" title="The Rooms of the House" lead="Four rooms, each with its own hour, light and table." />
      </PageSection>
      {rooms.map((r, i) => (
        <PageSection key={r.slug} id={r.slug} tone={i % 2 ? 'alt' : 'light'} className="scroll-mt-[calc(var(--header-h-compact)+var(--lalpaar-h))]">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3.5">
              <Eyebrow numeral={romanNumerals[i]}>{r.eyebrow}</Eyebrow>
              <h2 className="pg-room-name">{r.name}</h2>
            </div>
            <ArchImage shape="cinema" src={r.image} alt={r.imageAlt} parallax />
            <Split
              ratio="7-4"
              first={
                <div className="pg-prose">
                  <p>{r.text}</p>
                </div>
              }
              second={
                <LeaderList
                  rows={[
                    { label: 'Seats', value: r.capacity },
                    { label: 'Best', value: r.best },
                    { label: 'Suits', value: r.occasions },
                  ]}
                />
              }
            />
          </div>
        </PageSection>
      ))}
      <Reservation />
    </div>
  );
}
