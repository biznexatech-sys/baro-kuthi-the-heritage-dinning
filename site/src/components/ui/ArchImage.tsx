'use client';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cx } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/hooks';

export type ImageShape = 'arch' | 'tall' | 'wide' | 'cinema' | 'square';

const RATIO: Record<ImageShape, string> = { arch: '3 / 4', tall: '2 / 3', wide: '16 / 9', cinema: '21 / 9', square: '1 / 1' };
const LABEL: Record<ImageShape, string> = { arch: '3:4', tall: '2:3', wide: '16:9', cinema: '21:9', square: '1:1' };

export type ArchImageProps = {
  src?: string;
  alt?: string;
  shape?: ImageShape;
  tone?: 'light' | 'dark';
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  /** Images only, ≤ 8% movement; off under reduced motion. */
  parallax?: boolean;
  caption?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** §7 — one primitive for every image shape. With no src, a labelled placeholder prints the intended shot. */
export function ArchImage({ src, alt = '', shape = 'arch', tone = 'light', width, height, loading = 'lazy', parallax = false, caption, className, style }: ArchImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!parallax || !src || prefersReducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const f = frameRef.current;
      const img = imgRef.current;
      if (!f || !img) return;
      const r = f.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      img.style.transform = `translateY(${(p * -4).toFixed(2)}%) scale(1.08)`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, [parallax, src]);
  return (
    <figure className={cx('bk-img', 'bk-img--' + shape, 'bk-img--' + tone, className)} style={style}>
      <div ref={frameRef} className="bk-img__frame" style={{ aspectRatio: RATIO[shape] }}>
        {src ? (
          <img ref={imgRef} className="bk-img__img" src={src} alt={alt} width={width} height={height} loading={loading} decoding="async" />
        ) : (
          <div className="bk-img__placeholder" role="img" aria-label={alt || 'Photograph to come'}>
            <span className="bk-img__ph-label">Photograph · {LABEL[shape]}</span>
            {alt && <span className="bk-img__ph-alt">{alt}</span>}
          </div>
        )}
      </div>
      {caption && <figcaption className="bk-img__caption">{caption}</figcaption>}
    </figure>
  );
}
