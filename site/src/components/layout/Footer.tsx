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
  /** Social profiles, shown as icon links under the contact details. */
  social?: { label: string; href: string }[];
  banquetLabel?: string;
  logoSrc?: string;
  crest?: string;
  lalpaar?: string;
  className?: string;
};

/** Line icons for the social links (Lucide-style, at the brand's 1.25px stroke). */
function SocialIcon({ label }: { label: string }) {
  const name = label.toLowerCase();
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'instagram' ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </>
      ) : name === 'facebook' ? (
        <path d="M14.5 21v-7.5h2.6l.4-3H14.5V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H9v3h2.5V21" />
      ) : (
        <circle cx="12" cy="12" r="8" />
      )}
    </svg>
  );
}

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
  social,
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
            {social && social.length > 0 && (
              <ul className="bk-footer__social" aria-label="Follow the house">
                {social.map((l) => (
                  <li key={l.href}>
                    <a className="bk-footer__social-link" href={l.href} target="_blank" rel="noopener" aria-label={`${l.label} — opens in a new tab`} title={l.label}>
                      <SocialIcon label={l.label} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
        <div className="bk-footer__legal">
          <p className="bk-footer__copy">© {year} · BARO KUTHI RAJ BARI · The Heritage Dining</p>
          <p className="bk-footer__credit">
            Developed by{' '}
            <a href="https://biznexa.tech" target="_blank" rel="noopener">
              Biznexa.tech
            </a>
          </p>
        </div>
      </div>
      <div className="bk-lalpaar" style={lalpaarStyle(lalpaar)} aria-hidden="true" />
    </footer>
  );
}
