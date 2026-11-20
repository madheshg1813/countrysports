'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { Calculator } from 'lucide-react';
import { formatPrice, services } from '@/lib/business';
import { racketStrings, sports } from '@/lib/strings';

const priced = services.filter((s) => s.price !== null);
const counts = [1, 2, 3, 4, 5];

/** Labour + string, times the number of rackets. Only services and strings with a listed price are offered. */
export default function CostEstimator() {
  const id = useId();
  const strings = racketStrings.filter((s) => s.price !== null);
  const [serviceSlug, setServiceSlug] = useState(priced[0]?.slug ?? '');
  const [stringSlug, setStringSlug] = useState(strings[0]?.slug ?? '');
  const [count, setCount] = useState(1);

  const service = priced.find((s) => s.slug === serviceSlug);
  const string = strings.find((s) => s.slug === stringSlug);
  if (!service || !string) return null;

  const labour = service.price!;
  const stringPrice = string.price!;
  const each = labour + stringPrice;
  const total = each * count;
  const saving = string.mrp !== null && string.mrp > stringPrice ? (string.mrp - stringPrice) * count : 0;

  const field = 'mt-1.5 min-h-12 w-full rounded-lg border border-line bg-white px-3 text-base text-ink';
  const label = 'block text-sm font-semibold text-ink';

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-service`} className={label}>Service</label>
          <select id={`${id}-service`} value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)} className={field}>
            {priced.map((s) => <option key={s.slug} value={s.slug}>{s.name} ({formatPrice(s.price!)})</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-string`} className={label}>String</label>
          <select id={`${id}-string`} value={stringSlug} onChange={(e) => setStringSlug(e.target.value)} className={field}>
            {sports.map((sp) => {
              const list = strings.filter((s) => s.sport === sp);
              return list.length > 0 && (
                <optgroup key={sp} label={sp}>
                  {list.map((s) => <option key={s.slug} value={s.slug}>{s.brand} {s.name} ({formatPrice(s.price!)})</option>)}
                </optgroup>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-count`} className={label}>Rackets</label>
          <select id={`${id}-count`} value={count} onChange={(e) => setCount(Number(e.target.value))} className={field}>
            {counts.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <p className="text-sm text-ink-muted sm:col-span-2">
          An estimate from our listed prices. We confirm the exact total on WhatsApp before any work starts.
        </p>
      </div>

      <div className="on-navy bg-navy-hero p-6 text-white sm:p-8" aria-live="polite">
        <p className="eyebrow flex items-center gap-2 text-green-deep"><Calculator aria-hidden="true" className="size-4" /> Your estimate</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-on-navy-muted">Labour</dt><dd>{formatPrice(labour)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-on-navy-muted">{string.brand} {string.name}</dt><dd>{formatPrice(stringPrice)}</dd></div>
          {count > 1 && <div className="flex justify-between gap-4"><dt className="text-on-navy-muted">Per racket × {count}</dt><dd>{formatPrice(each)} × {count}</dd></div>}
        </dl>
        <p className="mt-4 border-t border-white/15 pt-4 font-display text-4xl font-extrabold">{formatPrice(total)}</p>
        {saving > 0 && <p className="mt-1 text-sm text-lime">You save {formatPrice(saving)} on the string MRP</p>}
        <Link href={`/contact?service=${service.slug}&string=${string.slug}#book`} className="btn-primary mt-6 w-full">
          Book this
        </Link>
      </div>
    </div>
  );
}
