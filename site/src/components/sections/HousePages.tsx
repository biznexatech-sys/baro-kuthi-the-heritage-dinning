import type { HousePage } from '@/lib/content';
import { Flourish } from './MenuPages';

/**
 * The text pages of the printed menu — the house introduction and the stories behind the room names — as parchment
 * pages in the menu's style (two side by side on wide screens, stacked below 1100px). Text exactly as printed.
 */
export function HousePages({ pages }: { pages: HousePage[] }) {
  return (
    <div className="bk-mp-house">
      {pages.map((a) => (
        <article key={a.id} id={a.id} className="bk-mp__page bk-mp__page--about" aria-labelledby={`${a.id}-title`}>
          <div className="bk-mp__frame">
            <Flourish className="bk-mp__corner bk-mp__corner--tl" />
            <Flourish className="bk-mp__corner bk-mp__corner--tr" />
            <Flourish className="bk-mp__corner bk-mp__corner--bl" />
            <Flourish className="bk-mp__corner bk-mp__corner--br" />
            <header className="bk-mp__about-head">
              <span className="bk-mp__about-rule" aria-hidden="true" />
              <h2 id={`${a.id}-title`} className="bk-mp__about-title">
                {a.title}
              </h2>
              {a.subtitle && (
                <p className="bk-mp__about-sub" lang="bn">
                  {a.subtitle}
                </p>
              )}
              <span className="bk-mp__about-rule bk-mp__about-rule--down" aria-hidden="true" />
            </header>
            {a.paragraphs?.map((t) => (
              <p key={t} className="bk-mp__about-p" lang="bn">
                {t}
              </p>
            ))}
            {a.entries?.map((e) => (
              <section key={e.en} className="bk-mp__about-entry">
                <h3 className="bk-mp__about-entry-title">
                  <span lang="bn">{e.bn}</span> ({e.en})
                </h3>
                <p className="bk-mp__about-p" lang="bn">
                  {e.text}
                </p>
              </section>
            ))}
            {a.closing && (
              <p className="bk-mp__about-closing">
                <span className="bk-mp__about-closing-title">{a.closing.title}</span>
                <span lang="bn">{a.closing.line}</span>
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
