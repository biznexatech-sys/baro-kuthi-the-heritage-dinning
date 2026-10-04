'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cx, renderMotif, type Motif } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/hooks';
import type { Action } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { AlponaCorner } from '@/components/ui/Alpona';

export type HeroSlide = { src: string; alt: string };

/** Time each slide holds before the crossfade (ms). */
const SLIDE_MS = 7000;

export type HeroProps = {
  image?: string;
  /** Two or more photographs crossfade with a slow zoom, advancing on their own (paused on hover; off under reduced motion). */
  slides?: HeroSlide[];
  /** Alpona line-work: four corner motifs inside the frame. */
  alpona?: boolean;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  primaryAction?: Action | null;
  secondaryAction?: Action | null;
  /** chandelier.svg — hangs from the top centre and sways ±1.5° with scroll velocity. */
  chandelier?: Motif;
  /** e.g. '72svh' for inner pages; defaults to the full viewport below the header. */
  height?: string;
  className?: string;
  style?: CSSProperties;
};

/** §9.5 "The Gate" — full-bleed dusk photograph, terracotta-deep gradient, double copper frame inset 24px. */
export function Hero({ image, slides, alpona = false, imageAlt = 'The Baro Kuthi façade at dusk, lamps lit', eyebrow, title, lead, primaryAction, secondaryAction, chandelier, height, className, style }: HeroProps) {
  const chRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chandelier || prefersReducedMotion()) return undefined;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let settle = 0;
    const on = () => {
      const now = performance.now();
      const v = (window.scrollY - lastY) / Math.max(16, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      const deg = Math.max(-1.5, Math.min(1.5, v * 3));
      chRef.current?.style.setProperty('--sway', deg.toFixed(2) + 'deg');
      window.clearTimeout(settle);
      settle = window.setTimeout(() => chRef.current?.style.setProperty('--sway', '0deg'), 160);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      window.clearTimeout(settle);
    };
  }, [chandelier]);

  const count = slides?.length ?? 0;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) setPaused(true);
  }, []);
  useEffect(() => {
    if (count < 2 || paused || hover || hidden) return undefined;
    const t = window.setTimeout(() => setActive((active + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [active, count, paused, hover, hidden]);
  // Stop when the tab is hidden so the slide doesn't jump on return.
  useEffect(() => {
    const on = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);

  return (
    <section
      className={cx('bk-hero', count > 1 && 'bk-hero--slider', (paused || hover || hidden) && 'is-paused', className)}
      style={{ minHeight: height, ['--slide-ms' as string]: SLIDE_MS + 'ms', ...style }}
      aria-roledescription={count > 1 ? 'carousel' : undefined}
      onMouseEnter={count > 1 ? () => setHover(true) : undefined}
      onMouseLeave={count > 1 ? () => setHover(false) : undefined}
    >
      <div className="bk-hero__media">
        {count > 0 ? (
          slides!.map((sl, i) => (
            <div key={sl.src} className={cx('bk-hero__slide', i === active && 'is-active')} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} aria-hidden={i !== active}>
              <img src={sl.src} alt={sl.alt} className="bk-hero__img" fetchPriority={i === 0 ? 'high' : 'low'} decoding="async" />
            </div>
          ))
        ) : image ? (
          <img src={image} alt={imageAlt} className="bk-hero__img" fetchPriority="high" />
        ) : (
          <div className="bk-hero__placeholder" role="img" aria-label={imageAlt}>
            <span className="bk-hero__ph">
              <span className="bk-hero__ph-label">Photograph · 21:9</span>
              <span className="bk-hero__ph-alt">{imageAlt}</span>
            </span>
          </div>
        )}
      </div>
      <div className="bk-hero__shade" aria-hidden="true" />
      <div className="bk-hero__frame bk-frame" aria-hidden="true" />
      {alpona && (
        <div className="bk-hero__alpona" aria-hidden="true">
          <AlponaCorner className="bk-hero__corner bk-hero__corner--tl" />
          <AlponaCorner className="bk-hero__corner bk-hero__corner--tr" />
          <AlponaCorner className="bk-hero__corner bk-hero__corner--bl" />
          <AlponaCorner className="bk-hero__corner bk-hero__corner--br" />
        </div>
      )}
      {chandelier && (
        <div ref={chRef} className="bk-hero__chandelier">
          {renderMotif(chandelier, 'bk-hero__chandelier-art')}
        </div>
      )}
      <div className="bk-hero__content">
        {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
        <h1 className="bk-hero__title">{title}</h1>
        {lead && <p className="bk-hero__lead">{lead}</p>}
        {(primaryAction || secondaryAction) && (
          <div className="bk-hero__actions">
            {primaryAction && (
              <Button variant="primary" href={primaryAction.href}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="on-dark" href={secondaryAction.href}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
