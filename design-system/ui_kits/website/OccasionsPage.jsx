const { SectionHeading: OSectionHeading, StoryBlock: OStoryBlock } = window.BaroKuthiDesignSystem_e9f570;

const OCCASIONS = [
  { title: 'Private Dining', eyebrow: 'The Zamindar’s Study', imageAlt: 'A private table laid in the study, lamp-lit', text: 'An evening of your own in the study, for up to ten guests. The menu is chosen with the host beforehand.' },
  { title: 'Family Celebrations', eyebrow: 'The Courtyard · The Jalsaghar', imageAlt: 'A long family table in the courtyard at night', text: 'Birthdays, anniversaries and annaprashan, hosted in the courtyard or the Jalsaghar, in the old manner.' },
  { title: 'Corporate Lunches', eyebrow: 'Midday, by arrangement', imageAlt: 'The verandah laid for lunch in daylight', text: 'Midday tables for colleagues and guests, with a set menu from either table.' },
];
const STEPS = [
  { n: 'I', title: 'Telephone the host', text: 'Tell us the date, the number of guests and the occasion.' },
  { n: 'II', title: 'Settle the room and menu', text: 'The host suggests a room and a menu from either table.' },
  { n: 'III', title: 'Arrive and be received', text: 'The house is prepared, and your guests are received at the gate.' },
];

function OccasionsPage() {
  const { PageSection } = window;
  return (
    <div className="kit-page">
      <PageSection flushBottom>
        <OSectionHeading size="h1" as="h1" eyebrow="Occasions" title="Occasions of the House" lead="Private dinners, family gatherings and midday tables, all arranged by telephone." />
      </PageSection>
      <PageSection>
        <div className="kit-timeline">
          {OCCASIONS.map((o, i) => (
            <OStoryBlock key={o.title} eyebrow={o.eyebrow} numeral={['I', 'II', 'III'][i]} title={o.title} imageAlt={o.imageAlt} reverse={i % 2 === 1}>
              <p>{o.text}</p>
            </OStoryBlock>
          ))}
        </div>
      </PageSection>
      <PageSection tone="alt">
        <div className="kit-stack">
          <OSectionHeading eyebrow="How It Works" title="How an Occasion Is Arranged" lead="Everything is settled by telephone, with the host, in person." />
          <ol className="kit-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="kit-step">
                <span className="kit-step__n">{s.n}</span>
                <h3 className="kit-step__title">{s.title}</h3>
                <p className="kit-step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </PageSection>
    </div>
  );
}

window.OccasionsPage = OccasionsPage;
