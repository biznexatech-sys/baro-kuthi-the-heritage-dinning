import type { LabelValue } from '@/lib/content';

/** Letterpress rows: LABEL ········ value, with copper dotted leaders. */
export function LeaderList({ rows }: { rows: LabelValue[] }) {
  return (
    <ul className="pg-leaders">
      {rows.map((r) => (
        <li key={r.label}>
          <span className="pg-leaders__k">{r.label}</span>
          <span className="bk-leader" aria-hidden="true" />
          <span className="pg-leaders__v">{r.value}</span>
        </li>
      ))}
    </ul>
  );
}
