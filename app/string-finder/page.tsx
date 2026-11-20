import type { Metadata } from 'next';
import { PageHero } from '@/components/Section';
import StringFinder from '@/components/StringFinder';
import { business } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Badminton String & Tension Finder',
  description: `Answer six quick questions and get badminton string suggestions and a tension range from ${business.name}, Velachery, Chennai. Book the setup on WhatsApp.`,
  alternates: canonical('/string-finder'),
  openGraph: openGraph('/string-finder', `String & Tension Finder | ${business.name}`),
};

export default function StringFinderPage() {
  return (
    <>
      <PageHero
        eyebrow="String Finder"
        title={<>Find your string <span className="text-green-deep">&amp; tension</span></>}
        intro="Six quick questions about how you play. We suggest strings and a tension range, and you can book the setup in one tap."
      />
      <section aria-label="String finder" className="py-12 sm:py-16">
        <div className="container-site">
          <StringFinder />
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink-muted">
            These are starting points. We confirm the string and tension with you on WhatsApp before any work starts.
          </p>
        </div>
      </section>
    </>
  );
}
