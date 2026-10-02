import React from 'react';
import { cx, useCompact, renderMotif, renderWordmark, lalpaarStyle } from '../../lib/helpers.js';
import { Eyebrow } from '../../ui/type/Eyebrow.jsx';
import { TextLink } from '../../ui/actions/TextLink.jsx';

export function Footer({ address = ['Baro Kuthi Rajbari', 'Paikpara, Kolkata'], mapHref, hours = [{ label: 'Dinner', value: 'From 7 pm' }], gettingHere = [], banquetHref = 'https://barokuthirajbari.com', banquetLabel = 'Visit the Banquet House', year = new Date().getFullYear(), crest, lalpaar, layout = 'auto', className, style }) {
  const [ref, compact, width] = useCompact(layout);
  const mid = !compact && layout === 'auto' && width < 1100;
  const list = (rows) => (
    <dl className="bk-footer__list">
      {rows.map((r, i) => (
        <div key={i} className="bk-footer__row"><dt>{r.label}</dt><dd>{r.value}</dd></div>
      ))}
    </dl>
  );
  return (
    <footer ref={ref} className={cx('bk-footer', compact && 'bk-compact bk-footer--compact', mid && 'bk-footer--mid', className)} style={style}>
      <div className="bk-footer__inner">
        <div className="bk-footer__cols">
          <section className="bk-footer__col">
            <Eyebrow tone="dark" as="h2">Address</Eyebrow>
            <address className="bk-footer__text">{address.map((l, i) => <span key={i}>{l}</span>)}</address>
            {mapHref && <TextLink tone="dark" href={mapHref} target="_blank" rel="noopener">Open the map</TextLink>}
          </section>
          <section className="bk-footer__col">
            <Eyebrow tone="dark" as="h2">Hours</Eyebrow>
            {list(hours)}
          </section>
          <section className="bk-footer__col">
            <Eyebrow tone="dark" as="h2">Getting here</Eyebrow>
            {list(gettingHere)}
          </section>
          <section className="bk-footer__col bk-footer__col--brand">
            {crest ? renderMotif(crest, 'bk-footer__crest', 'Baro Kuthi crest') : renderWordmark({ size: 'md', tone: 'dark' })}
            <TextLink tone="dark" href={banquetHref}>{banquetLabel}</TextLink>
          </section>
        </div>
        <p className="bk-footer__legal">© {year} · Baro Kuthi Rajbari · The Heritage Dining</p>
      </div>
      <div className="bk-lalpaar" style={lalpaarStyle(lalpaar)} aria-hidden="true" />
    </footer>
  );
}
