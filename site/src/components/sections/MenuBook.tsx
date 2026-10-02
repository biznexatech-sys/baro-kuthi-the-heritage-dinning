'use client';
import { useState, type ReactNode } from 'react';
import { cx } from '@/lib/utils';
import type { MenuPage } from '@/lib/content';

export type MenuBookProps = {
  pages: MenuPage[];
  /** Items per page — e.g. 4 for the Home preview. */
  limit?: number;
  currency?: string;
  defaultPage?: number;
  footer?: ReactNode;
  /** Heading level of each page title. */
  titleAs?: 'h2' | 'h3';
  className?: string;
};

function Page({ page, limit, currency, titleAs: Title, className }: { page: MenuPage; limit?: number; currency: string; titleAs: 'h2' | 'h3'; className?: string }) {
  const items = limit ? page.items.slice(0, limit) : page.items;
  return (
    <div className={cx('bk-book__page', className)}>
      <header className="bk-book__head">
        <Title className="bk-book__title">{page.title}</Title>
        <span className="bk-book__rule" aria-hidden="true" />
        {page.subtitle && <p className="bk-book__subtitle">{page.subtitle}</p>}
      </header>
      <ul className="bk-book__items">
        {items.map((it) => (
          <li key={it.id || it.name} className="bk-menuitem">
            <div className="bk-menuitem__row">
              <span className="bk-menuitem__name">{it.name}</span>
              <span className="bk-leader" aria-hidden="true" />
              {it.price != null && (
                <span className="bk-menuitem__price">
                  {currency} {it.price}
                </span>
              )}
            </div>
            {it.description && <p className="bk-menuitem__desc">{it.description}</p>}
            {it.speciality && (
              <p className="bk-menuitem__mark">
                <span className="bk-menuitem__crest" aria-hidden="true">
                  ✦
                </span>
                House speciality
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * §9.8 "The Two Tables" — an open book: two facing pages, double copper frame, the site's only shadow.
 * Below 768px CSS shows the tabs and only the active page; switching tabs plays the page-turn.
 */
export function MenuBook({ pages, limit, currency = '₹', defaultPage = 0, footer, titleAs = 'h3', className }: MenuBookProps) {
  const [active, setActive] = useState(defaultPage);
  const [turn, setTurn] = useState<{ dir: 'fwd' | 'back'; n: number } | null>(null);
  const single = pages.length < 2;
  const go = (i: number) => {
    if (i === active) return;
    setTurn((t) => ({ dir: i > active ? 'fwd' : 'back', n: (t?.n ?? 0) + 1 }));
    setActive(i);
  };
  return (
    <div className={cx('bk-book', single && 'bk-book--single', className)}>
      {!single && (
        <div className="bk-book__tabs" role="tablist" aria-label="The two tables">
          {pages.map((p, i) => (
            <button key={p.title} type="button" role="tab" aria-selected={i === active} className="bk-book__tab" onClick={() => go(i)}>
              {p.tab || p.title}
            </button>
          ))}
        </div>
      )}
      <div className="bk-book__spread">
        {pages.map((p, i) => (
          <Page
            key={i === active && turn ? `${p.title}-${turn.n}` : p.title}
            page={p}
            limit={limit}
            currency={currency}
            titleAs={titleAs}
            className={cx(!single && i !== active && 'is-inactive', i === active && turn && 'is-turning-' + turn.dir)}
          />
        ))}
      </div>
      {footer && <div className="bk-book__footer">{footer}</div>}
    </div>
  );
}
