const { Hero: SHero, StoryBlock: SStoryBlock, Divider: SDivider, Button: SButton } = window.BaroKuthiDesignSystem_e9f570;

const CHAPTERS = [
  { year: '1823', title: 'The House at Paikpara', imageAlt: 'Archival drawing of the Baro Kuthi façade', quote: null },
  { year: '1858', title: 'A Chapter of the House', imageAlt: 'The Jalsaghar, chandeliers lit', quote: '“Pull quote from the family’s account, set in italic.”' },
  { year: '1859', title: 'A Chapter of the House', imageAlt: 'The staircase and its arches, lamp-lit', quote: null },
  { year: 'Today', title: 'The Rajbari Table', imageAlt: 'A table laid on the verandah at dusk', quote: null },
];

function StoryPage() {
  const { PageSection } = window;
  return (
    <div className="kit-page">
      <SHero height="72svh" eyebrow="The Story · Est. 1823" title="The House at Paikpara" lead="A zamindar’s house, and the evenings it has kept." imageAlt="Archival illustration of the Baro Kuthi façade" primaryAction={null} secondaryAction={null} />
      <PageSection>
        <div className="kit-timeline">
          {CHAPTERS.map((c, i) => (
            <SStoryBlock key={c.year} year={c.year} title={c.title} reverse={i % 2 === 1} imageAlt={c.imageAlt} quote={c.quote}>
              {c.year === 'Today' ? (
                <p>The house now receives guests for dinner, served course by course in its old rooms, and arranged personally by telephone.</p>
              ) : (
                <p>Draft — this chapter will be written from the family’s own records and approved by the owners before it is published.</p>
              )}
            </SStoryBlock>
          ))}
        </div>
      </PageSection>
      <SDivider space={0} />
      <PageSection>
        <div className="kit-cta">
          <p className="kit-cta__line">The story continues at the table.</p>
          <SButton variant="secondary" href="#menu">View the Menu</SButton>
        </div>
      </PageSection>
    </div>
  );
}

window.StoryPage = StoryPage;
