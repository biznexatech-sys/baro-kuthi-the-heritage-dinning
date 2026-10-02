const { SectionHeading: RSectionHeading, ArchImage: RArchImage, Eyebrow: REyebrow } = window.BaroKuthiDesignSystem_e9f570;

const ROOM_DETAILS = [
  { capacity: '24', best: 'Afternoon', occasions: 'Tea, small lunches', text: 'The café of the house runs the length of the verandah. Tea is poured by the pot and a light menu is served until evening.' },
  { capacity: '40', best: 'Dusk', occasions: 'Dinners, anniversaries', text: 'The old music room is now the main hall. Its chandeliers are lit at dusk, and dinner is served course by course.' },
  { capacity: '60', best: 'After dark', occasions: 'Family celebrations', text: 'Tables are laid in the open courtyard, before the pillared pavilion, for larger family evenings.' },
  { capacity: '10', best: 'By arrangement', occasions: 'Private dinners', text: 'A private room for small dinners. The menu and the evening are arranged with the host in advance.' },
];
const RNUM = ['I', 'II', 'III', 'IV'];

function RoomsPage() {
  const D = window.BK_DATA;
  const { PageSection, LeaderList } = window;
  return (
    <div className="kit-page">
      <PageSection flushBottom>
        <RSectionHeading size="h1" as="h1" eyebrow="The Rooms" title="The Rooms of the House" lead="Four rooms, each with its own hour, light and table." />
      </PageSection>
      {D.rooms.map((r, i) => {
        const d = ROOM_DETAILS[i];
        return (
          <PageSection key={r.name} tone={i % 2 ? 'alt' : 'light'}>
            <div className="kit-room">
              <div className="kit-room__head">
                <REyebrow numeral={RNUM[i]}>{r.eyebrow}</REyebrow>
                <h2 className="kit-room__name">{r.name}</h2>
              </div>
              <RArchImage shape="cinema" alt={r.imageAlt} parallax />
              <div className="kit-split kit-split--7-4">
                <div className="kit-prose"><p>{d.text}</p></div>
                <LeaderList rows={[{ label: 'Seats', value: d.capacity }, { label: 'Best', value: d.best }, { label: 'Suits', value: d.occasions }]} />
              </div>
            </div>
          </PageSection>
        );
      })}
    </div>
  );
}

window.RoomsPage = RoomsPage;
