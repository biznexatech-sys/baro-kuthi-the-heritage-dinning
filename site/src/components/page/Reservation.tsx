import { rooms, site } from '@/lib/content';
import { ReservationCard } from '@/components/sections/ReservationCard';
import { PageSection } from './PageSection';

/** §10 — every page ends with the reservation card, then the footer. Home numbers it VI. */
export function Reservation({ home = false }: { home?: boolean }) {
  return (
    <PageSection aria-label="Reservations">
      <ReservationCard
        numeral={home ? 'VI' : undefined}
        eyebrow={home ? 'Reserve a Table' : 'Reservations'}
        title="Telephone the House"
        phone={site.phone}
        whatsappHref={site.whatsapp}
        hours={site.hours}
        rooms={rooms.map((r) => r.name)}
      />
    </PageSection>
  );
}
