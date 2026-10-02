import React from 'react';
import { cx, useCompact, renderMotif } from '../../lib/helpers.js';
import { SectionHeading } from '../../ui/type/SectionHeading.jsx';
import { Button } from '../../ui/actions/Button.jsx';

const HEADING = { numeral: 'V', eyebrow: 'Occasions of the House', title: 'Celebrations, Arranged by the House', lead: 'Private dinners, family gatherings and midday tables for colleagues.' };
const ITEMS = [
  { title: 'Private Dining', text: 'The Zamindar’s Study, arranged for an evening of your own.' },
  { title: 'Family Celebrations', text: 'Birthdays, anniversaries and annaprashan, hosted in the old manner.' },
  { title: 'Corporate Lunches', text: 'Midday tables for colleagues and guests, arranged by telephone.' },
];

export function OccasionBand({ heading = HEADING, items = ITEMS, action = { label: 'Arrange an Occasion', href: '#occasions' }, checker, layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  return (
    <section ref={ref} className={cx('bk-occasion', compact && 'bk-compact', className)} style={style}>
      {checker && <div className="bk-occasion__texture" style={{ backgroundImage: 'url("' + checker + '")' }} aria-hidden="true" />}
      <div className="bk-occasion__inner">
        {heading && <SectionHeading tone="terracotta" align="center" {...heading} />}
        <ul className="bk-occasion__items">
          {items.map((it, i) => (
            <li key={it.title + i} className="bk-occasion__item">
              <span className="bk-niche" aria-hidden="true">{renderMotif(it.icon)}</span>
              <h3 className="bk-occasion__title">{it.title}</h3>
              <p className="bk-occasion__text">{it.text}</p>
            </li>
          ))}
        </ul>
        {action && <div className="bk-occasion__action"><Button variant="on-dark" href={action.href} onClick={action.onClick}>{action.label}</Button></div>}
      </div>
    </section>
  );
}
