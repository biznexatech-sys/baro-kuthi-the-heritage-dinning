import { menu, site } from '@/lib/content';
import { jsonLdScript, menuJsonLd, pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MenuBook } from '@/components/sections/MenuBook';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { CentredNote, PageSection, Split, Stack } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata = pageMetadata({
  title: 'The Menu',
  description: 'The Bengali Table and the Sahib’s Table — the two kitchens of Baro Kuthi, with set menus and the Verandah café.',
  path: '/menu/',
});

/** §10 The Menu — Two Tables book (full) → set menus → Verandah café → seasonal note → PDF → reservation. */
export default function MenuPage() {
  return (
    <div className="pg-page">
      <PageSection>
        <Stack>
          <SectionHeading size="h1" as="h1" eyebrow="The Menu" title="The Two Tables" lead="The Bengali Table and the Sahib’s Table, from the kitchens of the house." />
          <MenuBook pages={menu.tables} currency={menu.currency} titleAs="h2" />
        </Stack>
      </PageSection>
      <PageSection tone="alt">
        <Split
          first={<SectionHeading eyebrow="Set Menus" title="The Whole Meal, In Order" lead="For a first evening at the house, the thali is the truest introduction." />}
          second={<MenuBook pages={[menu.sets]} currency={menu.currency} />}
        />
      </PageSection>
      <PageSection flushBottom>
        <Split
          first={<SectionHeading eyebrow="The Verandah" title="The Café of the House" lead="Tea and a light menu along the railing, through the afternoon." />}
          second={<MenuBook pages={[menu.verandah]} currency={menu.currency} />}
        />
      </PageSection>
      <Divider />
      <PageSection flushTop>
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
