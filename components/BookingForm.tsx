'use client';

import { useId, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { business, services } from '@/lib/business';
import { racketStrings, sports } from '@/lib/strings';
import { buildWhatsAppUrlForMessage } from '@/lib/whatsapp';

export type BookingPrefill = { service?: string; string?: string; color?: string; tension?: string };

const SUGGEST = 'suggest';
const OWN = 'own';
const tensions = Array.from({ length: 13 }, (_, i) => String(18 + i));
const dropOffs = ['Today', 'Tomorrow', 'Later this week', 'Not sure yet'];

/**
 * Booking details written into one WhatsApp message, so the shop gets everything it needs in the first message.
 * Nothing is sent from the site itself; the customer reviews the message in WhatsApp.
 */
export default function BookingForm({ prefill = {} }: { prefill?: BookingPrefill }) {
  const id = useId();
  const [service, setService] = useState(services.some((s) => s.slug === prefill.service) ? prefill.service! : services[0].slug);
  const [racket, setRacket] = useState('');
  const [stringSlug, setStringSlug] = useState(racketStrings.some((s) => s.slug === prefill.string) ? prefill.string! : SUGGEST);
  const chosen = racketStrings.find((s) => s.slug === stringSlug);
  const [color, setColor] = useState(chosen && prefill.color && chosen.colors.some((c) => c === prefill.color) ? prefill.color : '');
  const [tension, setTension] = useState(tensions.includes(prefill.tension ?? '') ? prefill.tension! : '');
  const [count, setCount] = useState('1');
  const [dropOff, setDropOff] = useState(dropOffs[0]);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const serviceName = services.find((s) => s.slug === service)?.name ?? '';
  const colorText = chosen && color ? ` in ${color}` : '';
  const stringText = chosen ? `${chosen.brand} ${chosen.name}${colorText}` : stringSlug === OWN ? 'my own string (I will bring it)' : 'please suggest a string for me';

  const lines = [
    `Hello ${business.name}, I would like to book a racket stringing.`,
    `• Service: ${serviceName}`,
    `• Rackets: ${count}${racket.trim() ? ` (${racket.trim()})` : ''}`,
    `• String: ${stringText}`,
    `• Tension: ${tension ? `${tension} lbs` : 'please advise'}`,
    `• Drop-off: ${dropOff}`,
    notes.trim() && `• Notes: ${notes.trim()}`,
    name.trim() && `Name: ${name.trim()}`,
    'Please confirm the total price and when it will be ready.',
  ].filter(Boolean);
  const message = lines.join('\n');
  const href = buildWhatsAppUrlForMessage(message);

  const field = 'mt-1.5 min-h-12 w-full rounded-lg border border-line bg-paper px-3 text-base text-ink';
  const label = 'block text-sm font-semibold text-ink';

  return (
    <div id="book" className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7">
      <h2 className="font-display text-lg font-extrabold uppercase text-navy-900">Book your stringing</h2>
      <p className="mt-1 text-sm text-ink-muted">Fill in what you know. We reply on WhatsApp with the total and ready time.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-service`} className={label}>Service</label>
          <select id={`${id}-service`} value={service} onChange={(e) => setService(e.target.value)} className={field}>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-string`} className={label}>String</label>
          <select
            id={`${id}-string`}
            value={stringSlug}
            onChange={(e) => { setStringSlug(e.target.value); setColor(''); }}
            className={field}
          >
            <option value={SUGGEST}>Suggest a string for me</option>
            <option value={OWN}>I will bring my own string</option>
            {sports.map((sp) => {
              const list = racketStrings.filter((s) => s.sport === sp);
              return list.length > 0 && (
                <optgroup key={sp} label={sp}>
                  {list.map((s) => <option key={s.slug} value={s.slug}>{s.brand} {s.name}</option>)}
                </optgroup>
              );
            })}
          </select>
        </div>

        {chosen && (
          <div>
            <label htmlFor={`${id}-color`} className={label}>Colour</label>
            <select id={`${id}-color`} value={color} onChange={(e) => setColor(e.target.value)} className={field}>
              <option value="">Any colour</option>
              {chosen.colors.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}

        <div>
          <label htmlFor={`${id}-tension`} className={label}>Tension</label>
          <select id={`${id}-tension`} value={tension} onChange={(e) => setTension(e.target.value)} className={field}>
            <option value="">Advise me</option>
            {tensions.map((t) => <option key={t} value={t}>{t} lbs</option>)}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-count`} className={label}>Number of rackets</label>
          <select id={`${id}-count`} value={count} onChange={(e) => setCount(e.target.value)} className={field}>
            {['1', '2', '3', '4', '5+'].map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-drop`} className={label}>Drop-off</label>
          <select id={`${id}-drop`} value={dropOff} onChange={(e) => setDropOff(e.target.value)} className={field}>
            {dropOffs.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-racket`} className={label}>Racket model <span className="font-normal text-ink-muted">(optional)</span></label>
          <input id={`${id}-racket`} value={racket} onChange={(e) => setRacket(e.target.value)} placeholder="e.g. Yonex Astrox 88D" className={field} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className={label}>Your name <span className="font-normal text-ink-muted">(optional)</span></label>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-notes`} className={label}>Notes <span className="font-normal text-ink-muted">(optional)</span></label>
          <textarea id={`${id}-notes`} value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Broken grommets, grip change, pickup time…" className={`${field} py-2.5`} />
        </div>
      </div>

      <p className="mt-5 whitespace-pre-line rounded-lg bg-card p-3 text-sm leading-relaxed text-ink-muted">
        <span className="font-semibold text-ink">Message preview:</span>{'\n'}{message}
      </p>

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
          <MessageCircle aria-hidden="true" className="size-5" />
          Send booking on WhatsApp
          <span className="sr-only"> (opens WhatsApp in a new tab)</span>
        </a>
      ) : (
        <p role="note" className="mt-5 rounded-lg border border-dashed border-current p-3 text-sm">
          WhatsApp bookings are not set up yet. Please call or visit the shop.
        </p>
      )}
    </div>
  );
}
