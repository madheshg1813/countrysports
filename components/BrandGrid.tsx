import Link from 'next/link';
import { formatPrice, type StringBrand } from '@/lib/business';
import { racketStrings } from '@/lib/strings';
import BrandLogo from './BrandLogo';

/** "10 strings · from ₹349" for a brand's tile, or null when the catalogue has none. */
function catalogueSummary(brand: string) {
  const list = racketStrings.filter((s) => s.brand === brand);
  if (list.length === 0) return null;
  const prices = list.flatMap((s) => (s.price !== null ? [s.price] : []));
  return `${list.length} ${list.length === 1 ? 'string' : 'strings'}${prices.length ? ` · from ${formatPrice(Math.min(...prices))}` : ''}`;
}

/** Logo tiles, each linking to that brand's own page, with how many strings it has and the lowest price. */
export default function BrandGrid({ brands }: { brands: StringBrand[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {brands.map((b) => (
        <li key={b.slug}>
          <Link
            href={`/brands/${b.slug}`}
            className="flex h-36 flex-col overflow-hidden rounded-2xl border border-line bg-white text-center shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-green-heading/40 hover:shadow-card-hover sm:h-40"
          >
            <span className="flex flex-1 items-center justify-center overflow-hidden px-4">
              <BrandLogo name={b.name} logo={b.logo} stacked />
            </span>
            {catalogueSummary(b.name) && (
              <span className="border-t border-line bg-paper px-2 py-2 text-xs font-semibold text-ink-muted">{catalogueSummary(b.name)}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
