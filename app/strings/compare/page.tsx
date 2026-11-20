import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CompareTable from '@/components/CompareTable';
import { PageHero } from '@/components/Section';
import { business } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Compare Badminton Strings',
  description: `Compare Yonex and Victor badminton strings side by side at ${business.name}, Velachery, Chennai: price, gauge, power, control, durability and colours.`,
  alternates: canonical('/strings/compare'),
  openGraph: openGraph('/strings/compare', `Compare Strings | ${business.name}`),
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ComparePage({ searchParams }: Props) {
  // e.g. /strings/compare?ids=yonex-bg65,yonex-bg80-power
  const { ids } = await searchParams;
  const initial = (Array.isArray(ids) ? ids.join(',') : ids ?? '').split(',').filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Compare Strings"
        title={<>Compare <span className="text-green-deep">side by side</span></>}
        intro="Put up to four strings next to each other: price, gauge, colours, and how they play."
      >
        <Link href="/strings" className="btn-secondary-dark">
          <ArrowLeft aria-hidden="true" className="size-4" /> All strings
        </Link>
        <Link href="/string-finder" className="btn-secondary-dark">Take the string finder quiz</Link>
      </PageHero>
      <section aria-label="String comparison" className="py-12 sm:py-16">
        <div className="container-site">
          <CompareTable initial={initial} />
        </div>
      </section>
    </>
  );
}
