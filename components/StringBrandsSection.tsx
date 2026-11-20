import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice, stringBrands, type StringBrand } from '@/lib/business';
import { brandStrings, stringColors } from '@/lib/strings';
import { Accent, SectionHeading } from './Section';
import BrandLogo from './BrandLogo';
import PacketFan from './PacketFan';
import ShowcaseCarousel from './ShowcaseCarousel';

/** Up to this many brands sit in a still grid; more than that slide past in a carousel. */
const SHOWCASE_MAX = 3;

/**
 * Every card has room for this many string rows and one row of colour dots, so the cards line up
 * however many strings a brand has. A brand with more strings shows one row fewer plus a "+N more" row.
 */
const ROWS = 4;
const MAX_DOTS = 9;

/** Small type tag on each string chip. */
const styleTag = { Power: 'bg-red-50 text-red-700', Control: 'bg-sky-50 text-sky-800', Durability: 'bg-green-50 text-green-heading', 'All-round': 'bg-amber-50 text-amber-800' };

function BrandShowcase({ brand }: { brand: StringBrand }) {
  const { list, from, colors, photos } = brandStrings(brand.name);
  const shown = list.length > ROWS ? list.slice(0, ROWS - 1) : list;
  const more = list.length - shown.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative">
        {photos.length > 0 ? (
          <PacketFan photos={photos} className="h-56 sm:h-72" />
        ) : (
          // No packet photos yet: the brand logo on a white tile instead.
          <div className="on-navy bg-navy-hero flex h-56 items-center justify-center sm:h-72">
            <span className="rounded-2xl bg-white px-8 py-6 shadow-card [&_img]:h-16">
              <BrandLogo name={brand.name} logo={brand.logo} />
            </span>
          </div>
        )}
        <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          In stock now
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="[&_img]:h-11">
            <BrandLogo name={brand.name} logo={brand.logo} />
          </div>
          {from !== null && (
            <p className="text-right text-sm text-ink-muted">
              from <span className="font-display text-2xl font-extrabold text-ink">{formatPrice(from)}</span>
            </p>
          )}
        </div>

        <p className="mt-5 text-sm text-ink-muted">
          <span className="font-semibold text-ink">{list.length} {list.length === 1 ? 'string' : 'strings'}</span> in{' '}
          <span className="font-semibold text-ink">{colors.length} {colors.length === 1 ? 'colour' : 'colours'}</span>
        </p>
        <ul className="mt-2 flex h-6 items-center gap-1.5 overflow-hidden" aria-label={`${brand.name} colours in stock`}>
          {colors.slice(0, MAX_DOTS).map((c) => (
            <li key={c} title={c} className="size-6 shrink-0 rounded-full border border-ink/20 shadow-sm" style={{ backgroundColor: stringColors[c] }}>
              <span className="sr-only">{c}</span>
            </li>
          ))}
          {colors.length > MAX_DOTS && (
            <li className="pl-1 text-xs font-semibold text-ink-muted">
              +{colors.length - MAX_DOTS}<span className="sr-only"> more colours</span>
            </li>
          )}
        </ul>

        <ul className="mt-5 min-h-[calc(4*2.75rem+3px)] divide-y divide-line border-y border-line" aria-label={`${brand.name} strings`}>
          {shown.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/strings/${s.slug}`}
                className="flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-ink transition-colors hover:text-green-heading"
              >
                <span className="truncate">
                  {s.name}
                  {s.sport !== 'Badminton' && <span className="ml-1.5 font-normal text-ink-muted">· {s.sport}</span>}
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide ${styleTag[s.style]}`}>{s.style}</span>
              </Link>
            </li>
          ))}
          {more > 0 && (
            <li>
              <Link href={`/brands/${brand.slug}`} className="flex min-h-11 items-center gap-1.5 text-sm font-semibold text-green-heading hover:underline">
                +{more} more {brand.name} strings <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          )}
        </ul>

        <div className="mt-auto pt-6">
          <Link href={`/brands/${brand.slug}`} className="btn-primary min-h-11 w-full px-4 py-2 text-sm sm:w-auto">
            Shop {brand.name} strings <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** The string brands the shop stocks: showcase cards with real packet photos, sliding in a carousel when there are many. */
export default function StringBrandsSection() {
  if (stringBrands.length === 0) return null;
  const showcase = stringBrands.length <= SHOWCASE_MAX;
  const names = stringBrands.map((b) => b.name);
  const brandList = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0];

  return (
    <section aria-labelledby="brands-heading" className="py-14 sm:py-20">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="brands-heading"
            eyebrow="Popular String Brands"
            title={<>Premium String <Accent>Selection</Accent></>}
            intro={`The ${brandList} strings on our shelf, ready to string on your racket at the tension you choose.`}
          />
          <Link href="/strings" className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
            View all strings <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        {showcase ? (
          <ul className={`mt-8 grid gap-6 ${stringBrands.length > 1 ? 'md:grid-cols-2' : ''} ${stringBrands.length > 2 ? 'xl:grid-cols-3' : ''}`}>
            {stringBrands.map((b) => <li key={b.slug}><BrandShowcase brand={b} /></li>)}
          </ul>
        ) : (
          <div className="mt-8">
            <ShowcaseCarousel label="String brands" cards={stringBrands.map((b) => <BrandShowcase key={b.slug} brand={b} />)} />
          </div>
        )}
      </div>
    </section>
  );
}
