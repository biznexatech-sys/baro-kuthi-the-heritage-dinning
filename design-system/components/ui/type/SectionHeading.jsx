import React from 'react';
import { cx, useReveal, renderMotif } from '../../lib/helpers.js';
import { Eyebrow } from './Eyebrow.jsx';

export function SectionHeading({ eyebrow, numeral, title, lead, tone = 'light', align, ornament, as: Tag = 'h2', size = 'h2', reveal = true, className, style }) {
  const ref = React.useRef(null);
  useReveal(ref, 0, reveal);
  const a = align || (tone === 'light' ? 'left' : 'center');
  return (
    <header ref={ref} className={cx('bk-heading', 'bk-heading--' + tone, 'bk-heading--' + a, className)} style={style}>
      {ornament !== false && (
        <div className="bk-heading__ornament" aria-hidden="true">
          {renderMotif(ornament, 'bk-heading__motif') || <span className="bk-heading__rule" />}
        </div>
      )}
      {(eyebrow || numeral) && <Eyebrow numeral={numeral} tone={tone}>{eyebrow}</Eyebrow>}
      {title && <Tag className={cx('bk-heading__title', 'bk-heading__title--' + size)}>{title}</Tag>}
      {lead && <p className="bk-heading__lead">{lead}</p>}
    </header>
  );
}
