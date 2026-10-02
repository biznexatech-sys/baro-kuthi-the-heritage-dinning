import React from 'react';
import { cx, prefersReducedMotion } from '../../lib/helpers.js';

const RATIO = { arch: '3 / 4', tall: '2 / 3', wide: '16 / 9', cinema: '21 / 9', square: '1 / 1' };
const LABEL = { arch: '3:4', tall: '2:3', wide: '16:9', cinema: '21:9', square: '1:1' };

export function ArchImage({ src, alt = '', shape = 'arch', tone = 'light', width, height, loading = 'lazy', parallax = false, caption, className, style }) {
  const frameRef = React.useRef(null);
  const imgRef = React.useRef(null);
  React.useEffect(() => {
    if (!parallax || !src || prefersReducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const f = frameRef.current, img = imgRef.current;
      if (!f || !img) return;
      const r = f.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      img.style.transform = 'translateY(' + (p * -4).toFixed(2) + '%) scale(1.08)';
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, [parallax, src]);
  return (
    <figure className={cx('bk-img', 'bk-img--' + shape, 'bk-img--' + tone, className)} style={style}>
      <div ref={frameRef} className="bk-img__frame" style={{ aspectRatio: RATIO[shape] || RATIO.arch }}>
        {src ? (
          <img ref={imgRef} className="bk-img__img" src={src} alt={alt} width={width} height={height} loading={loading} />
        ) : (
          <div className="bk-img__placeholder" role="img" aria-label={alt || 'Photograph to come'}>
            <span className="bk-img__ph-label">Photograph · {LABEL[shape] || LABEL.arch}</span>
            {alt && <span className="bk-img__ph-alt">{alt}</span>}
          </div>
        )}
      </div>
      {caption && <figcaption className="bk-img__caption">{caption}</figcaption>}
    </figure>
  );
}
