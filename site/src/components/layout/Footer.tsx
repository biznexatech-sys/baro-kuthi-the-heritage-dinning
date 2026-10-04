import Link from 'next/link';
import { cx, lalpaarStyle, renderMotif } from '@/lib/utils';
import type { LabelValue } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

export type FooterProps = {
  address: string[];
  mapHref?: string;
  hours: LabelValue[];
  gettingHere: LabelValue[];
  banquetHref: string;
  phone: { display: string; href: string };
  email: string;
  banquetLabel?: string;
  logoSrc?: string;
  crest?: string;
  lalpaar?: string;
  className?: string;
};

function List({ rows }: { rows: LabelValue[] }) {
  return (
    <dl className="bk-footer__list">
      {rows.map((r) => (
        <div key={r.label} className="bk-footer__row">
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** §9.14 "The Visitor's Note" — four columns on terracotta-deep, lal-paar band at the very bottom. */
export function Footer({
  address,
  mapHref,
  hours,
  gettingHere,
  banquetHref,
  phone,
  email,
  banquetLabel = 'Visit the Banquet House',
  logoSrc = '/images/logo-header-light.webp',
  crest,
  lalpaar,
  className,
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={cx('bk-footer', className)}>
      <div className="bk-footer__inner">
        <div className="bk-footer__cols">
          <section className="bk-footer__col">
            <Eyebrow tone="dark" as="h2">
              Address
            </Eyebrow>
            <address className="bk-footer__text">
              {address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            {mapHref && (
              <TextLink tone="dark" href={mapHref} target="_blank" rel="noopener">
                Open the map
              </TextLink>
            )}
          </section>
          <section className="bk-footer__col">
            <Eyebrow tone="dark" as="h2">
              Hours
            </Eyebrow>
            <List rows={hours} />
          </section>
          <section className="bk-footer__col">
            <Eyebrow tone="dark" as="h2">
              Getting here
            </Eyebrow>
            <List rows={gettingHere} />
          </section>
          <section className="bk-footer__col bk-footer__col--brand">
            {crest ? (
              renderMotif(crest, 'bk-footer__crest', 'Baro Kuthi crest')
            ) : (
              <Link href="/" className="bk-footer__brand-link" aria-label="Baro Kuthi — home">
                <img
                  className="bk-footer__logo"
                  src={logoSrc}
                  alt="BARO KUTHI RAJ BARI — The Heritage Dining"
                  width={365}
                  height={220}
                  decoding="async"
                />
              </Link>
            )}
            <TextLink tone="dark" href={banquetHref}>
              {banquetLabel}
            </TextLink>
            <TextLink tone="dark" href={phone.href}>
              {phone.display}
            </TextLink>
            <TextLink tone="dark" href={`mailto:${email}`} style={{ fontVariant: 'normal', letterSpacing: 'normal' }}>
              {email}
            </TextLink>
            <TextLink tone="dark" href="https://www.barokuthirajbaritheheritagedining.com">
              www.barokuthirajbaritheheritagedining.com
            </TextLink>
          </section>
        </div>
        <p className="bk-footer__legal">© {year} · BARO KUTHI RAJ BARI · The Heritage Dining</p>
      </div>
      <div className="bk-lalpaar" style={lalpaarStyle(lalpaar)} aria-hidden="true" />
    </footer>
  );
}
