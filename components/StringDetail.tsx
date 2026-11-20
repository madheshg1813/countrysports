'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { formatPrice } from '@/lib/business';
import { stringColors, stringRatings, type RacketString, type StringColor } from '@/lib/strings';
import StringVisual from './StringVisual';
import WhatsAppCTA from './WhatsAppCTA';

/** Top of a string's own page: big packet photo, colour picker, price and booking. */
export default function StringDetail({ s, initialColor }: { s: RacketString; initialColor?: StringColor }) {
  const [color, setColor] = useState<StringColor>(initialColor && s.colors.includes(initialColor) ? initialColor : s.colors[0]);
  const ratings = stringRatings(s);
  const discount = s.price !== null && s.mrp !== null && s.mrp > s.price ? Math.round((1 - s.price / s.mrp) * 100) : 0;
  const pickColor = (c: StringColor) => {
    setColor(c);
    window.history.replaceState(null, '', `?color=${encodeURIComponent(c)}`);
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <span className="absolute left-4 top-4 z-10 rounded bg-navy-950 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">{s.style}</span>
          {discount > 0 && (
            <span className="absolute right-4 top-4 z-10 rounded-full bg-green-heading px-2.5 py-1 text-xs font-extrabold text-white">{discount}% OFF</span>
          )}
          <StringVisual s={s} color={color} sizes="(min-width: 1024px) 45vw, 90vw" priority />
        </div>
        {s.colors.length > 1 && (
          <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6" aria-label="Colours">
            {s.colors.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => pickColor(c)}
                  aria-pressed={c === color}
                  className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border bg-white transition ${c === color ? 'border-navy-900 ring-2 ring-navy-900' : 'border-line hover:border-navy-700'}`}
                >
                  <StringVisual s={s} color={c} sizes="96px" />
                  <span className="sr-only">{c}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink-muted">{s.brand} · {s.sport}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase italic tracking-tight text-navy-950 sm:text-5xl">{s.name}</h1>
        {s.tagline && <p className="mt-3 text-lg text-ink-muted">{s.tagline}</p>}

        <p className="mt-6 flex flex-wrap items-baseline gap-x-3 font-semibold">
          {s.price !== null ? (
            <>
              <span className="font-display text-3xl font-extrabold text-ink">{formatPrice(s.price)}</span>
              {discount > 0 && s.mrp !== null && <span className="text-lg text-ink-muted line-through">{formatPrice(s.mrp)}</span>}
              <span className="text-sm font-normal text-ink-muted">string only, + stringing labour</span>
            </>
          ) : (
            <span className="font-display text-2xl font-extrabold text-ink">Price on enquiry</span>
          )}
        </p>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">Colour: <span className="font-normal text-ink-muted">{color}</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.colors.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === color}
                title={c}
                onClick={() => pickColor(c)}
                className={`size-9 rounded-full border border-ink/20 ring-offset-2 transition ${c === color ? 'ring-2 ring-navy-900' : 'hover:ring-2 hover:ring-line'}`}
                style={{ backgroundColor: stringColors[c] }}
              >
                <span className="sr-only">{c}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contact?string=${s.slug}&color=${encodeURIComponent(color)}#book`} className="btn-primary">
            Book this string<span className="sr-only"> in {color}</span>
          </Link>
          <WhatsAppCTA
            variant="secondary-light"
            label="Ask on WhatsApp"
            srContext={`about ${s.brand} ${s.name} in ${color}`}
            enquiryPhrase={`restringing my racket with ${s.brand} ${s.name} (${color})`}
          />
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Not sure what tension? <Link href="/tension-guide" className="font-semibold text-green-heading hover:underline">Read our tension guide</Link>
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line text-sm sm:grid-cols-4">
          {[
            ['Gauge', `${s.gauge.toFixed(2)} mm`],
            ['Type', s.style],
            ['Length', '10 m set'],
            ['Colours', String(s.colors.length)],
          ].map(([k, v]) => (
            <div key={k} className="bg-white p-4">
              <dt className="text-ink-muted">{k}</dt>
              <dd className="mt-1 font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <dl className="mt-6 space-y-2 text-sm">
          {(['power', 'control', 'durability'] as const).map((k) => (
            <div key={k} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
              <dt className="capitalize text-ink-muted">{k}</dt>
              <dd className="flex gap-1" role="img" aria-label={`${k}: ${ratings[k]} out of 5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`h-2 flex-1 rounded-full ${i <= ratings[k] ? 'bg-green-heading' : 'bg-line'}`} />
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs text-ink-muted">Our rough guide from gauge and type, not maker figures.</p>

        <ul className="mt-8 grid gap-3 text-ink sm:grid-cols-2">
          {['Clear, listed string prices', 'Strung at the tension you ask for', 'Advice on string and tension', 'Price and ready time confirmed first'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green-heading" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
