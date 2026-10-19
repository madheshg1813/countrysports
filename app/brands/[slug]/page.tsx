import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Clock } from 'lucide-react';
import BrandGrid from '@/components/BrandGrid';
import BrandLogo from '@/components/BrandLogo';
import CTABand from '@/components/CTABand';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Accent, PageHero, SectionHeading } from '@/components/Section';
import { PriceTag } from '@/components/ServiceCard';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { business, services, stringBrands } from '@/lib/business';
import { canonical } from '@/lib/site';

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
  return {
    title: `${brand.name} Badminton Strings & Restringing`,
    description: `Badminton racket restringing with ${brand.name} strings at ${business.name}, Velachery, Chennai. Strings at MRP; ask on WhatsApp which ${brand.name} strings are in stock.`,
    alternates: canonical(path),
    openGraph: { url: path, title: `${brand.name} Strings | ${business.name}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = stringBrands.find((b) => b.slug === slug);
  if (!brand) notFound();

  const otherBrands = stringBrands.filter((b) => b.slug !== brand.slug);

  return (
    <>
      <PageHero
        eyebrow="String Brands"
        title={<>{brand.name} <span className="text-green-deep">strings</span></>}
        intro={
          brand.about ??
          `We restring badminton rackets with ${brand.name} strings at our Velachery shop. Tell us which ${brand.name} string you play with, or ask us to suggest one for how you play.`
        }
      >
        <WhatsAppCTA label={`Ask about ${brand.name} strings`} enquiryPhrase={`restringing my racket with ${brand.name} strings`} />
        <Link href="/brands" className="btn-secondary-dark">
          <ArrowLeft aria-hidden="true" className="size-4" /> All brands
        </Link>
      </PageHero>

      <section aria-labelledby="brand-stringing-heading" className="py-16 sm:py-20">
        <div className="container-site grid items-start gap-10 lg:grid-cols-12">
          <div className="flex h-48 items-center justify-center rounded-2xl border border-line bg-white px-6 shadow-card sm:h-56 lg:col-span-4 [&_img]:scale-125">
            <BrandLogo name={brand.name} logo={brand.logo} />
          </div>

          <div className="lg:col-span-8">
            <SectionHeading
              id="brand-stringing-heading"
              eyebrow={`Restringing with ${brand.name}`}
              title={<>Your racket, <Accent>{brand.name}</Accent> strings</>}
              intro={`${brand.name} strings are charged at MRP on top of the stringing labour below. Message us to check a particular ${brand.name} string is in stock.`}
            />
            <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
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
            <ul className="mt-6 grid gap-3 text-ink sm:grid-cols-2">
              {['Strings charged at MRP', 'Strung at the tension you ask for', 'Advice on string and tension', 'Price and ready time confirmed first'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green-heading" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FeaturedProducts
        brand={brand.name}
        title={<>Popular <Accent>{brand.name}</Accent> strings</>}
        intro={`${brand.name} strings we stock. Ask us which one suits your game.`}
      />

      <section aria-labelledby="other-brands-heading" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading id="other-brands-heading" eyebrow="More Brands" title={<>Other string <Accent>brands</Accent></>} />
          <BrandGrid brands={otherBrands} />
        </div>
      </section>

      <CTABand
        title={<>Want {brand.name} <span className="text-green-deep">strings?</span></>}
        text={`Send us your racket, the ${brand.name} string you want and your tension. We will reply with the price and when it will be ready.`}
      />
    </>
  );
}
