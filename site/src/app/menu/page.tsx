import { dishImage, menu, signatureDishes, site } from '@/lib/content';
import { jsonLdScript, menuJsonLd, pageMetadata } from '@/lib/seo';
import { v } from '@/lib/asset';
import { Hero } from '@/components/sections/Hero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MenuBook } from '@/components/sections/MenuBook';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { Button } from '@/components/ui/Button';
import { CentredNote, PageSection, Split, Stack } from '@/components/page/PageSection';
import { SectionNav } from '@/components/page/SectionNav';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'The Menu',
  description: 'The Bengali Table and the Sahib’s Table — the two kitchens of Baro Kuthi, with set menus and the Verandah café.',
  path: '/menu/',
});

const SECTIONS = [
  { id: 'two-tables', label: 'The Two Tables' },
  { id: 'signature', label: 'Signature Dishes' },
  { id: 'set-menus', label: 'Set Menus' },
  { id: 'verandah', label: 'The Verandah' },
];

/**
 * §10 The Menu — photo hero → sticky section bar → the Two Tables (full book, terracotta band) → signature dishes →
 * set menus as cards → the Verandah café → seasonal note → reservation.
 */
export default function MenuPage() {
  const verandahHours = site.hours.find((h) => h.label === 'The Verandah');
  return (
    <div className="pg-page">
      <Hero
        slides={[{ src: v('/images/slide1.webp')!, alt: 'The dining hall under its chandeliers, tables laid for the evening' }]}
        alpona
        height="64svh"
        eyebrow="The Menu"
        title="From the Kitchens of the House"
        lead="A Bengali table and a Sahib’s table, served side by side."
        primaryAction={{ label: 'Reserve by Telephone', href: site.phone.href }}
      />

      <SectionNav items={SECTIONS} label="Menu sections" />

      <PageSection tone="band" id="two-tables">
        <Stack>
          <SectionHeading tone="dark" numeral="I" eyebrow="The Two Tables" title="A Bengali Table and a Sahib’s Table" lead="Two kitchens of the house; order from either, or from both." />
          <MenuBook pages={menu.tables} currency={menu.currency} titleAs="h2" />
        </Stack>
      </PageSection>

      <PageSection id="signature">
        <Stack>
          <SectionHeading align="center" numeral="II" eyebrow="From the Kitchens" title="Signature Dishes" lead="The dishes the house is known for, from the Bengali table and the Sahib’s." />
          <SignatureDishes dishes={signatureDishes} />
        </Stack>
      </PageSection>

      <PageSection tone="alt" id="set-menus">
        <Stack>
          <SectionHeading align="center" numeral="III" eyebrow={menu.sets.title} title="The Whole Meal, In Order" lead="For a first evening at the house, the thali is the truest introduction." />
          <SignatureDishes
            layout="set"
            dishes={menu.sets.items.map((s) => ({ ...s, table: menu.sets.title, image: dishImage(s.name) }))}
            currency={menu.currency}
            priceNote="per guest"
            showTable={false}
            itemsLabel="set menus"
          />
        </Stack>
      </PageSection>

      <PageSection id="verandah">
        <Split
          first={
            <div className="pg-verandah__aside">
              <SectionHeading numeral="IV" eyebrow="The Verandah" title="The Café of the House" lead="Tea and a light menu along the cast-iron railing, through the afternoon." />
              <div className="pg-verandah__foot">
                <div className="pg-lantern pg-lantern--inline" aria-hidden="true">
                  <img className="pg-lantern__bracket" src={v('/images/lantern-bracket.webp')} alt="" width={565} height={900} loading="lazy" decoding="async" />
                  <div className="pg-lantern__swing">
                    <span className="pg-lantern__glow" />
                    <img className="pg-lantern__lamp" src={v('/images/lantern-lamp.webp')} alt="" width={565} height={900} loading="lazy" decoding="async" />
                  </div>
                </div>
                {verandahHours && (
                  <p className="pg-verandah__hours">
                    <span className="pg-verandah__hours-label">Open daily</span>
                    {verandahHours.value}
                  </p>
                )}
              </div>
            </div>
          }
          second={<MenuBook pages={[menu.verandah]} currency={menu.currency} />}
        />
      </PageSection>

      <PageSection tone="alt" className="py-[clamp(56px,6vw,88px)]!">
        <CentredNote line={menu.seasonalNote}>
          {site.menuPdf && (
            <Button variant="secondary" href={site.menuPdf} target="_blank" rel="noopener">
              Download the Menu · PDF
            </Button>
          )}
        </CentredNote>
      </PageSection>
      <Reservation />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(menuJsonLd())} />
    </div>
  );
}
