import React from 'react';
import { cx } from '../../lib/helpers.js';

export function Button({ variant = 'primary', href, onClick, children, fullWidth = false, disabled = false, type = 'button', target, rel, className, style, ...rest }) {
  const cls = cx('bk-btn', 'bk-btn--' + variant, fullWidth && 'bk-btn--full', className);
  const label = <span className="bk-btn__label">{children}</span>;
  if (href && !disabled) {
    return <a className={cls} href={href} onClick={onClick} target={target} rel={rel} style={style} {...rest}>{label}</a>;
  }
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style} {...rest}>{label}</button>;
}
