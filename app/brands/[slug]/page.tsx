import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Clock } from 'lucide-react';
import BrandGrid from '@/components/BrandGrid';
import BrandLogo from '@/components/BrandLogo';
import CTABand from '@/components/CTABand';
import FeaturedProducts from '@/components/FeaturedProducts';
import PacketFan from '@/components/PacketFan';
import { Accent, Eyebrow, SectionHeading } from '@/components/Section';
import { PriceTag } from '@/components/ServiceCard';
import StringCoil from '@/components/StringCoil';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { business, formatPrice, services, stringBrands } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';
import { brandStrings, stringColors, stringRatings, styleBestFor, type RacketString } from '@/lib/strings';

/** Stringing services listed on every brand page, in this order. */
const stringingSlugs = ['standard-stringing', 'high-tension-stringing', 'express-stringing'];
const stringingServices = stringingSlugs.flatMap((slug) => services.filter((s) => s.slug === slug));

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return stringBrands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = stringBrands.find((b) => b.slug === slug);
  if (!brand) return {};
  const path = `/brands/${brand.slug}`;
  const { list, from } = brandStrings(brand.name);
  const priceText = list.length ? `${list.length} ${brand.name} strings${from !== null ? ` from ${formatPrice(from)}` : ''}.` : 'Strings charged separately.';
  return {
    title: `${brand.name} Badminton Strings & Restringing`,
    description: `Badminton racket restringing with ${brand.name} strings at ${business.name}, Velachery, Chennai. ${priceText} See every colour in stock and book on WhatsApp.`,
    alternates: canonical(path),
    openGraph: openGraph(path, `${brand.name} Strings | ${business.name}`),
  };
}

