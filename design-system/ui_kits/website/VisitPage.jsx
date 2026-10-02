const { SectionHeading: VSectionHeading, FrameDouble: VFrameDouble, Button: VButton, Eyebrow: VEyebrow } = window.BaroKuthiDesignSystem_e9f570;

const FAQS = [
  { q: 'How do I reserve a table?', a: 'Please telephone our host, or send a message on WhatsApp. Tables are arranged personally.' },
  { q: 'Is there a dress code?', a: 'Smart dress is requested; traditional dress is warmly welcomed.' },
  { q: 'Can the house arrange a private evening?', a: 'Yes. The Zamindar’s Study and the courtyard may be arranged for private occasions by telephone.' },
];

function MapEmbed() {
  const [loaded, setLoaded] = React.useState(false);
  const D = window.BK_DATA;
  return (
    <VFrameDouble fill="parchment-dark" padding={8} className="kit-map">
      {loaded ? (
        <iframe title="Map to Baro Kuthi" src="https://www.google.com/maps?q=Paikpara,Kolkata&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="kit-map__idle">
          <VEyebrow>Map · click to load</VEyebrow>
          <p className="kit-map__addr">{D.site.address.join(', ')}</p>
          <VButton variant="secondary" onClick={() => setLoaded(true)}>Load the Map</VButton>
        </div>
      )}
    </VFrameDouble>
  );
}

function VisitPage() {
  const D = window.BK_DATA;
  const { PageSection, LeaderList } = window;
  return (
    <div className="kit-page">
      <PageSection flushBottom>
        <VSectionHeading size="h1" as="h1" eyebrow="Visit" title="Visit the House" lead="The house receives guests from 7 pm. Tables are arranged by telephone." />
      </PageSection>
      <PageSection>
        <div className="kit-split kit-split--7-4">
          <MapEmbed />
          <div className="kit-visit">
            <div><VEyebrow>Address</VEyebrow><p className="kit-visit__text">{D.site.address.map((l) => <span key={l}>{l}<br /></span>)}</p></div>
            <div><VEyebrow>Hours</VEyebrow><LeaderList rows={D.site.hours} /></div>
            <div><VEyebrow>Getting here</VEyebrow><LeaderList rows={D.site.gettingHere} /></div>
          </div>
        </div>
      </PageSection>
      <PageSection tone="alt">
        <div className="kit-split">
          <VSectionHeading eyebrow="House Etiquette" title="Questions Guests Ask" lead="If your question is not here, the host will be glad to answer it." />
          <dl className="kit-faq">
            {FAQS.map((f) => (
              <div key={f.q} className="kit-faq__item"><dt>{f.q}</dt><dd>{f.a}</dd></div>
            ))}
          </dl>
        </div>
      </PageSection>
    </div>
  );
}

window.VisitPage = VisitPage;
