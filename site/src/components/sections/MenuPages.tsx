import type { MenuCategory, MenuItem } from '@/lib/content';
import { cx } from '@/lib/utils';
import { MenuSlider } from './MenuSlider';

export type MenuPagesProps = {
  categories: MenuCategory[];
  currency?: string;
  gstNote?: string;
  /** URL for a category's sketch (lets the page pass cache-busted URLs). */
  illustrationSrc?: (name: string) => string | undefined;
};

/** Small swirl for the frame corners, after the printed menu's corner flourishes. */
export function Flourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 56V18c0-8 6-14 14-14h38" />
      <path d="M10 56V22c0-7 5-12 12-12h34" opacity=".55" />
      <path d="M18 4c-6 2-8 8-4 12s10 2 10-3-6-6-8-3" />
      <path d="M4 18c2-6 8-8 12-4s2 10-3 10-6-6-3-8" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Item({ item, currency }: { item: MenuItem; currency: string }) {
  if (item.courses) {
    // Special thali: title + price label, a short Bengali description, the courses one per line.
    return (
      <li className="bk-mp__special">
        <div className="bk-mp__special-head">
          <h4 className="bk-mp__special-name" lang="bn">
            {item.bn}
          </h4>
          {item.priceLabel && (
            <span className="bk-mp__special-price" lang="bn">
              {item.priceLabel}
            </span>
          )}
        </div>
        {item.note && (
          <p className="bk-mp__special-note" lang="bn">
            {item.note}
          </p>
        )}
        <ul className="bk-mp__courses" lang="bn">
          {item.courses.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </li>
    );
  }
  const isThali = !!item.note;
  return (
    <li className={cx('bk-mp__item', isThali && 'bk-mp__item--thali')}>
      <div className="bk-mp__names">
        <span className="bk-mp__bn" lang="bn">
          {item.bn}
          {item.qty && <span className="bk-mp__qty"> ({item.qty})</span>}
          {isThali && item.en && <span className="bk-mp__en-inline"> ({item.en})</span>}
        </span>
        {!isThali && item.en && <span className="bk-mp__en">{item.en}</span>}
        {isThali && (
          <span className="bk-mp__note" lang="bn">
            {item.note}
          </span>
        )}
      </div>
      {item.price !== undefined && (
        <span className="bk-mp__price" aria-label={`${currency}${item.price}`}>
          {item.price}
        </span>
      )}
    </li>
  );
}

/**
 * The printed menu, page for page: each category is a parchment "stamp" with perforated scalloped edges, a fine
 * double frame with corner flourishes, a Bengali title (with the English where the menu prints one), sections headed
 * "বাংলা (ENGLISH)", items as Bengali + portion over the English name with the price at the right, the category's
 * sketch at the foot and the GST note. Text is exactly as in content/menu.json (transcribed from the printed menu).
 */
export function MenuPages({ categories, currency = '₹', gstNote, illustrationSrc = (n) => `/images/menu/${n}.webp` }: MenuPagesProps) {
  return (
    <MenuSlider tabs={categories.map((c) => ({ id: c.id, label: c.label }))}>
      {categories.map((c) => (
        <article key={c.id} id={c.id} className={cx('bk-mp__page', c.en && 'bk-mp__page--titled')} aria-labelledby={`${c.id}-title`}>
          <div className="bk-mp__frame">
            <Flourish className="bk-mp__corner bk-mp__corner--tl" />
            <Flourish className="bk-mp__corner bk-mp__corner--tr" />
            <Flourish className="bk-mp__corner bk-mp__corner--bl" />
            <Flourish className="bk-mp__corner bk-mp__corner--br" />

            <header className="bk-mp__head">
              <h2 id={`${c.id}-title`} className="bk-mp__title">
                <span lang="bn">{c.bn}</span>
                {c.en && <span className="bk-mp__title-en">{c.en}</span>}
              </h2>
            </header>

            {c.intro && (
              <div className="bk-mp__intro">
                {c.intro.bnTitle && (
                  <p className="bk-mp__intro-title" lang="bn">
                    {c.intro.bnTitle}
                  </p>
                )}
                {c.intro.bn && (
                  <p className="bk-mp__intro-bn" lang="bn">
                    {c.intro.bn}
                  </p>
                )}
                {c.intro.en && <p className="bk-mp__intro-en">{c.intro.en}</p>}
              </div>
            )}

            {c.sections.map((sec, i) => (
              <section key={(sec.en || '') + i} className="bk-mp__section">
                {(sec.bn || sec.en) && (
                  <h3 className="bk-mp__sec-title">
                    {sec.bn && <span lang="bn">{sec.bn}</span>}
                    {sec.en && <span className="bk-mp__sec-en"> ({sec.en})</span>}
                  </h3>
                )}
                <ul className={cx('bk-mp__items', sec.columns === 2 && 'bk-mp__items--2col')}>
                  {sec.items.map((it) => (
                    <Item key={it.bn + (it.qty || '')} item={it} currency={currency} />
                  ))}
                </ul>
              </section>
            ))}

            {c.footnotes && (
              <div className="bk-mp__footnotes" lang="bn">
                {c.footnotes.map((f) => (
                  <p key={f}>{f}</p>
                ))}
              </div>
            )}

            {c.illustration && (
              <img className="bk-mp__sketch" src={illustrationSrc(c.illustration)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            )}
            {gstNote && <p className="bk-mp__gst">{gstNote}</p>}
          </div>
        </article>
      ))}
    </MenuSlider>
  );
}
