/**
 * Alpona — Bengali floor-art motifs drawn as line work (rice-paste white, rendered here in currentColor).
 * Built from repeated petals, rings and dot trails so every motif stays symmetric and crisp at any size.
 * Purely decorative: always aria-hidden.
 */
import type { SVGProps } from 'react';

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A lotus petal pointing up from radius r1 to r2, half-width w; rotated by `deg` about the origin. */
function petal(r1: number, r2_: number, w: number, deg: number, key: string, inner = true) {
  const len = r2_ - r1;
  const d = `M0 ${-r1} C${w} ${r2(-r1 - len * 0.3)} ${r2(w * 0.55)} ${r2(-r2_ + len * 0.12)} 0 ${-r2_} C${r2(-w * 0.55)} ${r2(-r2_ + len * 0.12)} ${-w} ${r2(-r1 - len * 0.3)} 0 ${-r1}Z`;
  const vein = `M0 ${r2(-r1 - len * 0.18)} L0 ${r2(-r2_ + len * 0.22)}`;
  return (
    <g key={key} transform={`rotate(${r2(deg)})`}>
      <path d={d} />
      {inner && <path d={vein} />}
    </g>
  );
}

/** Dots evenly spaced on a circle (or arc from a0→a1 degrees). */
function dots(r: number, n: number, size: number, key: string, a0 = 0, a1 = 360) {
  const full = a1 - a0 >= 360;
  const step = (a1 - a0) / (full ? n : n - 1);
  return Array.from({ length: n }, (_, i) => {
    const a = ((a0 + i * step - 90) * Math.PI) / 180;
    return <circle key={key + i} cx={r2(Math.cos(a) * r)} cy={r2(Math.sin(a) * r)} r={size} className="bk-alpona__dot" />;
  });
}

/**
 * Corner alpona — a quarter lotus rising from the corner with a curling creeper (lata) and dot trails
 * running along both edges. Drawn for the top-left corner; mirror with CSS scale() for the others.
 */
export function AlponaCorner(props: SVGProps<SVGSVGElement>) {
  const quarter = (r1: number, r2_: number, w: number, n: number, key: string) =>
    Array.from({ length: n }, (_, i) => (
      <g key={key + i} transform="rotate(90)">
        {petal(r1, r2_, w, (i * 90) / (n - 1), key + 'p' + i)}
      </g>
    ));
  // The curl: a creeper that leaves the lotus along an edge and ends in a spiral with a leaf.
  const creeper = 'M62 6 C80 4 92 12 102 10 C114 8 120 -0 132 4 C144 8 146 20 138 26 C131 31 122 26 125 19 C127 14 134 14 135 19';
  const leaf = 'M100 10 C104 18 112 22 120 20 C114 14 106 11 100 10Z';
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      <g>
        <path d="M0 10 A10 10 0 0 0 10 0" />
        {quarter(14, 46, 8, 5, 'a')}
        <path d="M0 52 A52 52 0 0 0 52 0" />
        {dots(57, 9, 1.1, 'da', 90, 180)}
        <path d="M0 62 A62 62 0 0 0 62 0" />
        {quarter(64, 84, 5.5, 7, 'b')}
      </g>
      <path d={creeper} />
      <path d={leaf} />
      <g transform="matrix(0 1 1 0 0 0)">
        <path d={creeper} />
        <path d={leaf} />
      </g>
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={'tx' + i} cx={148 + i * 6} cy={5} r={i % 3 === 0 ? 1.5 : 0.9} className="bk-alpona__dot" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={'ty' + i} cx={5} cy={148 + i * 6} r={i % 3 === 0 ? 1.5 : 0.9} className="bk-alpona__dot" />
      ))}
    </svg>
  );
}
