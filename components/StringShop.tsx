'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Check, SlidersHorizontal, X } from 'lucide-react';
import { formatPrice } from '@/lib/business';
import {
  filterKeys, MAX_COMPARE, playStyles, racketStrings, sports, stringColors,
  type RacketString, type StringColor, type StringFilters,
} from '@/lib/strings';
import StringVisual from './StringVisual';

type Facet = keyof StringFilters;

const brands = [...new Set(racketStrings.map((s) => s.brand))].sort();
const colors = (Object.keys(stringColors) as StringColor[]).filter((c) => racketStrings.some((s) => s.colors.includes(c)));
const sportOptions = sports.filter((sp) => racketStrings.some((s) => s.sport === sp));

/** An empty facet matches everything; within a facet any ticked option matches. */
function matches(s: RacketString, f: StringFilters, skip?: Facet) {
  return (
    (skip === 'sport' || f.sport.length === 0 || f.sport.includes(s.sport)) &&
    (skip === 'style' || f.style.length === 0 || f.style.includes(s.style)) &&
    (skip === 'color' || f.color.length === 0 || s.colors.some((c) => f.color.includes(c))) &&
    (skip === 'brand' || f.brand.length === 0 || f.brand.includes(s.brand))
  );
}

type SortKey = keyof typeof sortLabels;
const sortLabels = { featured: 'Featured', 'price-asc': 'Price: low to high', 'price-desc': 'Price: high to low', name: 'Name' };

