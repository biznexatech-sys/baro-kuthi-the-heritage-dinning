const { Hero, InfoStrip, StoryBlock, Divider, SectionHeading, MenuBook, TextLink, CourseScroll, RoomRow, OccasionBand, GuestBook } = window.BaroKuthiDesignSystem_e9f570;

function HomePage() {
  const D = window.BK_DATA;
  const { PageSection } = window;
  return (
    <div className="kit-page">
      <Hero primaryAction={{ label: 'Reserve by Telephone', href: D.site.phone.href }} secondaryAction={{ label: 'View the Menu', href: '#menu' }} />
      <InfoStrip hours={D.site.hoursLine} address={D.site.addressLine} mapHref={D.site.mapHref} phone={D.site.phone} whatsappHref={D.site.whatsapp} />
      <PageSection flushBottom>
        <StoryBlock numeral="I" eyebrow="The Courtyard" title="A House of 1823" imageAlt="The courtyard and its arches at dusk, lamps lit" action={{ label: 'Read the full story', href: '#story' }}>
          <p>Baro Kuthi has stood in Paikpara since 1823. Its courtyard, verandah and music room now receive guests for dinner, served in the old order of a Rajbari meal.</p>
        </StoryBlock>
      </PageSection>
      <Divider />
      <PageSection flushTop>
        <div className="kit-stack">
          <SectionHeading numeral="II" eyebrow="The Two Tables" title="A Bengali Table and a Sahib’s Table" lead="Two kitchens of the house, served side by side." />
          <MenuBook pages={D.menu.tables} limit={4} footer={<TextLink href="#menu">View the full menu</TextLink>} />
        </div>
      </PageSection>
      <CourseScroll courses={D.courses} heading={{ numeral: 'III', eyebrow: 'The Course of a Rajbari Meal', title: 'Eight Courses, In Order', lead: 'A Bengali meal is served in sequence, from bitter to sweet.' }} />
      <PageSection>
        <div className="kit-stack">
          <SectionHeading numeral="IV" eyebrow="The Rooms of the House" title="Four Rooms, Four Evenings" lead="Each room of the house keeps its own hour and its own table." />
          <RoomRow rooms={D.rooms} />
        </div>
      </PageSection>
      <OccasionBand action={{ label: 'Arrange an Occasion', href: '#occasions' }} />
      <PageSection>
        <div className="kit-stack">
          <SectionHeading numeral="VI" eyebrow="The Guest Book" title="From the Guest Book" lead="Words left by guests of the house, quoted as written." />
          <GuestBook reviews={D.reviews} />
        </div>
      </PageSection>
    </div>
  );
}

window.HomePage = HomePage;
