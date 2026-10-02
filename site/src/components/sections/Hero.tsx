'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import { cx, renderMotif, type Motif } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/hooks';
import type { Action } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

export type HeroProps = {
  image?: string;
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
export function Hero({ image, imageAlt = 'The Baro Kuthi façade at dusk, lamps lit', eyebrow, title, lead, primaryAction, secondaryAction, chandelier, height, className, style }: HeroProps) {
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

  return (
    <section className={cx('bk-hero', className)} style={{ minHeight: height, ...style }}>
      <div className="bk-hero__media">
        {image ? (
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
