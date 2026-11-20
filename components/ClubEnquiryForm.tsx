'use client';

import { useId, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { business } from '@/lib/business';
import { racketStrings } from '@/lib/strings';
import { buildWhatsAppUrlForMessage } from '@/lib/whatsapp';

const orgTypes = ['Coaching academy', 'Badminton club', 'School or college', 'Company team', 'Other'];
const volumes = ['Under 10', '10–25', '25–50', '50+'];
const frequencies = ['One-off batch', 'Every week', 'Every month', 'Not sure yet'];

/**
 * Club / academy enquiry written into one WhatsApp message, like the booking form.
 * Nothing is sent from the site itself; the sender reviews the message in WhatsApp.
 */
export default function ClubEnquiryForm() {
  const id = useId();
  const [org, setOrg] = useState('');
  const [type, setType] = useState(orgTypes[0]);
  const [volume, setVolume] = useState(volumes[1]);
  const [frequency, setFrequency] = useState(frequencies[2]);
  const [strings, setStrings] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const toggleString = (n: string) => setStrings((l) => (l.includes(n) ? l.filter((x) => x !== n) : [...l, n]));

  const lines = [
    `Hello ${business.name}, I would like a quote for bulk racket stringing.`,
    `• Organisation: ${org.trim() || '(not given)'} (${type})`,
    `• Rackets per batch: ${volume}`,
    `• How often: ${frequency}`,
    `• Strings: ${strings.length ? strings.join(', ') : 'please suggest'}`,
    notes.trim() && `• Notes: ${notes.trim()}`,
    name.trim() && `Name: ${name.trim()}`,
    'Please share your batch price and turnaround.',
  ].filter(Boolean);
  const message = lines.join('\n');
  const href = buildWhatsAppUrlForMessage(message);

  const field = 'mt-1.5 min-h-12 w-full rounded-lg border border-line bg-paper px-3 text-base text-ink';
  const label = 'block text-sm font-semibold text-ink';

  return (
    <div id="enquire" className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7">
      <h2 className="font-display text-lg font-extrabold uppercase text-navy-900">Get a batch quote</h2>
      <p className="mt-1 text-sm text-ink-muted">Fill in what you know. We reply on WhatsApp with a price for your batch.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-org`} className={label}>Academy / club name</label>
          <input id={`${id}-org`} value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-type`} className={label}>Type</label>
          <select id={`${id}-type`} value={type} onChange={(e) => setType(e.target.value)} className={field}>
            {orgTypes.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-volume`} className={label}>Rackets per batch</label>
          <select id={`${id}-volume`} value={volume} onChange={(e) => setVolume(e.target.value)} className={field}>
            {volumes.map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-freq`} className={label}>How often</label>
          <select id={`${id}-freq`} value={frequency} onChange={(e) => setFrequency(e.target.value)} className={field}>
            {frequencies.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={label}>Strings you use <span className="font-normal text-ink-muted">(optional)</span></legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {racketStrings.map((s) => {
              const n = `${s.brand} ${s.name}`;
              const on = strings.includes(n);
              return (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleString(n)}
                  className={`min-h-10 rounded-full border px-3 text-sm font-semibold transition-colors ${on ? 'border-navy-900 bg-navy-900 text-white' : 'border-line bg-paper text-ink hover:border-navy-700'}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className={label}>Your name <span className="font-normal text-ink-muted">(optional)</span></label>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-notes`} className={label}>Notes <span className="font-normal text-ink-muted">(optional)</span></label>
          <textarea id={`${id}-notes`} value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Area, tensions, dates you need them back…" className={`${field} py-2.5`} />
        </div>
      </div>

      <p className="mt-5 whitespace-pre-line rounded-lg bg-card p-3 text-sm leading-relaxed text-ink-muted">
        <span className="font-semibold text-ink">Message preview:</span>{'\n'}{message}
      </p>

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
          <MessageCircle aria-hidden="true" className="size-5" />
          Send enquiry on WhatsApp
          <span className="sr-only"> (opens WhatsApp in a new tab)</span>
        </a>
      ) : (
        <p role="note" className="mt-5 rounded-lg border border-dashed border-current p-3 text-sm">
          WhatsApp enquiries are not set up yet. Please call or visit the shop.
        </p>
      )}
    </div>
  );
}
