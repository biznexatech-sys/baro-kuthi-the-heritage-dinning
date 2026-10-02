/* Kit-level layout helpers (page composition only — every visual primitive comes from the design system bundle). */
function PageSection({ tone = 'light', id, flushTop, flushBottom, children, style, className }) {
  const cls = ['kit-section', 'kit-section--' + tone, flushTop && 'kit-section--flush-top', flushBottom && 'kit-section--flush-bottom', className].filter(Boolean).join(' ');
  return (
    <section id={id} className={cls} style={style}>
      <div className="kit-inner">{children}</div>
    </section>
  );
}

function LeaderList({ rows }) {
  return (
    <ul className="kit-leaders">
      {rows.map((r, i) => (
        <li key={i}><span className="k">{r.label}</span><span className="bk-leader" aria-hidden="true" /><span className="v">{r.value}</span></li>
      ))}
    </ul>
  );
}

Object.assign(window, { PageSection, LeaderList });
