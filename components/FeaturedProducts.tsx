import Image from 'next/image';
import { Target } from 'lucide-react';
import { featuredProducts, formatPrice, stringBrands } from '@/lib/business';
import WhatsAppCTA from './WhatsAppCTA';
import { Accent, SectionHeading } from './Section';

/**
 * Strings the shop stocks, each with a WhatsApp enquiry. `brand` limits the list to one brand.
 * Hidden if none are configured.
 */
export default function FeaturedProducts({
  brand,
  title = <>Strings We <Accent>Recommend</Accent></>,
  intro = 'Popular strings we stock. Ask us which one suits your game.',
}: { brand?: string; title?: React.ReactNode; intro?: string } = {}) {
  const products = brand ? featuredProducts.filter((p) => p.brand === brand) : featuredProducts;
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="products-heading" className="bg-paper py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          id="products-heading"
          eyebrow="Featured Products"
          title={title}
          intro={intro}
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const logo = stringBrands.find((b) => b.name === p.brand)?.logo;
            return (
              <li key={p.brand + p.name}>
                <article className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex items-center gap-3">
                    {logo && !logo.wordmark && (
                      <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="h-8 w-auto" />
                    )}
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">{p.brand}</p>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-extrabold uppercase italic tracking-tight text-navy-950">{p.name}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{p.summary}</p>
                  <p className="mt-4 flex items-start gap-2 text-sm text-ink">
                    <Target aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green-heading" />
                    <span><span className="font-semibold">Best for:</span> {p.bestFor}</span>
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                    <p className="font-display text-base font-extrabold text-ink">
                      {p.price !== null ? formatPrice(p.price) : 'Price on enquiry'}
                    </p>
                    <WhatsAppCTA
                      size="sm"
                      label={`Ask about ${p.name}`}
                      enquiryPhrase={`restringing my racket with ${p.brand} ${p.name}`}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
