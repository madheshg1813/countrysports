'use client';

import { useId, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { services } from '@/lib/business';
import { buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp';

/** Lets the customer choose a service; the choice is written into the WhatsApp message. */
export default function ServicePicker({ tone = 'light' }: { tone?: 'dark' | 'light' }) {
  const selectId = useId();
  const previewId = useId();
  const [slug, setSlug] = useState(services[0].slug);
  const service = services.find((s) => s.slug === slug) ?? services[0];
  const href = buildWhatsAppUrl(service.enquiryPhrase);
  const dark = tone === 'dark';

  return (
    <div className={`rounded-2xl p-6 sm:p-7 ${dark ? 'on-navy bg-navy-deep text-white' : 'border border-line bg-white text-ink shadow-card'}`}>
      <label htmlFor={selectId} className="block font-display text-lg font-extrabold uppercase">
        Book your stringing
      </label>
      <p className={`mt-1 text-sm ${dark ? 'text-on-navy-muted' : 'text-ink-muted'}`}>Choose a service and send us a message.</p>
      <select
        id={selectId}
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        aria-describedby={previewId}
        className={`mt-4 min-h-12 w-full rounded-lg border px-3 text-base ${dark ? 'border-white/20 bg-navy-950 text-white' : 'border-line bg-paper text-ink'}`}
      >
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>{s.name}</option>
        ))}
      </select>

      <p id={previewId} className={`mt-4 rounded-lg p-3 text-sm leading-relaxed ${dark ? 'bg-white/5 text-on-navy-muted' : 'bg-card text-ink-muted'}`}>
        <span className={`font-semibold ${dark ? 'text-white' : 'text-ink'}`}>Message preview: </span>
        “{buildWhatsAppMessage(service.enquiryPhrase)}”
      </p>

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
          <MessageCircle aria-hidden="true" className="size-5" />
          Send on WhatsApp
          <span className="sr-only"> (opens WhatsApp in a new tab)</span>
        </a>
      ) : (
        <p role="note" className="mt-5 rounded-lg border border-dashed border-current p-3 text-sm">
          WhatsApp enquiries are not set up yet. Please call or visit the shop.
        </p>
      )}
      <p className={`mt-3 text-xs ${dark ? 'text-on-navy-muted' : 'text-ink-muted'}`}>
        This starts a WhatsApp chat. The shop replies to confirm price and availability.
      </p>
    </div>
  );
}
