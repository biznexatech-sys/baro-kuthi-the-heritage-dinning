'use client';
import { useEffect, useRef, useState } from 'react';
import { cx, MQ_MOBILE, renderMotif } from '@/lib/utils';
import { useMediaQuery, useReducedMotion, useHydrated } from '@/lib/hooks';
import { scrollToY } from '@/lib/scroll';
import type { Course } from '@/lib/content';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/SectionHeading';
import { ArchImage } from '@/components/ui/ArchImage';

export type CourseScrollProps = {
  courses: Course[];
  heading?: SectionHeadingProps;
};

/**
 * §9.9 "The Course of a Rajbari Meal" — pinned on desktop: each course enters in sequence as you scroll,
 * with a copper progress line and a glowing dot for the active course.
 * Prerendered as the simple vertical stack (complete content for crawlers, phones and reduced motion);
 * desktop upgrades to the pinned sequence after hydration. The section sits below the fold, so the swap is unseen.
 */
export function CourseScroll({ courses, heading }: CourseScrollProps) {
  const hydrated = useHydrated();
  const mobile = useMediaQuery(MQ_MOBILE);
  const reduced = useReducedMotion();
  const pinned = hydrated && !mobile && !reduced;
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const n = courses.length;

  useEffect(() => {
    if (!pinned || !n) return undefined;
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
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, [pinned, n]);

  const jump = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    scrollToY(window.scrollY + r.top + ((i + 0.5) / n) * total);
  };
  const c = courses[Math.min(active, n - 1)];

  return (
    <section className={cx('bk-courses', pinned ? 'bk-courses--pinned' : 'bk-courses--stack')}>
      {heading && (
        <div className="bk-courses__head">
          <SectionHeading tone="dark" {...heading} />
        </div>
      )}
      {!pinned ? (
        <ol className="bk-courses__stack">
          {courses.map((co) => (
            <li key={co.numeral} className="bk-course">
              <span className="bk-course__dot" aria-hidden="true" />
              <span className="bk-course__numeral">{co.numeral}</span>
              <h3 className="bk-course__name">{co.name}</h3>
              <p className="bk-course__note">{co.note}</p>
              <div className="bk-course__media">
                <ArchImage shape="tall" tone="dark" src={co.image} alt={co.imageAlt} />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div ref={trackRef} className="bk-courses__track" style={{ height: `calc(${n} * 55vh + 100vh)` }}>
          <div className="bk-courses__stage">
            <ol className="bk-courses__progress" aria-label="Courses">
              {courses.map((co, i) => (
                <li key={co.numeral}>
                  <button type="button" className={cx('bk-courses__dot', i === active && 'is-active', i < active && 'is-past')} onClick={() => jump(i)} aria-current={i === active ? 'step' : undefined} aria-label={`Course ${co.numeral}, ${co.name}`}>
                    <span className="bk-courses__dot-mark" aria-hidden="true" />
                    <span className="bk-courses__dot-label">{co.numeral}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div key={'t' + active} className="bk-courses__text" aria-live="polite">
              <span className="bk-course__numeral">{c.numeral}</span>
              <h3 className="bk-course__name">{c.name}</h3>
              <p className="bk-course__note">{c.note}</p>
              <span className="bk-niche bk-course__icon" aria-hidden="true">
                {renderMotif(c.icon)}
              </span>
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
