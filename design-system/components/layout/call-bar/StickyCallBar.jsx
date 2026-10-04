import React from 'react';
import { cx } from '../../lib/helpers.js';
import { Button } from '../../ui/actions/Button.jsx';

const WA = 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table';

export function StickyCallBar({ phoneHref = 'tel:+918240383737', whatsappHref = WA, callLabel = 'Call', whatsappLabel = 'WhatsApp', position = 'fixed', visibility = 'mobile', spacer = true, className, style }) {
  const only = visibility === 'mobile' && 'bk-mobile-only';
  return (
    <>
      {position === 'fixed' && spacer && <div className={cx('bk-callbar-spacer', only)} aria-hidden="true" />}
      <div className={cx('bk-callbar', 'bk-callbar--' + position, only, className)} style={style} role="region" aria-label="Reserve by telephone or WhatsApp">
        <Button variant="primary" href={phoneHref} fullWidth>{callLabel}</Button>
        <Button variant="secondary" href={whatsappHref} target="_blank" rel="noopener" fullWidth>{whatsappLabel}</Button>
      </div>
    </>
  );
}
