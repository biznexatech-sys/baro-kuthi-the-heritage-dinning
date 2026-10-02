import type { Phone } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

export type InfoStripProps = {
  hours: string;
  address: string;
  mapHref?: string;
  phone: Phone;
  whatsappHref: string;
};

/** Home §10.3 — Hours · Address · Call / WhatsApp, three columns with copper dividers. */
export function InfoStrip({ hours, address, mapHref, phone, whatsappHref }: InfoStripProps) {
  return (
    <section className="bk-info" aria-label="Hours, address and reservations">
      <div className="bk-info__inner">
        <div className="bk-info__col">
          <Eyebrow>Hours</Eyebrow>
          <p className="bk-info__value">{hours}</p>
        </div>
        <div className="bk-info__col">
          <Eyebrow>Address</Eyebrow>
          <p className="bk-info__value">{address}</p>
          {mapHref && (
            <TextLink href={mapHref} target="_blank" rel="noopener">
              Directions
            </TextLink>
          )}
        </div>
        <div className="bk-info__col">
          <Eyebrow>Call · WhatsApp</Eyebrow>
          <a className="bk-info__phone" href={phone.href}>
            {phone.display}
          </a>
          <div className="bk-info__links">
            <TextLink href={phone.href}>Call</TextLink>
            <TextLink href={whatsappHref} target="_blank" rel="noopener">
              WhatsApp
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
