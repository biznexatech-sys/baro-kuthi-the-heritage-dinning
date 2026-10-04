'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cx, lalpaarStyle, PhoneIcon, romanNumerals, BREAKPOINTS } from '@/lib/utils';
import { useMediaQuery } from '@/lib/hooks';
import type { Phone } from '@/lib/content';
import { Button } from '@/components/ui/Button';

export type NavLink = { label: string; href: string };

export const LEFT_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'The Menu', href: '/menu/' },
  { label: 'The Rooms', href: '/rooms/' },
];
export const RIGHT_LINKS: NavLink[] = [
  { label: 'Occasions', href: '/occasions/' },
  { label: 'Visit', href: '/visit/' },
];

export type HeaderProps = {
  phone: Phone;
  leftLinks?: NavLink[];
  rightLinks?: NavLink[];
  lalpaar?: string;
};

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

/**
 * §9.2 — sticky, 88px → 64px after 120px of scroll. Both the desktop bar and the mobile bar are rendered;
 * CSS shows one per viewport (switch at 1200px), so the prerendered HTML is right before JavaScript loads.
 */
export function Header({ phone, leftLinks = LEFT_LINKS, rightLinks = RIGHT_LINKS, lalpaar }: HeaderProps) {
  const pathname = trim(usePathname() || '/');
  const [scrolled, setScrolled] = useState(false);
  // Over the hero the header stays light; past it, over the light sections, it inverts to terracotta-deep.
  const [inverted, setInverted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const desktop = useMediaQuery(`(min-width: ${BREAKPOINTS.header}px)`);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 120);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.bk-hero');
    const on = () => {
      const h = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      setInverted(!hero || hero.getBoundingClientRect().bottom <= h);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [pathname]);

  // Close the menu on navigation and when the viewport grows into the desktop header.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (desktop) setOpen(false);
  }, [desktop]);

  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('.bk-menu__link')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const btn = menuBtn.current;
    return () => {
      root.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      btn?.focus({ preventScroll: true });
    };
  }, [open]);

  const isActive = (href: string) => trim(href) === pathname;
  const tab = open ? 0 : -1;
  const all = [...leftLinks, ...rightLinks];

  const navLink = (l: NavLink) => (
    <Link key={l.href} href={l.href} className={cx('bk-header__link', isActive(l.href) && 'is-active')} aria-current={isActive(l.href) ? 'page' : undefined}>
      {l.label}
    </Link>
  );
  const logo = (src: string, extra?: string) => (
    <img className={cx('bk-header__logo', extra)} src={src} alt={extra ? '' : 'Baro Kuthi Rajbari · The Heritage Dining'} width={365} height={220} decoding="async" />
  );
  // 'light' = the bar: maroon logo, with the cream one stacked on top for the inverted state (cross-faded in CSS).
  const brand = (tone: 'light' | 'dark', tabIndex?: number) => (
    <Link className="bk-header__brand" href="/" aria-label="Baro Kuthi — home" tabIndex={tabIndex} onClick={() => setOpen(false)}>
      {tone === 'dark' ? logo('/images/logo-header-light.webp') : (
        <>
          {logo('/images/logo-header.webp')}
          {logo('/images/logo-header-light.webp', 'bk-header__logo--inverted')}
        </>
      )}
    </Link>
  );

  return (
    <header ref={headerRef} className={cx('bk-header', 'is-sticky', scrolled && 'is-condensed', inverted && 'is-inverted')}>
      <div className="bk-lalpaar" style={lalpaarStyle(lalpaar)} aria-hidden="true" />

      <div className="bk-header--desktop site-header__variant site-header__variant--desktop">
        <div className="bk-header__bar">
          <div className="bk-header__inner">
            {brand('light')}
            <nav className="bk-header__nav" aria-label="Primary">
              {all.map(navLink)}
            </nav>
            <a className="bk-header__cta" href={phone.href} aria-label={'Call to reserve — ' + phone.display}>
              <PhoneIcon />
              <span>Call to Reserve</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bk-header--mobile bk-compact site-header__variant site-header__variant--mobile">
        <div className="bk-header__bar">
          <div className="bk-header__inner">
            <button ref={menuBtn} type="button" className={cx('bk-header__menu-btn', open && 'is-open')} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
              <span />
              <span />
              <span />
            </button>
            {brand('light')}
            <a className="bk-header__phone-btn bk-header__phone-btn--cta" href={phone.href} aria-label={'Call to reserve — ' + phone.display}>
              <PhoneIcon />
            </a>
          </div>
        </div>
        <div ref={menuRef} id="site-menu" className={cx('bk-menu', open && 'is-open')} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="bk-menu__top">
            <button type="button" className={cx('bk-header__menu-btn', open && 'is-open')} aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={tab}>
              <span />
              <span />
              <span />
            </button>
            {brand('dark', tab)}
            <a className="bk-header__phone-btn bk-header__phone-btn--dark" href={phone.href} aria-label={'Telephone ' + phone.display} tabIndex={tab}>
              <PhoneIcon />
            </a>
          </div>
          <ol className="bk-menu__list">
            {all.map((l, i) => (
              <li key={l.href} className="bk-menu__item" style={{ '--i': i } as CSSProperties}>
                <Link className={cx('bk-menu__link', isActive(l.href) && 'is-active')} href={l.href} tabIndex={tab} onClick={() => setOpen(false)}>
                  <span className="bk-menu__num">{romanNumerals[i]}</span>
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="bk-menu__foot">
            <Button variant="on-dark" href={phone.href} fullWidth tabIndex={tab}>
              Reserve by Telephone
            </Button>
            <a className="bk-menu__phone" href={phone.href} tabIndex={tab}>
              {phone.display}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
