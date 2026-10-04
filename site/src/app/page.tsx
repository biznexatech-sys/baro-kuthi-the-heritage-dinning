import { courses, menu, occasions, reviews, rooms, signatureDishes, site, story } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { InvitationIntro } from '@/components/layout/InvitationIntro';
import { Hero } from '@/components/sections/Hero';
import { InfoStrip } from '@/components/sections/InfoStrip';
import { StoryBlock } from '@/components/sections/StoryBlock';
import { MenuBook } from '@/components/sections/MenuBook';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { OccasionBand } from '@/components/sections/OccasionBand';
import { GuestBook } from '@/components/sections/GuestBook';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { PageSection, Stack } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({ path: '/' });

/** §10 Home — Invitation → Gate → Courtyard (I) → Two Tables (II) → Signature Dishes (III) → Occasions (IV) → Guest Book (V) → Reserve (VI). */
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

        <PageSection className="overflow-x-clip">
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
        <PageSection tone="band">
          <Stack>
            <SectionHeading tone="dark" numeral="II" eyebrow="The Two Tables" title="A Bengali Table and a Sahib’s Table" lead="Two kitchens of the house, served side by side." />
            <MenuBook pages={menu.tables} currency={menu.currency} limit={4} footer={<TextLink href="/menu/">View the full menu</TextLink>} />
          </Stack>
        </PageSection>

        <PageSection>
          <Stack>
            <SectionHeading align="center" numeral="III" eyebrow="From the Kitchens" title="Our Signature Dishes" lead="The dishes the house is known for, from the Bengali table and the Sahib’s." />
            <SignatureDishes dishes={signatureDishes} />
          </Stack>
        </PageSection>

        <OccasionBand
          heading={{ numeral: 'IV', eyebrow: 'Occasions of the House', title: 'Celebrations, Arranged by the House', lead: 'Private dinners, family gatherings and midday tables for colleagues.' }}
          items={occasions.band}
          action={{ label: 'Arrange an Occasion', href: '/occasions/' }}
          itemAction={{ label: 'Arrange this', href: '/occasions/' }}
        />

        <PageSection
          tone="alt"
          className="py-[clamp(64px,6.5vw,96px)]!"
          decor={<img className="pg-medallion pg-medallion--right" src="/images/medallion.webp" alt="" aria-hidden="true" width={720} height={720} loading="lazy" decoding="async" />}
        >
          <Stack className="gap-[clamp(28px,3vw,40px)]!">
            <SectionHeading align="center" ornament={false} className="pg-guest-heading" numeral="V" eyebrow="The Guest Book" title="From the Guest Book" lead="Words left by guests of the house, quoted as written." />
            <GuestBook reviews={reviews} />
          </Stack>
        </PageSection>

        <Reservation home />
      </div>
    </>
  );
}
