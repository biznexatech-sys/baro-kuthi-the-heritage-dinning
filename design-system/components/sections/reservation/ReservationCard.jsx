import React from 'react';
import { cx, useCompact, useDrawOnView, renderMotif } from '../../lib/helpers.js';
import { SectionHeading } from '../../ui/type/SectionHeading.jsx';
import { Eyebrow } from '../../ui/type/Eyebrow.jsx';
import { Button } from '../../ui/actions/Button.jsx';

const PHONE = { display: '+91 82403 83737', href: 'tel:+918240383737' };
const WA = 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table';

export function ReservationCard({ eyebrow = 'Reservations', numeral, title = 'Reserve a Table', message = 'Tables at Baro Kuthi are arranged personally. Please telephone our host.', phone = PHONE, whatsappHref = WA, whatsappLabel = 'Message on WhatsApp', hours = [{ label: 'Dinner', value: 'From 7 pm' }], alpana, layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  const alpanaRef = React.useRef(null);
  useDrawOnView(alpanaRef, !!alpana && typeof alpana !== 'string');
  return (
    <div ref={ref} className={cx('bk-resv', compact && 'bk-compact', className)} style={style}>
      {alpana && <div ref={alpanaRef} className="bk-resv__alpana" aria-hidden="true">{renderMotif(alpana, 'bk-resv__alpana-art')}</div>}
      <SectionHeading eyebrow={eyebrow} numeral={numeral} title={title} lead={message} tone="light" align="center" />
      <div className="bk-resv__grid">
        <div className="bk-resv__col">
          <Eyebrow>Reserve by Telephone</Eyebrow>
          <a className="bk-resv__phone" href={phone.href}>{phone.display}</a>
          {whatsappHref && <Button variant="secondary" href={whatsappHref} target="_blank" rel="noopener">{whatsappLabel}</Button>}
        </div>
        <div className="bk-resv__col">
          <Eyebrow>Hours</Eyebrow>
          <ul className="bk-resv__hours">
            {hours.map((h, i) => (
              <li key={i} className="bk-resv__hour">
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
