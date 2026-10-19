import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/Photo';
import RacketArt from '@/components/RacketArt';
import Placeholder from '@/components/Placeholder';
import CTABand from '@/components/CTABand';
import { Accent, PageHero, SectionHeading } from '@/components/Section';
import { business, photos } from '@/lib/business';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Our Velachery Racket Workshop',
  description: `About ${business.name}, a badminton racket restringing and repair shop in Velachery, Chennai.`,
  alternates: canonical('/about'),
  openGraph: { url: '/about', title: `About | ${business.name}` },
};

export default function AboutPage() {
  const { foundedYear, ownerName, story } = business.about;

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>A racket shop for <span className="text-green-deep">badminton players</span></>}
        intro={`${business.name} is a badminton racket stringing and care shop in ${business.address ? `${business.address.locality}, ${business.address.city}` : 'Chennai'}.`}
      />

      <section aria-labelledby="story-heading" className="py-16 sm:py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="story-heading" eyebrow="Our Story" title={<>How we <Accent>started</Accent></>} />
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-muted">
              {story ? <p>{story}</p> : <p><Placeholder>Shop story: how and why the shop started, in the owner’s words</Placeholder></p>}
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-paper p-5">
                  <dt className="eyebrow text-navy-700">Founded</dt>
                  <dd className="mt-1 font-display text-xl font-extrabold text-ink">{foundedYear ?? <Placeholder>Year founded</Placeholder>}</dd>
                </div>
                <div className="rounded-2xl border border-line bg-paper p-5">
                  <dt className="eyebrow text-navy-700">Run by</dt>
                  <dd className="mt-1 font-display text-xl font-extrabold text-ink">{ownerName ?? <Placeholder>Owner / stringer name</Placeholder>}</dd>
                </div>
              </dl>
            </div>
          </div>
          <Photo
            photo={photos.hero}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-3xl"
            fallback={<RacketArt className="absolute inset-0 h-full w-full p-8" />}
          />
        </div>
      </section>

      <section aria-labelledby="workshop-heading" className="bg-paper py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <SectionHeading
            id="workshop-heading"
            eyebrow="The Workshop"
            title={<>What happens to <Accent>your racket</Accent></>}
            intro="Your racket is checked before it is strung. If we see a damaged grommet or a crack in the frame, we tell you before doing any work."
          />
          <div className="space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>We string to the tension and string you ask for. If you are not sure what to choose, tell us how you play and we will explain the options.</p>
            <p>Standard stringing is ready within 24 hours. When you need your racket back sooner, express stringing takes about 3 hours.</p>
            <Link href="/services" className="btn-secondary-light mt-2">
              See all services and prices <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="pt-20"><CTABand /></div>
    </>
  );
}
