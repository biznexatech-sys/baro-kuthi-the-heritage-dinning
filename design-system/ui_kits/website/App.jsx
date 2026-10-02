const { Header: AHeader, Footer: AFooter, ReservationCard: AReservationCard, StickyCallBar: AStickyCallBar, InvitationIntro: AInvitationIntro } = window.BaroKuthiDesignSystem_e9f570;

const ROUTES = { '#home': 'HomePage', '#story': 'StoryPage', '#menu': 'MenuPage', '#rooms': 'RoomsPage', '#occasions': 'OccasionsPage', '#visit': 'VisitPage' };
const current = () => (ROUTES[location.hash] ? location.hash : '#home');

function App() {
  const D = window.BK_DATA;
  const { PageSection } = window;
  const [route, setRoute] = React.useState(current);
  const forceIntro = new URLSearchParams(location.search).has('intro');
  React.useEffect(() => {
    const on = () => { setRoute(current()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const Page = window[ROUTES[route]];
  const home = route === '#home';
  return (
    <>
      {home && <AInvitationIntro open={forceIntro ? true : undefined} />}
      <AHeader activeHref={route} phone={D.site.phone} />
      <main key={route}>
        <Page />
        <PageSection>
          <AReservationCard numeral={home ? 'VII' : undefined} eyebrow={home ? 'Reserve a Table' : 'Reservations'} title="Telephone the House" phone={D.site.phone} whatsappHref={D.site.whatsapp} hours={D.site.hours} />
        </PageSection>
      </main>
      <AFooter address={D.site.address} mapHref={D.site.mapHref} hours={D.site.hours} gettingHere={D.site.gettingHere} banquetHref={D.site.banquetHref} />
      <AStickyCallBar phoneHref={D.site.phone.href} whatsappHref={D.site.whatsapp} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
