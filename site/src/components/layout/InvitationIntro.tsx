'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { cx, renderMotif } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/hooks';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

const BOT = /bot|crawl|spider|slurp|lighthouse|headless/i;
const STORAGE_KEY = 'bk-invitation-seen';

function seenRecently(days: number) {
  try {
    const t = Number(window.localStorage.getItem(STORAGE_KEY));
    return !!t && Date.now() - t < days * 864e5;
  } catch {
    return false;
  }
}
function remember() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* storage unavailable — the invitation simply shows again next time */
  }
}

type Phase = 'gone' | 'idle' | 'opening';

export type InvitationIntroProps = {
  rememberDays?: number;
  /** Wax-seal crest artwork (URL). Until supplied, a plain copper disc labelled "Enter". */
  seal?: string;
  /** Khorkhori shutter artwork (URL) for the two panels. */
  shutter?: string;
};

/**
 * §9.4 — first visit only. Never shown to bots, with reduced motion, or within 30 days of the last visit.
 * Add ?intro to the URL to replay it. Prerendered hidden and decided after hydration, so pages never
 * ship a blocking overlay to crawlers or to visitors without JavaScript.
 */
export function InvitationIntro({ rememberDays = 30, seal, shutter }: InvitationIntroProps) {
  const [phase, setPhase] = useState<Phase>('gone');
  const timer = useRef(0);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('intro');
    if (forced) return setPhase('idle');
    if (navigator.webdriver || BOT.test(navigator.userAgent || '') || prefersReducedMotion()) return;
    if (!seenRecently(rememberDays)) setPhase('idle');
  }, [rememberDays]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const visible = phase !== 'gone';
  useEffect(() => {
    if (!visible) return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, [visible]);

  const enter = () => {
    remember();
    if (prefersReducedMotion()) return setPhase('gone');
    setPhase('opening');
    timer.current = window.setTimeout(() => setPhase('gone'), 1200);
  };
  const skip = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    remember();
    setPhase('gone');
  };

  if (!visible) return null;
  const panel = shutter ? { backgroundImage: `url("${shutter}")` } : undefined;
  return (
    <div className={cx('bk-invite', 'bk-invite--fixed', phase === 'opening' && 'is-opening')} role="dialog" aria-modal="true" aria-label="An invitation from the house">
      <div className="bk-invite__panel bk-invite__panel--left" style={panel} aria-hidden="true" />
      <div className="bk-invite__panel bk-invite__panel--right" style={panel} aria-hidden="true" />
      <div className="bk-invite__skip">
        <TextLink onClick={skip}>Skip</TextLink>
      </div>
      <div className="bk-invite__card bk-frame">
        <Eyebrow>An Invitation</Eyebrow>
        <p className="bk-invite__line">The Household of</p>
        <p className="bk-invite__house">Baro Kuthi</p>
        <p className="bk-invite__line">requests the pleasure of your company at dinner.</p>
        <button type="button" className={cx('bk-invite__seal', seal && 'bk-invite__seal--art')} onClick={enter} aria-label="Break the seal and enter" autoFocus>
          {seal ? renderMotif(seal, 'bk-invite__seal-art') : <span className="bk-invite__seal-label">Enter</span>}
        </button>
        <p className="bk-invite__hint">Touch the seal to enter</p>
      </div>
    </div>
  );
}
