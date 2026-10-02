import React from 'react';
import { cx } from '../../lib/helpers.js';

export function TextLink({ href, onClick, children, arrow = true, tone = 'light', target, rel, className, style, ...rest }) {
  const cls = cx('bk-textlink', tone === 'dark' && 'bk-textlink--dark', className);
  const inner = (
    <>
      <span className="bk-textlink__label">{children}</span>
      {arrow && <span className="bk-textlink__arrow" aria-hidden="true">→</span>}
    </>
  );
  if (!href && onClick) {
    return <button type="button" className={cls} onClick={onClick} style={style} {...rest}>{inner}</button>;
  }
  return <a className={cls} href={href || '#'} onClick={onClick} target={target} rel={rel} style={style} {...rest}>{inner}</a>;
}
