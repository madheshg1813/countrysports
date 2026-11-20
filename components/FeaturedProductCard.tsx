'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Target } from 'lucide-react';
import { formatPrice, stringBrands } from '@/lib/business';
import { stringColors, stringRatings, type RacketString, type StringColor } from '@/lib/strings';
import StringVisual from './StringVisual';
import WhatsAppCTA from './WhatsAppCTA';

/** A featured string: clicking a colour swatch recolours the coil and carries the colour into Book and WhatsApp. */
export default function FeaturedProductCard({ s, summary, bestFor }: { s: RacketString; summary: string; bestFor: string }) {
  // A bright colour shows up best on the navy panel, so it is the starting choice.
  const [color, setColor] = useState<StringColor>(s.colors.find((c) => c !== 'White' && c !== 'Black') ?? s.colors[0]);
  const logo = stringBrands.find((b) => b.name === s.brand)?.logo;
  const ratings = stringRatings(s);
  const discount = s.price !== null && s.mrp !== null && s.mrp > s.price ? Math.round((1 - s.price / s.mrp) * 100) : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="on-navy bg-navy-hero relative flex aspect-[16/10] items-center justify-center overflow-hidden">
        <div aria-hidden="true" className="string-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
        <div className="relative flex aspect-square h-full items-center justify-center transition-transform duration-500 group-hover:scale-105 [&>svg]:h-[88%] [&>svg]:w-[88%]">
          <StringVisual s={s} color={color} sizes="(min-width: 1024px) 20vw, 60vw" />
        </div>
        <span className="absolute left-4 top-4 rounded bg-lime px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-navy-950">{s.style}</span>
        {discount > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-green-heading">{discount}% OFF</span>
        )}
        {logo && !logo.wordmark && (
          <span className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-lg bg-white p-1.5">
            <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="h-auto w-full" />
          </span>
        )}
        <span className="absolute bottom-4 right-4 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white backdrop-blur">{s.gauge.toFixed(2)} mm</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">{s.brand}</p>
        <h3 className="mt-1 font-display text-2xl font-extrabold uppercase italic tracking-tight text-navy-950">
          <Link href={`/strings/${s.slug}?color=${encodeURIComponent(color)}`} className="hover:text-green-heading">{s.name}</Link>
        </h3>
        <p className="mt-2 leading-relaxed text-ink-muted">{summary}</p>
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-green-heading/5 px-3 py-2 text-sm text-ink">
          <Target aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green-heading" />
          <span><span className="font-semibold">Best for:</span> {bestFor}</span>
        </p>

        <dl className="mt-5 space-y-2 text-sm">
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

        <div className="mt-5 flex flex-wrap items-center gap-2" role="radiogroup" aria-label={`${s.name} colour`}>
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
          <span className="ml-1 text-sm text-ink-muted">{color}</span>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-baseline gap-x-2 border-t border-line pt-5">
            {s.price !== null ? (
              <>
                <span className="font-display text-2xl font-extrabold text-ink">{formatPrice(s.price)}</span>
                {discount > 0 && s.mrp !== null && <span className="text-ink-muted line-through">{formatPrice(s.mrp)}</span>}
                <span className="text-sm text-ink-muted">+ labour</span>
              </>
            ) : (
              <span className="font-display text-lg font-extrabold text-ink">Price on enquiry</span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link href={`/contact?string=${s.slug}&color=${encodeURIComponent(color)}#book`} className="btn-primary min-h-11 px-3 py-2 text-sm">
              Book now<span className="sr-only"> with {s.brand} {s.name} in {color}</span>
            </Link>
            <WhatsAppCTA
              size="sm"
              variant="secondary-light"
              label="Ask us"
              srContext={`about ${s.brand} ${s.name} in ${color}`}
              enquiryPhrase={`restringing my racket with ${s.brand} ${s.name} (${color})`}
              className="px-3"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
