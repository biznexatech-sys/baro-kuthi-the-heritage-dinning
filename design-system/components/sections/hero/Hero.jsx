import React from 'react';
import { cx, useCompact, renderMotif, prefersReducedMotion } from '../../lib/helpers.js';
import { Eyebrow } from '../../ui/type/Eyebrow.jsx';
import { Button } from '../../ui/actions/Button.jsx';

export function Hero({ image, imageAlt = 'The Baro Kuthi façade at dusk, lamps lit', eyebrow = 'Est. 1823 · Paikpara, Kolkata', title = 'The Rajbari Table', lead = 'The house receives guests for dinner from 7 pm.', primaryAction = { label: 'Reserve by Telephone', href: 'tel:+91XXXXXXXXXX' }, secondaryAction = { label: 'View the Menu', href: '#menu' }, chandelier, height, layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  const chRef = React.useRef(null);
  React.useEffect(() => {
    if (!chandelier || prefersReducedMotion()) return undefined;
    let lastY = window.scrollY, lastT = performance.now(), settle = 0;
    const on = () => {
      const now = performance.now();
      const v = (window.scrollY - lastY) / Math.max(16, now - lastT);
      lastY = window.scrollY; lastT = now;
      const deg = Math.max(-1.5, Math.min(1.5, v * 3));
      if (chRef.current) chRef.current.style.setProperty('--sway', deg.toFixed(2) + 'deg');
      window.clearTimeout(settle);
      settle = window.setTimeout(() => { if (chRef.current) chRef.current.style.setProperty('--sway', '0deg'); }, 160);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); window.clearTimeout(settle); };
  }, [chandelier]);
  const action = (a, variant) => a && <Button variant={variant} href={a.href} onClick={a.onClick}>{a.label}</Button>;
  return (
    <section ref={ref} className={cx('bk-hero', compact && 'bk-compact bk-hero--compact', className)} style={{ minHeight: height, ...style }}>
      <div className="bk-hero__media">
        {image ? <img src={image} alt={imageAlt} className="bk-hero__img" fetchpriority="high" /> : (
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
      {chandelier && <div ref={chRef} className="bk-hero__chandelier">{renderMotif(chandelier, 'bk-hero__chandelier-art')}</div>}
      <div className="bk-hero__content">
        {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
        <h1 className="bk-hero__title">{title}</h1>
        {lead && <p className="bk-hero__lead">{lead}</p>}
        {(primaryAction || secondaryAction) && (
          <div className="bk-hero__actions">{action(primaryAction, 'primary')}{action(secondaryAction, 'on-dark')}</div>
        )}
      </div>
    </section>
  );
}