/** "Featured" keeps the catalogue order; strings without a price go last when sorting by price. */
function sortStrings(list: RacketString[], sort: SortKey) {
  const byName = (a: RacketString, b: RacketString) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`);
  if (sort === 'name') return [...list].sort(byName);
  if (sort === 'featured') return list;
  const dir = sort === 'price-asc' ? 1 : -1;
  return [...list].sort((a, b) => {
    if (a.price === null || b.price === null) return a.price === b.price ? 0 : a.price === null ? 1 : -1;
    return (a.price - b.price) * dir;
  });
}

/** Filterable string catalogue. Filters are mirrored into the URL so a filtered view can be shared. */
export default function StringShop({ initial }: { initial: StringFilters }) {
  const [filters, setFilters] = useState<StringFilters>(initial);
  const [panelOpen, setPanelOpen] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const toggleCompare = (slug: string) =>
    setCompare((l) => (l.includes(slug) ? l.filter((x) => x !== slug) : l.length >= MAX_COMPARE ? l : [...l, slug]));

  useEffect(() => {
    const params = new URLSearchParams();
    for (const key of filterKeys) if (filters[key].length) params.set(key, filters[key].join(','));
    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  }, [filters]);

  const [sort, setSort] = useState<SortKey>('featured');
  const results = useMemo(() => sortStrings(racketStrings.filter((s) => matches(s, filters)), sort), [filters, sort]);
  const activeCount = filterKeys.reduce((n, k) => n + filters[k].length, 0);

  const toggle = (facet: Facet, value: string) =>
    setFilters((f) => ({
      ...f,
      [facet]: f[facet].includes(value) ? f[facet].filter((v) => v !== value) : [...f[facet], value],
    }));
  const clear = () => setFilters({ sport: [], style: [], color: [], brand: [] });

  /** How many strings an option would show, given the other facets' choices. */
  const countFor = (facet: Facet, value: string) =>
    racketStrings.filter((s) => matches(s, filters, facet) && matches(s, { sport: [], style: [], color: [], brand: [], [facet]: [value] })).length;

  const groups: { facet: Facet; title: string; options: string[] }[] = [
    { facet: 'sport', title: 'Category', options: sportOptions },
    { facet: 'style', title: 'String type', options: playStyles },
    { facet: 'color', title: 'Colour', options: colors },
    { facet: 'brand', title: 'Brand', options: brands },
  ];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          className="btn-secondary-light min-h-11 px-4 py-2 text-sm"
          aria-expanded={panelOpen}
          aria-controls="string-filters"
          onClick={() => setPanelOpen((o) => !o)}
        >
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Filters{activeCount > 0 && ` (${activeCount})`}
        </button>
        <p className="text-sm text-ink-muted" aria-live="polite">{results.length} strings</p>
      </div>

      <aside id="string-filters" aria-label="Filter strings" className={`${panelOpen ? 'block' : 'hidden'} lg:sticky lg:top-24 lg:block`}>
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-extrabold uppercase text-navy-900">Filters</p>
          {activeCount > 0 && (
            <button type="button" onClick={clear} className="min-h-11 text-sm font-semibold text-green-heading hover:underline">
              Clear all
            </button>
          )}
        </div>
        {groups.map((g) => (
          <fieldset key={g.facet} className="border-b border-line py-5 last:border-b-0">
            <legend className="mb-3 font-display text-sm font-extrabold uppercase text-navy-900">{g.title}</legend>
            <ul className="space-y-1">
              {g.options.map((opt) => {
                const checked = filters[g.facet].includes(opt);
                const count = countFor(g.facet, opt);
                return (
                  <li key={opt}>
                    <label className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-md px-1 text-ink hover:bg-paper ${count === 0 && !checked ? 'opacity-50' : ''}`}>
                      <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(g.facet, opt)} />
                      <span
                        aria-hidden="true"
                        className="flex size-5 shrink-0 items-center justify-center rounded border-2 border-navy-900 bg-white peer-checked:bg-navy-900 peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-navy-700"
                      >
                        {checked && <Check className="size-3.5 text-white" strokeWidth={3} />}
                      </span>
                      {g.facet === 'color' && (
                        <span
                          aria-hidden="true"
                          className="size-5 shrink-0 rounded-full border border-ink/20"
                          style={{ backgroundColor: stringColors[opt as StringColor] }}
                        />
                      )}
                      <span className="flex-1">{opt}</span>
                      <span className="text-xs text-ink-muted">{count}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </aside>

      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="hidden text-ink-muted lg:block" aria-live="polite">
            Showing <span className="font-semibold text-ink">{results.length}</span> of {racketStrings.length} strings
          </p>
          <label className="ml-auto flex items-center gap-2 text-sm font-semibold text-ink">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="min-h-11 rounded-lg border border-line bg-white px-3 font-normal">
              {(Object.keys(sortLabels) as SortKey[]).map((k) => <option key={k} value={k}>{sortLabels[k]}</option>)}
            </select>
          </label>
        </div>

        {activeCount > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
            {filterKeys.flatMap((k) =>
              filters[k].map((v) => (
                <li key={k + v}>
                  <button
                    type="button"
                    onClick={() => toggle(k, v)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-paper px-3 text-sm font-medium text-ink hover:border-navy-700"
                  >
                    {v} <X aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">(remove filter)</span>
                  </button>
                </li>
              )),
            )}
          </ul>
        )}

        {results.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-line bg-paper p-10 text-center">
            <p className="font-display text-lg font-extrabold uppercase text-navy-900">No strings match</p>
            <p className="mt-2 text-ink-muted">Try removing a filter, or ask us. We may be able to get it in.</p>
            <button type="button" onClick={clear} className="btn-secondary-light mt-5 min-h-11 px-4 py-2 text-sm">Clear filters</button>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 xl:grid-cols-3">
            {results.map((s) => (
              <li key={s.slug}>
                <StringCard
                  s={s}
                  highlight={filters.color.find((c) => s.colors.includes(c as StringColor)) as StringColor | undefined}
                  compared={compare.includes(s.slug)}
                  compareFull={compare.length >= MAX_COMPARE}
                  onCompare={() => toggleCompare(s.slug)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {compare.length > 0 && (
        // Leaves room on phones for the floating WhatsApp button at the bottom-right.
        <div className="fixed inset-x-4 bottom-5 z-40 mr-16 flex items-center justify-between gap-3 rounded-2xl bg-navy-950 p-3 pl-5 text-white shadow-[0_12px_32px_-8px_rgba(6,23,43,0.6)] sm:mr-20 md:inset-x-auto md:left-1/2 md:mr-0 md:w-[32rem] md:-translate-x-1/2">
          <p className="text-sm">
            <span className="font-bold">{compare.length}</span> of {MAX_COMPARE} picked
            {compare.length < 2 && <span className="hidden text-on-navy-muted sm:inline"> · pick one more</span>}
          </p>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setCompare([])} className="min-h-11 rounded-lg px-3 text-sm font-semibold text-on-navy-muted hover:text-white">
              Clear
            </button>
            <Link href={`/strings/compare?ids=${compare.join(',')}`} className="btn-primary min-h-11 px-4 py-2 text-sm">
              Compare
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/** One string: colour swatches, price and booking. The Compare tick box shows only when `onCompare` is given. */
export function StringCard({ s, highlight, compared = false, compareFull = false, onCompare }: {
  s: RacketString;
  highlight?: StringColor;
  compared?: boolean;
  compareFull?: boolean;
  onCompare?: () => void;
}) {
  // A swatch the shopper clicks wins until the colour filter changes again.
  const [picked, setPicked] = useState<{ color: StringColor; under?: StringColor } | null>(null);
  const color = picked && picked.under === highlight ? picked.color : highlight ?? s.colors[0];
  const setColor = (c: StringColor) => setPicked({ color: c, under: highlight });

  const title = `${s.brand} ${s.name} ${s.sport} String (${s.gauge.toFixed(2)} mm)`;
  const discount = s.price !== null && s.mrp !== null && s.mrp > s.price ? Math.round((1 - s.price / s.mrp) * 100) : 0;

  return (
    <article className="group flex h-full flex-col">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-line bg-white transition-shadow duration-300 group-hover:shadow-card-hover">
        <span className="absolute left-3 top-3 z-10 rounded bg-navy-950 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white">{s.style}</span>
        <StringVisual s={s} color={color} sizes="(min-width: 1280px) 22vw, (min-width: 480px) 45vw, 90vw" />
        <span className="absolute bottom-3 right-3 z-10 font-display text-xs font-extrabold uppercase italic text-navy-950/70">{s.brand}</span>
      </div>

      <h3 className="mt-4 line-clamp-2 font-sans text-lg font-medium normal-case leading-snug tracking-normal text-ink" title={title}>
        <Link href={`/strings/${s.slug}?color=${encodeURIComponent(color)}`} className="hover:text-green-heading hover:underline">{title}</Link>
      </h3>

      <p className="mt-2 flex flex-wrap items-baseline gap-x-2 font-semibold">
        {s.price !== null ? (
          <>
            <span className="text-lg text-ink">{formatPrice(s.price)}</span>
            {discount > 0 && s.mrp !== null && (
              <>
                <span className="text-ink-muted line-through">{formatPrice(s.mrp)}</span>
                <span className="text-green-heading">({discount}% OFF)</span>
              </>
            )}
          </>
        ) : (
          <span className="text-ink">Price on enquiry</span>
        )}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2" role="radiogroup" aria-label={`${s.name} colour`}>
        {s.colors.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={c === color}
            title={c}
            onClick={() => setColor(c)}
            className={`size-7 rounded-full border border-ink/20 ring-offset-2 transition ${c === color ? 'ring-2 ring-navy-900' : 'hover:ring-2 hover:ring-line'}`}
            style={{ backgroundColor: stringColors[c] }}
          >
            <span className="sr-only">{c}</span>
          </button>
        ))}
        <span className="text-sm text-ink-muted">{color}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        <Link href={`/contact?string=${s.slug}&color=${encodeURIComponent(color)}#book`} className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
          Book this string<span className="sr-only"> ({s.brand} {s.name} in {color})</span>
        </Link>
        {onCompare && <label className={`flex min-h-11 items-center gap-2 text-sm font-semibold ${compareFull && !compared ? 'cursor-not-allowed text-ink-muted' : 'cursor-pointer text-ink'}`}>
          <input
            type="checkbox"
            checked={compared}
            disabled={compareFull && !compared}
            onChange={onCompare}
            className="size-4 accent-navy-900"
          />
          Compare<span className="sr-only"> {s.brand} {s.name}</span>
        </label>}
      </div>
    </article>
  );
}
