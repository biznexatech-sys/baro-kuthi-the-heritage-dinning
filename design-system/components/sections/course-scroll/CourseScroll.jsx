import React from 'react';
import { cx, useCompact, useReducedMotion, renderMotif } from '../../lib/helpers.js';
import { SectionHeading } from '../../ui/type/SectionHeading.jsx';
import { ArchImage } from '../../ui/frames/ArchImage.jsx';

export function CourseScroll({ courses = [], heading, mode = 'auto', activeIndex, onActiveChange, layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  const reduced = useReducedMotion();
  const m = mode === 'auto' ? (compact || reduced ? 'stack' : 'pinned') : mode;
  const [active, setActive] = React.useState(activeIndex || 0);
  const trackRef = React.useRef(null);
  const n = courses.length;

  React.useEffect(() => { if (activeIndex != null) setActive(activeIndex); }, [activeIndex]);
  React.useEffect(() => { if (onActiveChange) onActiveChange(active); }, [active]);
  React.useEffect(() => {
    if (m !== 'pinned' || !n) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(0.9999, Math.max(0, -r.top / total));
      const i = Math.floor(p * n);
      setActive((prev) => (prev === i ? prev : i));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [m, n]);

  const jump = (i) => {
    if (m === 'pinned' && trackRef.current) {
      const r = trackRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      window.scrollTo({ top: window.scrollY + r.top + ((i + 0.5) / n) * total, behavior: reduced ? 'auto' : 'smooth' });
    } else setActive(i);
  };
  const c = courses[Math.min(active, n - 1)] || {};

  return (
    <section ref={ref} className={cx('bk-courses', 'bk-courses--' + m, compact && 'bk-compact', className)} style={style}>
      {heading && <div className="bk-courses__head"><SectionHeading tone="dark" {...heading} /></div>}
      {m === 'stack' ? (
        <ol className="bk-courses__stack">
          {courses.map((co, i) => (
            <li key={i} className="bk-course">
              <span className="bk-course__dot" aria-hidden="true" />
              <span className="bk-course__numeral">{co.numeral}</span>
              <h3 className="bk-course__name">{co.name}</h3>
              <p className="bk-course__note">{co.note}</p>
              <div className="bk-course__media"><ArchImage shape="tall" tone="dark" src={co.image} alt={co.imageAlt} /></div>
            </li>
          ))}
        </ol>
      ) : (
        <div ref={trackRef} className="bk-courses__track" style={m === 'pinned' ? { height: 'calc(' + n + ' * 55vh + 100vh)' } : undefined}>
          <div className="bk-courses__stage">
            <ol className="bk-courses__progress" aria-label="Courses">
              {courses.map((co, i) => (
                <li key={i}>
                  <button type="button" className={cx('bk-courses__dot', i === active && 'is-active', i < active && 'is-past')} onClick={() => jump(i)} aria-current={i === active ? 'step' : undefined} aria-label={'Course ' + co.numeral + ', ' + co.name}>
                    <span className="bk-courses__dot-mark" aria-hidden="true" />
                    <span className="bk-courses__dot-label">{co.numeral}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div key={'t' + active} className="bk-courses__text">
              <span className="bk-course__numeral">{c.numeral}</span>
              <h3 className="bk-course__name">{c.name}</h3>
              <p className="bk-course__note">{c.note}</p>
              <span className="bk-niche bk-course__icon" aria-hidden="true">{renderMotif(c.icon)}</span>
            </div>
            <div key={'m' + active} className="bk-courses__media">
              <ArchImage shape="tall" tone="dark" src={c.image} alt={c.imageAlt} loading="eager" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
