import { courses, menu, occasions, reviews, rooms, site, story } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { InvitationIntro } from '@/components/layout/InvitationIntro';
import { Hero } from '@/components/sections/Hero';
import { InfoStrip } from '@/components/sections/InfoStrip';
import { StoryBlock } from '@/components/sections/StoryBlock';
import { MenuBook } from '@/components/sections/MenuBook';
import { RoomRow } from '@/components/sections/RoomRow';
import { OccasionBand } from '@/components/sections/OccasionBand';
import { GuestBook } from '@/components/sections/GuestBook';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { Divider } from '@/components/ui/Divider';
import { PageSection, Stack } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({ path: '/' });

/** §10 Home — Invitation → Gate → Courtyard (I) → Two Tables (II) → Rooms (III) → Occasions (IV) → Guest Book (V) → Reserve (VI). */
export default function HomePage() {
  return (
    <>
      {/* Outside .pg-page: its fade animation creates a stacking context that would trap the overlay under the header. */}
      <InvitationIntro />
      <div className="pg-page">
        <Hero
          slides={[
            { src: '/images/slide1.webp', alt: 'The Baro Kuthi façade at dusk, lit for the evening' },
            { src: '/images/slide2.webp', alt: 'The hall with its chandeliers lit, seen through an old window' },
            { src: '/images/slide3.webp', alt: 'The rooftop terrace and courtyard from above at night' },
          ]}
          alpona
          eyebrow="Est. 1823 · Paikpara, Kolkata"
          title="The Rajbari Table"
          lead="The house receives guests for dinner from 7 pm."
          primaryAction={{ label: 'Reserve by Telephone', href: site.phone.href }}
          secondaryAction={{ label: 'View the Menu', href: '/menu/' }}
        />
        <InfoStrip hours={site.hoursLine} address={site.address.short} mapHref={site.mapHref} phone={site.phone} whatsappHref={site.whatsapp} />

        <PageSection flushBottom className="overflow-x-clip">
          <StoryBlock
            numeral="I"
            eyebrow="The Courtyard"
            title="A House of 1823"
            image="/images/courtyard.webp"
            imageShape="landscape"
            imageAlt="The Baro Kuthi courtyard at night: the white façade strung with lights, lantern-lit tables under umbrellas"
            featured
            seal={['Since', '1823']}
            facts={[
              { value: String(rooms.length), label: 'Dining rooms' },
              { value: String(menu.tables.length), label: 'Kitchens' },
              { value: String(courses.length), label: 'Courses' },
            ]}
            watermark="/images/jhar-bati-watermark.webp"
            action={{ label: 'Read the full story', href: '/story/' }}
          >
            <p>{story.homeExcerpt}</p>
          </StoryBlock>
        </PageSection>
        <Divider />
        <PageSection flushTop>
          <Stack>
            <SectionHeading numeral="II" eyebrow="The Two Tables" title="A Bengali Table and a Sahib’s Table" lead="Two kitchens of the house, served side by side." />
            <MenuBook pages={menu.tables} currency={menu.currency} limit={4} footer={<TextLink href="/menu/">View the full menu</TextLink>} />
          </Stack>
        </PageSection>

        <PageSection>
          <Stack>
            <SectionHeading numeral="III" eyebrow="The Rooms of the House" title="Four Rooms, Four Evenings" lead="Each room of the house keeps its own hour and its own table." />
            <RoomRow rooms={rooms.map((r) => ({ name: r.name, eyebrow: r.eyebrow, description: r.description, image: r.image, imageAlt: r.imageAlt, action: { label: 'See the room', href: `/rooms/#${r.slug}` } }))} />
          </Stack>
        </PageSection>

        <OccasionBand
          heading={{ numeral: 'IV', eyebrow: 'Occasions of the House', title: 'Celebrations, Arranged by the House', lead: 'Private dinners, family gatherings and midday tables for colleagues.' }}
          items={occasions.band}
          action={{ label: 'Arrange an Occasion', href: '/occasions/' }}
        />

        <PageSection tone="alt">
          <Stack>
            <SectionHeading numeral="V" eyebrow="The Guest Book" title="From the Guest Book" lead="Words left by guests of the house, quoted as written." />
            <GuestBook reviews={reviews} />
          </Stack>
        </PageSection>

        <Reservation home />
      </div>
    </>
  );
}