function RatingDots({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="w-16 text-xs text-ink-muted">{label}</span>
      <span className="flex gap-0.5" role="img" aria-label={`${label}: ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`h-1.5 w-3 rounded-full ${i <= value ? 'bg-green-heading' : 'bg-line'}`} />)}
      </span>
    </span>
  );
}

/** Small packet photo for a string (first colour), or the drawn coil. */
function Thumb({ s, className = '' }: { s: RacketString; className?: string }) {
  const src = s.photos?.[s.colors[0]];
  return (
    <span className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white ${className}`}>
      {src ? <Image src={src} alt="" fill sizes="96px" className="object-contain p-1" /> : <StringCoil color={stringColors[s.colors[0]]} />}
    </span>
  );
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = stringBrands.find((b) => b.slug === slug);
  if (!brand) notFound();

  const { list, from, colors, photos } = brandStrings(brand.name);
  const otherBrands = stringBrands.filter((b) => b.slug !== brand.slug);

  return (
    <>
      <section className="on-navy bg-navy-hero relative overflow-hidden text-white">
        <div className="container-site relative grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <Link href="/brands" className="inline-flex items-center gap-1.5 text-sm font-semibold text-on-navy-muted hover:text-white">
              <ArrowLeft aria-hidden="true" className="size-4" /> All brands
            </Link>
            <div className="mt-6 flex w-fit rounded-2xl bg-white px-5 py-3 [&_img]:h-10">
              <BrandLogo name={brand.name} logo={brand.logo} />
            </div>
            <Eyebrow tone="dark" className="mt-6">String Brands</Eyebrow>
            <h1 className="text-hero mt-3">{brand.name} <span className="text-green-deep">strings</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-navy-muted">
              {brand.about ?? `The ${brand.name} strings on our shelf in Velachery. Pick one below, or tell us how you play and we will suggest one.`}
            </p>
            {list.length > 0 && (
              <dl className="mt-8 grid max-w-md grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/15 bg-white/5">
                {[
                  ['Strings', String(list.length)],
                  ['Colours', String(colors.length)],
                  ['From', from !== null ? formatPrice(from) : 'Ask'],
                ].map(([k, v]) => (
                  <div key={k} className="px-4 py-3">
                    <dt className="text-xs uppercase tracking-widest text-on-navy-muted">{k}</dt>
                    <dd className="mt-1 font-display text-2xl font-extrabold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {list.length > 0 && <a href="#choose" className="btn-primary">Choose a string</a>}
              <WhatsAppCTA variant="secondary-dark" label={`Ask about ${brand.name}`} enquiryPhrase={`restringing my racket with ${brand.name} strings`} />
            </div>
          </div>
          {photos.length > 0 && <PacketFan photos={photos} priority className="group h-64 rounded-3xl border border-white/10 sm:h-80" />}
        </div>
      </section>

      {list.length > 0 ? (
        <>
          <section id="choose" aria-labelledby="choose-heading" className="scroll-mt-20 py-16 sm:py-20">
            <div className="container-site">
              <SectionHeading
                id="choose-heading"
                eyebrow={`${list.length} ${list.length === 1 ? 'string' : 'strings'} · cheapest first`}
                title={<>Which {brand.name} string is <Accent>right for me?</Accent></>}
                intro="Ratings are our rough guide from gauge and type, not maker figures. Prices are for the string; stringing labour is extra."
              />
              <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                {list.map((s) => {
                  const r = stringRatings(s);
                  return (
                    <li key={s.slug} className="grid items-center gap-5 p-5 sm:p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.9fr)_auto]">
                      <div className="flex items-center gap-4">
                        <Thumb s={s} className="size-20 sm:size-24" />
                        <div className="min-w-0">
                          <h3 className="font-display text-xl font-extrabold uppercase italic text-navy-950">
                            <Link href={`/strings/${s.slug}`} className="hover:text-green-heading">{s.name}</Link>
                          </h3>
                          <p className="mt-0.5 text-sm text-ink-muted">{s.style} · {s.gauge.toFixed(2)} mm</p>
                          <p className="mt-1 text-sm text-ink"><span className="font-semibold">Best for:</span> {styleBestFor[s.style]}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <RatingDots label="Power" value={r.power} />
                        <RatingDots label="Control" value={r.control} />
                        <RatingDots label="Durability" value={r.durability} />
                      </div>
                      <ul className="hidden flex-wrap gap-1.5 lg:flex" aria-label={`${s.name} colours`}>
                        {s.colors.map((c) => (
                          <li key={c} title={c} className="size-6 rounded-full border border-ink/20" style={{ backgroundColor: stringColors[c] }}>
                            <span className="sr-only">{c}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                        <p className="font-display text-2xl font-extrabold text-ink">{s.price !== null ? formatPrice(s.price) : 'Ask'}</p>
                        <Link href={`/strings/${s.slug}`} className="btn-secondary-light min-h-10 px-4 py-1.5 text-sm">
                          View &amp; book<span className="sr-only"> {s.name}</span>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {photos.length > 0 && (
            <section aria-labelledby="colours-heading" className="bg-paper py-16 sm:py-20">
              <div className="container-site">
                <SectionHeading
                  id="colours-heading"
                  eyebrow={`${photos.length} packets in stock`}
                  title={<>Pick by <Accent>colour</Accent></>}
                  intro="Every colour we have, photographed in the shop. Tap one to see it and book."
                />
                <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {photos.map((p) => {
                    const s = list.find((x) => x.slug === p.slug)!;
                    return (
                      <li key={p.src}>
                        <Link
                          href={`/strings/${p.slug}?color=${encodeURIComponent(p.color)}`}
                          className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                        >
                          <span className="relative block aspect-square">
                            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                          </span>
                          <span className="flex items-center gap-2 border-t border-line px-3 py-2.5">
                            <span aria-hidden="true" className="size-4 shrink-0 rounded-full border border-ink/20" style={{ backgroundColor: stringColors[p.color] }} />
                            <span className="min-w-0 text-sm">
                              <span className="block truncate font-semibold text-ink">{s.name}</span>
                              <span className="block text-ink-muted">{p.color}</span>
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          )}
        </>
      ) : (
        <FeaturedProducts
          brand={brand.name}
          title={<>Popular <Accent>{brand.name}</Accent> strings</>}
          intro={`${brand.name} strings we stock. Ask us which one suits your game.`}
        />
      )}

      <section aria-labelledby="brand-stringing-heading" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            id="brand-stringing-heading"
            eyebrow={`Restringing with ${brand.name}`}
            title={<>String price <Accent>+ labour</Accent></>}
            intro={`Your total is the ${brand.name} string you pick plus the stringing labour below.`}
          />
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
            <ul className="divide-y divide-line rounded-2xl border border-line bg-white shadow-card lg:col-span-8">
              {stringingServices.map((s) => (
                <li key={s.slug} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold normal-case tracking-normal text-navy-900">{s.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
                    {s.turnaround && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-ink">
                        <Clock aria-hidden="true" className="size-4 text-green-heading" /> {s.turnaround}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <PriceTag service={s} />
                  </div>
                </li>
              ))}
            </ul>
            <ul className="grid gap-3 rounded-2xl border border-line bg-paper p-6 text-ink lg:col-span-4">
              {['Clear, listed string prices', 'Strung at the tension you ask for', 'Advice on string and tension', 'Price and ready time confirmed first'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green-heading" /> {item}
                </li>
              ))}
              <li className="pt-2">
                <Link href="/tension-guide" className="font-semibold text-green-heading hover:underline">Not sure of your tension? Read the guide →</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {otherBrands.length > 0 && (
        <section aria-labelledby="other-brands-heading" className="bg-paper py-16 sm:py-20">
          <div className="container-site">
            <SectionHeading id="other-brands-heading" eyebrow="More Brands" title={<>Other string <Accent>brands</Accent></>} />
            <BrandGrid brands={otherBrands} />
          </div>
        </section>
      )}

      <CTABand
        title={<>Want {brand.name} <span className="text-green-deep">strings?</span></>}
        text={`Send us your racket, the ${brand.name} string and colour you want, and your tension. We will reply with the price and when it will be ready.`}
      />
    </>
  );
}
