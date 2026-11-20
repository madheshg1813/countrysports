import type { Metadata } from 'next';
import Link from 'next/link';
import CTABand from '@/components/CTABand';
import { PageHero } from '@/components/Section';
import StringShop from '@/components/StringShop';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { business } from '@/lib/business';
import { filterKeys, type StringFilters } from '@/lib/strings';
import { canonical, openGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Shop Strings by Type, Colour & Brand',
  description: `Choose your racket string at ${business.name}, Velachery, Chennai: filter Yonex and Victor badminton strings by type, colour and brand, then enquire on WhatsApp.`,
  alternates: canonical('/strings'),
  openGraph: openGraph('/strings', `Strings | ${business.name}`),
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function StringsPage({ searchParams }: Props) {
  const params = await searchParams;
  // e.g. /strings?brand=Yonex&color=White,Black
  const initial = Object.fromEntries(
    filterKeys.map((k) => {
      const v = params[k];
      return [k, (Array.isArray(v) ? v.join(',') : v ?? '').split(',').filter(Boolean)];
    }),
  ) as StringFilters;

  return (
    <>
      <PageHero
        eyebrow="Strings"
        title={<>Choose your <span className="text-green-deep">string</span></>}
        intro="Pick a string by type, colour and brand. We string it on your racket at the tension you ask for and confirm the total before any work starts."
      >
        <Link href="/string-finder" className="btn-primary">Not sure? Take the string finder quiz</Link>
        <WhatsAppCTA variant="secondary-dark" label="Ask on WhatsApp" enquiryPhrase="advice on the right string and tension for my game" />
      </PageHero>

      <section aria-labelledby="catalogue-heading" className="py-12 sm:py-16">
        <div className="container-site">
          <h2 id="catalogue-heading" className="sr-only">String catalogue</h2>
          <StringShop initial={initial} />
        </div>
      </section>

      <CTABand
        title={<>Can&apos;t find your <span className="text-green-deep">string?</span></>}
        text="Message us the string you play with. If it is not on this page we can usually get it in."
      />
    </>
  );
}
