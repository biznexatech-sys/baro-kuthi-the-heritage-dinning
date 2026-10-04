import React from 'react';
import { cx, useCompact, renderMotif, renderWordmark, renderIcon, lalpaarStyle, romanNumerals } from '../../lib/helpers.js';
import { Button } from '../../ui/actions/Button.jsx';

const LEFT = [{ label: 'The Story', href: '#story' }, { label: 'The Menu', href: '#menu' }, { label: 'The Rooms', href: '#rooms' }];
const RIGHT = [{ label: 'Occasions', href: '#occasions' }, { label: 'Visit', href: '#visit' }];
const PHONE = { display: '+91 98363 67737', href: 'tel:+919836367737' };

export function Header({ leftLinks = LEFT, rightLinks = RIGHT, phone = PHONE, activeHref, homeHref = '#home', onNavigate, crest, lalpaar, layout = 'auto', condensed, sticky = true, menuOpen, onMenuOpenChange, className, style }) {
  const [ref, compact] = useCompact(layout, 1200);
  const [scrolled, setScrolled] = React.useState(false);
  const [openState, setOpenState] = React.useState(false);
  const open = menuOpen != null ? menuOpen : openState;
  const setOpen = (v) => { setOpenState(v); if (onMenuOpenChange) onMenuOpenChange(v); };

  React.useEffect(() => {
    if (condensed != null) return undefined;
    const on = () => setScrolled(window.scrollY > 120);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [condensed]);

  React.useEffect(() => {
    if (!open || !compact || menuOpen != null) return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { root.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, compact]);

  const shrunk = condensed != null ? condensed : scrolled;
  const go = (e, href) => { if (onNavigate) { e.preventDefault(); onNavigate(href); } setOpen(false); };
  const tab = open ? 0 : -1;
  const navLink = (l) => (
    <a key={l.href + l.label} href={l.href} onClick={(e) => go(e, l.href)} className={cx('bk-header__link', activeHref === l.href && 'is-active')} aria-current={activeHref === l.href ? 'page' : undefined}>{l.label}</a>
  );
  const brand = (tone, small, tabIndex) => (
    <a className="bk-header__brand" href={homeHref} onClick={(e) => go(e, homeHref)} aria-label="Baro Kuthi — home" tabIndex={tabIndex}>
      {crest ? renderMotif(crest, 'bk-header__crest') : null}
      {(!crest || !small) && renderWordmark({ size: small ? 'sm' : 'md', tone, tagline: !small })}
    </a>
  );
  const all = [...leftLinks, ...rightLinks];

  return (
    <header ref={ref} className={cx('bk-header', compact ? 'bk-header--mobile bk-compact' : 'bk-header--desktop', shrunk && 'is-condensed', sticky && 'is-sticky', className)} style={style}>
      <div className="bk-lalpaar" style={lalpaarStyle(lalpaar)} aria-hidden="true" />
      <div className="bk-header__bar">
        <div className="bk-header__inner">
          {compact ? (
            <>
              <button type="button" className={cx('bk-header__menu-btn', open && 'is-open')} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
              {brand('light', true)}
              <a className="bk-header__phone-btn" href={phone.href} aria-label={'Telephone ' + phone.display}>{renderIcon('phone')}</a>
            </>
          ) : (
            <>
              <nav className="bk-header__nav" aria-label="Primary">{leftLinks.map(navLink)}</nav>
              {brand('light', shrunk)}
              <nav className="bk-header__nav bk-header__nav--right" aria-label="Secondary">
                {rightLinks.map(navLink)}
                <a className="bk-header__phone" href={phone.href}>{phone.display}</a>
              </nav>
            </>
          )}
        </div>
      </div>
      {compact && (
        <div className={cx('bk-menu', open && 'is-open')} aria-hidden={!open} role="dialog" aria-label="Menu">
          <div className="bk-menu__top">
            <button type="button" className="bk-header__menu-btn is-open" aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={tab}><span /><span /></button>
            {brand('dark', true, tab)}
            <a className="bk-header__phone-btn bk-header__phone-btn--dark" href={phone.href} aria-label={'Telephone ' + phone.display} tabIndex={tab}>{renderIcon('phone')}</a>
          </div>
          <ol className="bk-menu__list">
            {all.map((l, i) => (
              <li key={l.href + l.label} className="bk-menu__item" style={{ '--i': i }}>
                <a className={cx('bk-menu__link', activeHref === l.href && 'is-active')} href={l.href} onClick={(e) => go(e, l.href)} tabIndex={tab}>
                  <span className="bk-menu__num">{romanNumerals[i]}</span>
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="bk-menu__foot">
            <Button variant="on-dark" href={phone.href} fullWidth tabIndex={tab}>Reserve by Telephone</Button>
            <a className="bk-menu__phone" href={phone.href} tabIndex={tab}>{phone.display}</a>
          </div>
        </div>
      )}
    </header>
  );
}
