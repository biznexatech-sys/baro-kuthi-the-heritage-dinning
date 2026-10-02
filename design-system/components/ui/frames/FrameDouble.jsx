import React from 'react';
import { cx } from '../../lib/helpers.js';

const FILLS = { none: 'transparent', parchment: 'var(--parchment)', 'parchment-dark': 'var(--parchment-dark)', 'terracotta-deep': 'var(--terracotta-deep)' };

export function FrameDouble({ as: Tag = 'div', fill = 'none', padding = 48, children, className, style, ...rest }) {
  const pad = typeof padding === 'number' ? padding + 'px' : padding;
  return (
    <Tag className={cx('bk-frame', className)} style={{ background: FILLS[fill] || fill, padding: pad, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
