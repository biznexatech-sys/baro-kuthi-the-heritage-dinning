import React from 'react';
import { cx, prefersReducedMotion, renderMotif } from '../../lib/helpers.js';
import { Eyebrow } from '../../ui/type/Eyebrow.jsx';
import { TextLink } from '../../ui/actions/TextLink.jsx';

const BOT = /bot|crawl|spider|slurp|lighthouse|headless/i;

function seenRecently(key, days) {
  try { const t = Number(window.localStorage.getItem(key)); return !!t && Date.now() - t < days * 864e5; } catch (e) { return false; }
}
function remember(key) {
  try { window.localStorage.setItem(key, String(Date.now())); } catch (e) { /* storage unavailable — show again next time */ }
}

export function InvitationIntro({ open, onEnter, onSkip, storageKey = 'bk-invitation-seen', rememberDays = 30, seal, shutter, position = 'fixed', className, style }) {
  const [phase, setPhase] = React.useState(() => {
    if (open != null) return open ? 'idle' : 'gone';
    if (typeof window === 'undefined') return 'gone';
    if (navigator.webdriver || BOT.test(navigator.userAgent || '')) return 'gone';
    if (prefersReducedMotion()) return 'gone';
    return seenRecently(storageKey, rememberDays) ? 'gone' : 'idle';
  });
  const timer = React.useRef(0);
  React.useEffect(() => { if (open != null) setPhase(open ? 'idle' : 'gone'); }, [open]);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  React.useEffect(() => {
    if (phase === 'gone' || position !== 'fixed') return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => { root.style.overflow = prev; };
  }, [phase === 'gone', position]);

  const enter = () => {
    remember(storageKey);
    if (prefersReducedMotion()) { setPhase('gone'); if (onEnter) onEnter(); return; }
    setPhase('opening');
    timer.current = window.setTimeout(() => { setPhase('gone'); if (onEnter) onEnter(); }, 1200);
  };
  const skip = (e) => {
    if (e) e.preventDefault();
    remember(storageKey);
    setPhase('gone');
    if (onSkip) onSkip(); else if (onEnter) onEnter();
  };
  if (phase === 'gone') return null;
  const panel = shutter ? { backgroundImage: 'url("' + shutter + '")' } : undefined;
  return (
    <div className={cx('bk-invite', 'bk-invite--' + position, phase === 'opening' && 'is-opening', className)} style={style} role="dialog" aria-modal="true" aria-label="An invitation from the house">
      <div className="bk-invite__panel bk-invite__panel--left" style={panel} aria-hidden="true" />
      <div className="bk-invite__panel bk-invite__panel--right" style={panel} aria-hidden="true" />
      <div className="bk-invite__skip"><TextLink href="#" onClick={skip}>Skip</TextLink></div>
      <div className="bk-invite__card bk-frame">
        <Eyebrow>An Invitation</Eyebrow>
        <p className="bk-invite__line">The Household of</p>
        <p className="bk-invite__house">Baro Kuthi</p>
        <p className="bk-invite__line">requests the pleasure of your company at dinner.</p>
        <button type="button" className={cx('bk-invite__seal', seal && 'bk-invite__seal--art')} onClick={enter} aria-label="Break the seal and enter">
          {seal ? renderMotif(seal, 'bk-invite__seal-art') : <span className="bk-invite__seal-label">Enter</span>}
        </button>
        <p className="bk-invite__hint">Touch the seal to enter</p>
      </div>
    </div>
  );
}
