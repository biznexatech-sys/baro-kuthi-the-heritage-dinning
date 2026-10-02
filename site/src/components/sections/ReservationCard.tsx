'use client';
import { useRef } from 'react';
import { renderMotif, type Motif } from '@/lib/utils';
import { useDrawOnView } from '@/lib/hooks';
import type { LabelValue, Phone } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

export type ReservationCardProps = {
  eyebrow?: string;
  numeral?: string;
  title?: string;
  message?: string;
  phone: Phone;
  whatsappHref?: string;
  whatsappLabel?: string;
  hours: LabelValue[];
  /** alpana.svg border — draws itself on scroll when given as an inline SVG node. */
  alpana?: Motif;
};

/** §9.13 — centred double-framed card; phone in Cinzel 40px; WhatsApp secondary; hours as a letterpress list. */
export function ReservationCard({
  eyebrow = 'Reservations',
  numeral,
  title = 'Telephone the House',
  message = 'Tables at Baro Kuthi are arranged personally. Please telephone our host.',
  phone,
  whatsappHref,
  whatsappLabel = 'Message on WhatsApp',
  hours,
  alpana,
}: ReservationCardProps) {
  const alpanaRef = useRef<HTMLDivElement>(null);
  useDrawOnView(alpanaRef, !!alpana && typeof alpana !== 'string');
  return (
    <div className="bk-resv">
      {alpana && (
        <div ref={alpanaRef} className="bk-resv__alpana" aria-hidden="true">
          {renderMotif(alpana, 'bk-resv__alpana-art')}
        </div>
      )}
      <SectionHeading eyebrow={eyebrow} numeral={numeral} title={title} lead={message} tone="light" align="center" />
      <div className="bk-resv__grid">
        <div className="bk-resv__col">
          <Eyebrow>Reserve by Telephone</Eyebrow>
          <a className="bk-resv__phone" href={phone.href}>
            {phone.display}
          </a>
          {whatsappHref && (
            <Button variant="secondary" href={whatsappHref} target="_blank" rel="noopener">
              {whatsappLabel}
            </Button>
          )}
        </div>
        <div className="bk-resv__col">
          <Eyebrow>Hours</Eyebrow>
          <ul className="bk-resv__hours">
            {hours.map((h) => (
              <li key={h.label} className="bk-resv__hour">
                <span className="bk-resv__hour-label">{h.label}</span>
                <span className="bk-leader" aria-hidden="true" />
                <span className="bk-resv__hour-value">{h.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
