'use client';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { PhoneIcon } from '@/lib/utils';
import type { Hours, Phone } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';

export type ReservationCardProps = {
  eyebrow?: string;
  numeral?: string;
  title?: string;
  message?: string;
  phone: Phone;
  whatsappHref?: string;
  whatsappLabel?: string;
  hours: Hours[];
  /** Room names offered as an optional preference in the request form. */
  rooms?: string[];
};

/** "19:30" → "7.30 pm" (the house writes times this way). */
function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 || 12;
  return m ? `${h12}.${String(m).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
}

/** Half-hour seatings for each sitting, stopping an hour before it closes. */
function seatings(hours: Hours[]) {
  return hours
    .filter((h) => h.opens && h.closes)
    .map((h) => {
      const [oh, om] = h.opens!.split(':').map(Number);
      const [ch, cm] = h.closes!.split(':').map(Number);
      const slots: string[] = [];
      for (let t = oh * 60 + om; t <= ch * 60 + cm - 60; t += 30) slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`);
      return { label: h.label, slots };
    })
    .filter((g) => g.slots.length > 0);
}

/**
 * §9.13 — reservation card on terracotta-deep. Left: invitation, the telephone card and the hours.
 * Right: a table request. The site is static, so sending opens WhatsApp to the house with the request written out;
 * the host confirms personally.
 */
export function ReservationCard({
  eyebrow = 'Reservations',
  numeral,
  title = 'Telephone the House',
  message = 'Tables at Baro Kuthi are arranged personally. Telephone our host, or send a request and the house will confirm.',
  phone,
  whatsappHref,
  whatsappLabel = 'Message on WhatsApp',
  hours,
  rooms = [],
}: ReservationCardProps) {
  const groups = useMemo(() => seatings(hours), [hours]);
  const [today, setToday] = useState('');
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) || '').trim();
    const date = v('date') ? new Date(v('date') + 'T00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const details = [
      `Name: ${v('name')}`,
      `Telephone: ${v('tel')}`,
      `Date: ${date}`,
      `Time: ${formatTime(v('time'))}`,
      `Guests: ${v('guests')}`,
      v('room') && `Room: ${v('room')}`,
      v('note') && `Note: ${v('note')}`,
    ].filter(Boolean);
    const text = ['Namaskar. I would like to request a table at Baro Kuthi.', '', ...details].join('\n');
    const number = phone.e164.replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <div className="bk-resv">
      <div className="bk-resv__info">
        <Eyebrow numeral={numeral} tone="dark">
          {eyebrow}
        </Eyebrow>
        <h2 className="bk-resv__title">{title}</h2>
        <p className="bk-resv__message">{message}</p>

        <div className="bk-resv__contact">
          <span className="bk-resv__icon" aria-hidden="true">
            <PhoneIcon />
          </span>
          <div className="bk-resv__contact-body">
            <span className="bk-resv__label">Reserve by telephone</span>
            <a className="bk-resv__phone" href={phone.href}>
              {phone.display}
            </a>
            {whatsappHref && (
              <a className="bk-resv__wa" href={whatsappHref} target="_blank" rel="noopener">
                {whatsappLabel} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>

        <div className="bk-resv__hours-box">
          <span className="bk-resv__label">Hours</span>
          <ul className="bk-resv__hours">
            {hours.map((h) => (
              <li key={h.label} className="bk-resv__hour">
                <span className="bk-resv__hour-label">{h.label}</span>
                <span className="bk-leader" aria-hidden="true" />
                <span className="bk-resv__hour-value">{h.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form className="bk-resv__form" onSubmit={onSubmit} aria-labelledby="resv-form-title">
        <h3 id="resv-form-title" className="bk-resv__form-title">
          Request a Table
        </h3>
        <div className="bk-resv__fields">
          <label className="bk-field bk-field--wide">
            <span className="bk-field__label">Your name</span>
            <input className="bk-field__input" name="name" type="text" autoComplete="name" required />
          </label>
          <label className="bk-field bk-field--wide">
            <span className="bk-field__label">Telephone</span>
            <input className="bk-field__input" name="tel" type="tel" autoComplete="tel" inputMode="tel" required />
          </label>
          <label className="bk-field">
            <span className="bk-field__label">Date</span>
            <input className="bk-field__input" name="date" type="date" min={today || undefined} required />
          </label>
          <label className="bk-field">
            <span className="bk-field__label">Time</span>
            <select className="bk-field__input" name="time" required defaultValue="">
              <option value="" disabled>
                Select a time
              </option>
              {groups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.slots.map((s) => (
                    <option key={g.label + s} value={s}>
                      {formatTime(s)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="bk-field">
            <span className="bk-field__label">Guests</span>
            <select className="bk-field__input" name="guests" required defaultValue="">
              <option value="" disabled>
                How many?
              </option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i === 0 ? 'guest' : 'guests'}
                </option>
              ))}
              <option value="More than 12">More than 12</option>
            </select>
          </label>
          <label className="bk-field">
            <span className="bk-field__label">Room (optional)</span>
            <select className="bk-field__input" name="room" defaultValue="">
              <option value="">No preference</option>
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="bk-field bk-field--wide">
            <span className="bk-field__label">A note for the host (optional)</span>
            <textarea className="bk-field__input bk-field__input--area" name="note" rows={2} placeholder="An occasion, a dietary need…" />
          </label>
        </div>
        <button type="submit" className="bk-resv__submit">
          Send Request
        </button>
        <p className="bk-resv__fine" role="status">
          {sent ? 'WhatsApp has opened with your request — send it there, and the house will confirm your table.' : 'Your request opens in WhatsApp, written out for the house. The host confirms every table personally.'}
        </p>
      </form>
    </div>
  );
}
