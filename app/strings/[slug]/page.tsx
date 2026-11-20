import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import CTABand from '@/components/CTABand';
import { Accent, SectionHeading } from '@/components/Section';
import StringDetail from '@/components/StringDetail';
import { StringCard } from '@/components/StringShop';
import { business, formatPrice, stringBrands } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';
import { findString, racketStrings, type StringColor } from '@/lib/strings';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return racketStrings.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = findString((await params).slug);
  if (!s) return {};
  const path = `/strings/${s.slug}`;
  const price = s.price !== null ? ` ${formatPrice(s.price)}.` : '';
  const photo = s.photos?.[s.colors[0]];
  return {
    title: `${s.brand} ${s.name} ${s.sport} String (${s.gauge.toFixed(2)} mm)`,
    description: `${s.brand} ${s.name}, ${s.gauge.toFixed(2)} mm ${s.style.toLowerCase()} ${s.sport.toLowerCase()} string in ${s.colors.join(', ')}.${price} Strung at your tension at ${business.name}, Velachery, Chennai.`,
    alternates: canonical(path),
    openGraph: openGraph(path, `${s.brand} ${s.name} | ${business.name}`, photo),
  };
}

export default async function StringPage({ params, searchParams }: Props) {
  const s = findString((await params).slug);
  if (!s) notFound();
  const color = (await searchParams).color;
  const brand = stringBrands.find((b) => b.name === s.brand);
  // Same brand first, then other strings of the same type.
  const related = [
    ...racketStrings.filter((x) => x.slug !== s.slug && x.brand === s.brand && x.sport === s.sport),
    ...racketStrings.filter((x) => x.brand !== s.brand && x.sport === s.sport && x.style === s.style),
  ].slice(0, 4);

  return (
    <>
      <section aria-label={`${s.brand} ${s.name}`} className="py-10 sm:py-14">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <Link href="/strings" className="inline-flex items-center gap-1 font-semibold text-green-heading hover:underline">
              <ArrowLeft aria-hidden="true" className="size-4" /> All strings
            </Link>
            {brand && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={`/brands/${brand.slug}`} className="hover:underline">{brand.name}</Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">{s.name}</span>
          </nav>
          <StringDetail s={s} initialColor={typeof color === 'string' ? (color as StringColor) : undefined} />
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-paper py-16 sm:py-20">
          <div className="container-site">
            <SectionHeading id="related-heading" eyebrow="You may also like" title={<>Similar <Accent>strings</Accent></>} />
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => <li key={r.slug}><StringCard s={r} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <CTABand
        title={<>Want {s.name} on your <span className="text-green-deep">racket?</span></>}
        text={`Send us your racket, the colour you want and your tension. We will reply with the price and when it will be ready.`}
      />
    </>
  );
}
