import React from 'react';
import { cx } from '../../lib/helpers.js';

export function Eyebrow({ children, numeral, tone = 'light', as: Tag = 'p', className, style }) {
  return (
    <Tag className={cx('bk-eyebrow', 'bk-eyebrow--' + tone, className)} style={style}>
      {numeral && <span className="bk-eyebrow__numeral">{numeral}</span>}
      {numeral && children && <span className="bk-eyebrow__sep" aria-hidden="true">·</span>}
      {children}
    </Tag>
  );
}
