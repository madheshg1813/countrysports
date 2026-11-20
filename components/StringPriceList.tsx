'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatPrice } from '@/lib/business';
import { racketStrings, sports, type Sport } from '@/lib/strings';

const sportOptions = sports.filter((sp) => racketStrings.some((s) => s.sport === sp));

/** Every string's price, filterable by sport and brand, cheapest first within each brand. */
export default function StringPriceList() {
  const [sport, setSport] = useState<Sport>(sportOptions[0]);
  const [brand, setBrand] = useState<string | null>(null);

  const forSport = racketStrings.filter((s) => s.sport === sport);
  const brands = [...new Set(forSport.map((s) => s.brand))].sort();
  const rows = forSport
    .filter((s) => !brand || s.brand === brand)
    .sort((a, b) => a.brand.localeCompare(b.brand) || (a.price ?? Infinity) - (b.price ?? Infinity));

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${active ? 'border-navy-900 bg-navy-900 text-white' : 'border-line bg-white text-ink hover:border-navy-700'}`;

  return (
    <div>
      {sportOptions.length > 1 && (
        <div role="tablist" aria-label="Sport" className="inline-flex rounded-xl bg-card p-1">
          {sportOptions.map((sp) => (
            <button
              key={sp}
              type="button"
              role="tab"
              aria-selected={sp === sport}
              onClick={() => { setSport(sp); setBrand(null); }}
              className={`min-h-11 rounded-lg px-4 text-sm font-bold ${sp === sport ? 'bg-white text-navy-900 shadow-card' : 'text-ink-muted hover:text-ink'}`}
            >
              {sp}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Filter by brand">
        <li><button type="button" aria-pressed={brand === null} onClick={() => setBrand(null)} className={chip(brand === null)}>All brands</button></li>
        {brands.map((b) => (
          <li key={b}><button type="button" aria-pressed={brand === b} onClick={() => setBrand(b)} className={chip(brand === b)}>{b}</button></li>
        ))}
      </ul>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full text-left">
          <caption className="sr-only">{sport} string prices{brand ? `, ${brand}` : ''}</caption>
          <thead className="bg-paper text-xs font-extrabold uppercase text-navy-900">
            <tr>
              <th scope="col" className="p-4 font-display">String</th>
              <th scope="col" className="hidden p-4 font-display sm:table-cell">Type</th>
              <th scope="col" className="hidden p-4 font-display md:table-cell">Gauge</th>
              <th scope="col" className="p-4 text-right font-display">Price</th>
              <th scope="col" className="hidden p-4 font-display sm:table-cell"><span className="sr-only">Book</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.slug} className="border-t border-line">
                <th scope="row" className="p-4 font-normal">
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{s.brand}</span>
                  <Link href={`/strings/${s.slug}`} className="font-semibold text-ink underline-offset-4 hover:underline">{s.name}</Link>
                  <span className="block text-xs text-ink-muted sm:hidden">{s.style} · {s.gauge.toFixed(2)} mm</span>
                </th>
                <td className="hidden p-4 text-ink sm:table-cell">{s.style}</td>
                <td className="hidden p-4 text-ink md:table-cell">{s.gauge.toFixed(2)} mm</td>
                <td className="p-4 text-right">
                  {s.price !== null ? (
                    <>
                      <span className="font-display font-extrabold text-navy-900">{formatPrice(s.price)}</span>
                      {s.mrp !== null && s.mrp > s.price && <span className="block text-xs text-ink-muted line-through">{formatPrice(s.mrp)}</span>}
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-ink">On enquiry</span>
                  )}
                </td>
                <td className="hidden p-4 text-right sm:table-cell">
                  <Link href={`/contact?string=${s.slug}#book`} className="btn-secondary-light min-h-10 px-3 py-1.5 text-sm">
                    Book<span className="sr-only"> {s.brand} {s.name}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
