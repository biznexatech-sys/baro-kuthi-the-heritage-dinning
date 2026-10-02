import React from 'react';
import { cx, useCompact } from '../../lib/helpers.js';

function MenuPage({ page, limit, currency, className }) {
  const items = limit ? (page.items || []).slice(0, limit) : page.items || [];
  return (
    <div className={cx('bk-book__page', className)}>
      <header className="bk-book__head">
        <h3 className="bk-book__title">{page.title}</h3>
        <span className="bk-book__rule" aria-hidden="true" />
        {page.subtitle && <p className="bk-book__subtitle">{page.subtitle}</p>}
      </header>
      <ul className="bk-book__items">
        {items.map((it, i) => (
          <li key={(it.id || it.name) + i} className="bk-menuitem">
            <div className="bk-menuitem__row">
              <span className="bk-menuitem__name">{it.name}</span>
              <span className="bk-leader" aria-hidden="true" />
              {it.price != null && <span className="bk-menuitem__price">{currency} {it.price}</span>}
            </div>
            {it.description && <p className="bk-menuitem__desc">{it.description}</p>}
            {it.speciality && <p className="bk-menuitem__mark"><span className="bk-menuitem__crest" aria-hidden="true">✦</span>House speciality</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuBook({ pages = [], limit, currency = '₹', defaultPage = 0, footer, layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  const [active, setActive] = React.useState(defaultPage);
  const [dir, setDir] = React.useState(null);
  const single = pages.length < 2;
  const turn = (i) => { if (i === active) return; setDir(i > active ? 'fwd' : 'back'); setActive(i); };
  return (
    <div ref={ref} className={cx('bk-book', single && 'bk-book--single', compact && 'bk-compact bk-book--compact', className)} style={style}>
      {compact && !single ? (
        <>
          <div className="bk-book__tabs" role="tablist" aria-label="The two tables">
            {pages.map((p, i) => (
              <button key={i} type="button" role="tab" aria-selected={i === active} className="bk-book__tab" onClick={() => turn(i)}>{p.tab || p.title}</button>
            ))}
          </div>
          <MenuPage key={active} page={pages[active] || {}} limit={limit} currency={currency} className={dir && 'is-turning-' + dir} />
        </>
      ) : (
        <div className="bk-book__spread">
          {pages.map((p, i) => <MenuPage key={i} page={p} limit={limit} currency={currency} />)}
        </div>
      )}
      {footer && <div className="bk-book__footer">{footer}</div>}
    </div>
  );
}
