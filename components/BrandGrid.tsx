import Link from 'next/link';
import type { StringBrand } from '@/lib/business';
import BrandLogo from './BrandLogo';

/** Logo tiles, each linking to that brand's own page. */
export default function BrandGrid({ brands }: { brands: StringBrand[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {brands.map((b) => (
        <li key={b.slug}>
          <Link
            href={`/brands/${b.slug}`}
            className="flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white px-4 text-center shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-green-heading/40 hover:shadow-card-hover sm:h-32"
          >
            <BrandLogo name={b.name} logo={b.logo} stacked />
          </Link>
        </li>
      ))}
    </ul>
  );
}
