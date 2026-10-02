const { SectionHeading: MSectionHeading, MenuBook: MMenuBook, Button: MButton, Divider: MDivider } = window.BaroKuthiDesignSystem_e9f570;

function MenuPage() {
  const D = window.BK_DATA;
  const { PageSection } = window;
  return (
    <div className="kit-page">
      <PageSection>
        <div className="kit-stack">
          <MSectionHeading size="h1" as="h1" eyebrow="The Menu" title="The Two Tables" lead="The Bengali Table and the Sahib’s Table, from the kitchens of the house." />
          <MMenuBook pages={D.menu.tables} />
        </div>
      </PageSection>
      <PageSection tone="alt">
        <div className="kit-split">
          <MSectionHeading eyebrow="Set Menus" title="The Whole Meal, In Order" lead="For a first evening at the house, the thali is the truest introduction." />
          <MMenuBook pages={[D.menu.sets]} />
        </div>
      </PageSection>
      <PageSection flushBottom>
        <div className="kit-split">
          <MSectionHeading eyebrow="The Verandah" title="The Café of the House" lead="Tea and a light menu along the railing, through the afternoon." />
          <MMenuBook pages={[D.menu.verandah]} />
        </div>
      </PageSection>
      <MDivider />
      <PageSection flushTop>
        <div className="kit-note">
          <p className="kit-note__text">Some dishes follow the season and the market. The host will describe them at the table.</p>
          <MButton variant="secondary" href="#menu">Download the Menu · PDF</MButton>
        </div>
      </PageSection>
    </div>
  );
}

window.MenuPage = MenuPage;
