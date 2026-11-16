import { menu, signatureDishes, site } from '@/lib/content';
import { jsonLdScript, menuJsonLd, pageMetadata } from '@/lib/seo';
import { v } from '@/lib/asset';
import { Hero } from '@/components/sections/Hero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MenuPages } from '@/components/sections/MenuPages';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { Button } from '@/components/ui/Button';
import { CentredNote, PageSection, Stack } from '@/components/page/PageSection';
import { SectionNav } from '@/components/page/SectionNav';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'The Menu',
  description: 'The Bengali menu of Baro Kuthi Rajbari — starters, fish, ilish and prawn, chicken and mutton, the Zamindari signature collection, Rajbari thalis and desserts.',
  path: '/menu/',
});

const SECTIONS = [
  { id: 'the-menu', label: 'The Menu' },
  { id: 'signature', label: 'Signature Dishes' },
];

/**
 * §10 The Menu — photo hero → sticky section bar → the printed menu, page for page (parchment stamps on the terracotta
 * band, text exactly as printed) → signature dishes → PDF download → reservation.
 */
export default function MenuPage() {
  return (
    <div className="pg-page">
      <Hero
        slides={[{ src: v('/images/slide1.webp')!, alt: 'The dining hall under its chandeliers, tables laid for the evening' }]}
        alpona
        height="64svh"
        eyebrow="The Menu"
        title="From the Kitchens of the House"
        lead="The Bengali table of the Rajbari — from the fish fry to the Zamindari thali."
        primaryAction={{ label: 'Reserve by Telephone', href: site.phone.href }}
      />

      <SectionNav items={SECTIONS} label="Menu sections" />

      <PageSection tone="band" id="the-menu">
        <Stack>
          <SectionHeading tone="dark" align="center" numeral="I" eyebrow="The Menu" title="The Rajbari Table" lead="Every page of the house menu, as it is printed — turn the pages or pick a section." />
          <MenuPages
            categories={menu.categories}
            currency={menu.currency}
            gstNote={menu.gstNote}
            illustrationSrc={(n) => v(`/images/menu/${n}.webp`)}
          />
        </Stack>
      </PageSection>

      <PageSection id="signature">
        <Stack>
          <SectionHeading align="center" numeral="II" eyebrow="From the Kitchens" title="Signature Dishes" lead="The dishes the house is known for." />
          <SignatureDishes dishes={signatureDishes} currency="₹" />
        </Stack>
      </PageSection>

      {site.menuPdf && (
        <PageSection tone="alt" className="py-[clamp(56px,6vw,88px)]!">
          <CentredNote line="Prices in rupees; GST will be charged extra. Fish is served subject to the day’s market.">
            <Button variant="secondary" href={site.menuPdf} target="_blank" rel="noopener">
              Download the Menu · PDF
            </Button>
          </CentredNote>
        </PageSection>
      )}
      <Reservation />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(menuJsonLd())} />
    </div>
  );
}
