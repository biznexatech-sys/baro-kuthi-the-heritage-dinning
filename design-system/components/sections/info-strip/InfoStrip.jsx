import React from 'react';
import { cx, useCompact } from '../../lib/helpers.js';
import { Eyebrow } from '../../ui/type/Eyebrow.jsx';
import { TextLink } from '../../ui/actions/TextLink.jsx';

const PHONE = { display: '+91 82403 83737', href: 'tel:+918240383737' };
const WA = 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table';

export function InfoStrip({ hours = 'The house receives guests from 7 pm', address = 'Paikpara, Kolkata', mapHref, phone = PHONE, whatsappHref = WA, layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  return (
    <section ref={ref} className={cx('bk-info', compact && 'bk-compact', className)} style={style} aria-label="Hours, address and reservations">
      <div className="bk-info__inner">
        <div className="bk-info__col">
          <Eyebrow>Hours</Eyebrow>
          <p className="bk-info__value">{hours}</p>
        </div>
        <div className="bk-info__col">
          <Eyebrow>Address</Eyebrow>
          <p className="bk-info__value">{address}</p>
          {mapHref && <TextLink href={mapHref} target="_blank" rel="noopener">Directions</TextLink>}
        </div>
        <div className="bk-info__col">
          <Eyebrow>Call · WhatsApp</Eyebrow>
          <a className="bk-info__phone" href={phone.href}>{phone.display}</a>
          <div className="bk-info__links">
            <TextLink href={phone.href}>Call</TextLink>
            <TextLink href={whatsappHref} target="_blank" rel="noopener">WhatsApp</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
