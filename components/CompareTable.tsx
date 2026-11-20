'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { formatPrice } from '@/lib/business';
import { findString, MAX_COMPARE, racketStrings, sports, stringColors, stringRatings, type RacketString } from '@/lib/strings';
import StringVisual from './StringVisual';

/** Ready-made comparisons shown when nothing is picked yet. */
const popular = [
  ['yonex-bg65', 'yonex-bg65-titanium', 'victor-vbs-70'],
  ['yonex-bg66-ultimax', 'yonex-bg80-power', 'victor-vbs-66n'],
].filter((set) => set.every((slug) => findString(slug)));

type Row = {
  label: string;
  /** Comparable value for "show differences" and the best-in-row mark. */
  value: (s: RacketString) => string | number | null;
  /** Which value counts as best: highest, lowest, or none. */
  best?: 'max' | 'min';
  render: (s: RacketString) => React.ReactNode;
};

function Dots({ n, label }: { n: number; label: string }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`${label}: ${n} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`h-2.5 w-5 rounded-full ${i <= n ? 'bg-green-heading' : 'bg-line'}`} />
      ))}
    </span>
  );
}

const rows: Row[] = [
  { label: 'Price', value: (s) => s.price, best: 'min', render: (s) => (s.price !== null ? formatPrice(s.price) : 'On enquiry') },
  { label: 'MRP', value: (s) => s.mrp, render: (s) => (s.mrp !== null ? formatPrice(s.mrp) : '–') },
  { label: 'Sport', value: (s) => s.sport, render: (s) => s.sport },
  { label: 'String type', value: (s) => s.style, render: (s) => s.style },
  { label: 'Gauge', value: (s) => s.gauge, render: (s) => `${s.gauge.toFixed(2)} mm` },
  { label: 'Power', value: (s) => stringRatings(s).power, best: 'max', render: (s) => <Dots n={stringRatings(s).power} label="Power" /> },
  { label: 'Control', value: (s) => stringRatings(s).control, best: 'max', render: (s) => <Dots n={stringRatings(s).control} label="Control" /> },
  { label: 'Durability', value: (s) => stringRatings(s).durability, best: 'max', render: (s) => <Dots n={stringRatings(s).durability} label="Durability" /> },
  {
    label: 'Colours',
    value: (s) => s.colors.join(','),
    render: (s) => (
      <span className="flex flex-wrap gap-1.5">
        {s.colors.map((c) => (
          <span key={c} title={c} className="size-5 rounded-full border border-ink/20" style={{ backgroundColor: stringColors[c] }}>
            <span className="sr-only">{c}</span>
          </span>
        ))}
      </span>
    ),
  },
];

/** Side-by-side comparison of up to MAX_COMPARE strings. The picked strings are kept in the URL (?ids=a,b) so it can be shared. */
export default function CompareTable({ initial }: { initial: string[] }) {
  const addId = useId();
  const [slugs, setSlugs] = useState(() => [...new Set(initial)].filter((s) => findString(s)).slice(0, MAX_COMPARE));
  const [onlyDiff, setOnlyDiff] = useState(false);
  const picked = slugs.map((s) => findString(s)!);

  useEffect(() => {
    window.history.replaceState(null, '', slugs.length ? `?ids=${slugs.join(',')}` : window.location.pathname);
  }, [slugs]);

  const add = (slug: string) => slug && setSlugs((l) => (l.includes(slug) || l.length >= MAX_COMPARE ? l : [...l, slug]));
  const remove = (slug: string) => setSlugs((l) => l.filter((s) => s !== slug));

  const shownRows = rows.filter((r) => !onlyDiff || new Set(picked.map(r.value)).size > 1);
  const bestOf = (r: Row) => {
    if (!r.best || picked.length < 2) return null;
    const vals = picked.map(r.value).filter((v): v is number => typeof v === 'number');
    if (vals.length < 2 || new Set(vals).size < 2) return null;
    return r.best === 'max' ? Math.max(...vals) : Math.min(...vals);
  };

  const picker = picked.length < MAX_COMPARE && (
    <div>
      <label htmlFor={addId} className="block text-sm font-semibold text-ink">
        {picked.length === 0 ? 'Pick a string to compare' : `Add a string (${picked.length} of ${MAX_COMPARE})`}
      </label>
      <div className="relative mt-1.5">
        <Plus aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
        <select id={addId} value="" onChange={(e) => add(e.target.value)} className="min-h-12 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-base sm:w-80">
          <option value="">Choose a string…</option>
          {sports.map((sp) => {
            const list = racketStrings.filter((s) => s.sport === sp && !slugs.includes(s.slug));
            return list.length > 0 && (
              <optgroup key={sp} label={sp}>
                {list.map((s) => <option key={s.slug} value={s.slug}>{s.brand} {s.name}</option>)}
              </optgroup>
            );
          })}
        </select>
      </div>
    </div>
  );

  if (picked.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-paper p-6 sm:p-10">
        {picker}
        <p className="mt-8 font-display text-sm font-extrabold uppercase text-navy-900">Popular comparisons</p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {popular.map((set) => (
            <li key={set.join()}>
              <button type="button" onClick={() => setSlugs(set)} className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
                {set.map((slug) => findString(slug)!.name).join(' vs ')}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          You can also tick <span className="font-semibold text-ink">Compare</span> on any string in the <Link href="/strings" className="font-semibold text-green-heading underline-offset-4 hover:underline">string shop</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        {picker || <p className="text-sm text-ink-muted">Comparing the maximum of {MAX_COMPARE} strings. Remove one to add another.</p>}
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
          <input type="checkbox" checked={onlyDiff} onChange={(e) => setOnlyDiff(e.target.checked)} className="size-5 accent-navy-900" />
          Show only differences
        </label>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          <caption className="sr-only">Comparison of {picked.map((s) => `${s.brand} ${s.name}`).join(', ')}</caption>
          <thead>
            <tr>
              <td className="sticky left-0 z-10 w-28 bg-white sm:w-40" />
              {picked.map((s) => (
                <th key={s.slug} scope="col" className="min-w-44 border-l border-line p-4 align-top font-normal normal-case">
                  <div className="flex justify-end">
                    <button type="button" onClick={() => remove(s.slug)} className="inline-flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-paper hover:text-ink">
                      <X aria-hidden="true" className="size-4" />
                      <span className="sr-only">Remove {s.brand} {s.name}</span>
                    </button>
                  </div>
                  <div className="relative mx-auto flex aspect-square w-28 items-center justify-center"><StringVisual s={s} color={s.colors[0]} sizes="112px" /></div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">{s.brand}</p>
                  <p className="font-display text-lg font-extrabold uppercase italic leading-tight text-navy-950">{s.name}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shownRows.map((r) => {
              const best = bestOf(r);
              return (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="sticky left-0 z-10 bg-paper p-4 font-display text-xs font-extrabold uppercase text-navy-900 sm:text-sm">{r.label}</th>
                  {picked.map((s) => {
                    const isBest = best !== null && r.value(s) === best;
                    return (
                      <td key={s.slug} className={`border-l border-line p-4 text-ink ${isBest ? 'bg-green-heading/5' : ''}`}>
                        <div className="flex flex-wrap items-center gap-2">
                          {r.render(s)}
                          {isBest && <span className="rounded bg-green-heading px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">{r.best === 'min' ? 'Lowest' : 'Best'}</span>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="border-t border-line">
              <td className="sticky left-0 z-10 bg-paper p-4" />
              {picked.map((s) => (
                <td key={s.slug} className="border-l border-line p-4">
                  <Link href={`/contact?string=${s.slug}#book`} className="btn-primary min-h-11 w-full px-4 py-2 text-sm">
                    Book<span className="sr-only"> {s.brand} {s.name}</span>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-ink-muted">
        Power, control and durability are our guide, worked out from each string&apos;s gauge and type, not manufacturer figures. Ask us how a string plays before you decide.
      </p>
    </div>
  );
}
