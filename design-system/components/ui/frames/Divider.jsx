import React from 'react';
import { cx, useDrawOnView } from '../../lib/helpers.js';

export function Divider({ motif, width = 480, space, draw = true, className, style }) {
  const ref = React.useRef(null);
  const state = useDrawOnView(ref, draw);
  const vars = { '--divider-w': width + 'px' };
  if (space != null) vars['--divider-space'] = space + 'px';
  let body;
  if (typeof motif === 'string') body = <span className="bk-divider__motif" style={{ backgroundImage: 'url("' + motif + '")' }} />;
  else if (motif) body = <span className="bk-divider__motif bk-divider__motif--inline">{motif}</span>;
  else body = <span className={cx('bk-divider__rule', 'is-' + state)} />;
  return <div ref={ref} role="separator" className={cx('bk-divider', className)} style={{ ...vars, ...style }}>{body}</div>;
}
