import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/lib/business';
import { findString, type RacketString } from '@/lib/strings';
import FeaturedProductCard from './FeaturedProductCard';
import { Accent, SectionHeading } from './Section';

type Featured = (typeof featuredProducts)[number] & { s: RacketString };

/**
 * Hand-picked strings with the shop's own description, pulling name, price, colours and gauge
 * from the string catalogue. `brand` limits the list to one brand. Hidden if none are configured.
 */
export default function FeaturedProducts({
  brand,
  title = <>Strings We <Accent>Recommend</Accent></>,
  intro = 'Popular strings we stock. Ask us which one suits your game.',
}: { brand?: string; title?: React.ReactNode; intro?: string } = {}) {
  const products: Featured[] = featuredProducts
    .flatMap((p) => {
      const s = findString(p.slug);
      return s ? [{ ...p, s }] : [];
    })
    .filter((p) => !brand || p.s.brand === brand);
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="products-heading" className="bg-paper py-16 sm:py-20">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="products-heading" eyebrow="Featured Products" title={title} intro={intro} />
          <div className="flex flex-wrap gap-3">
            {products.length > 1 && (
              <Link href={`/strings/compare?ids=${products.map((p) => p.s.slug).join(',')}`} className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
                Compare these {products.length}
              </Link>
            )}
            <Link href="/strings" className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
              View all strings <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <FeaturedProductCard s={p.s} summary={p.summary} bestFor={p.bestFor} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
