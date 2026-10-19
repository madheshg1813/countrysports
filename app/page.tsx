import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Gem, MapPin, Settings, ShieldCheck, Truck } from 'lucide-react';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import ServiceCard from '@/components/ServiceCard';
import BookingTimeline from '@/components/BookingTimeline';
import TrustBar from '@/components/TrustBar';
import StringBrandsSection from '@/components/StringBrandsSection';
import ExpertAdviceBanner from '@/components/ExpertAdviceBanner';
import TestimonialsSection from '@/components/TestimonialsSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CTABand from '@/components/CTABand';
import RacketArt from '@/components/RacketArt';
import FAQ from '@/components/FAQ';
import ContactDetails from '@/components/ContactDetails';
import { Accent, SectionHeading } from '@/components/Section';
import { business, photos, services } from '@/lib/business';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `${business.name} | Badminton Racket Restringing in Velachery, Chennai` },
  description:
    'Badminton racket restringing in Velachery, Chennai: standard within 24 hours or express in about 3 hours, plus grip and grommet replacement. Enquire on WhatsApp.',
  alternates: canonical('/'),
  openGraph: { url: '/', title: `${business.name}: badminton racket restringing in Velachery, Chennai` },
};

const heroIndicators = [
  { icon: Gem, label: ['Professional', 'Stringing'] },
  { icon: Settings, label: ['Accurate', 'Tension'] },
  { icon: ShieldCheck, label: ['Quality', 'Strings'] },
  { icon: Truck, label: ['Fast', 'Turnaround'] },
];

export default function HomePage() {
  const featured = services.filter((s) => s.featured);
  const hasPhoto = Boolean(photos.hero.src);

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="on-navy bg-navy-hero relative flex flex-col overflow-hidden text-white lg:min-h-[min(40rem,calc(100svh-4.5rem))] lg:flex-row lg:items-center"
      >
        {/* Photo: full-bleed background on desktop, banner below the text on smaller screens */}
        {hasPhoto && (
          <div className="relative order-2 aspect-[16/10] w-full max-lg:[mask-image:linear-gradient(to_bottom,transparent,black_40%)] sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto">
            <Image src={photos.hero.src!} alt={photos.hero.alt} fill priority sizes="100vw" className="object-cover object-[78%_50%] lg:object-right" />
            <div aria-hidden="true" className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(90deg,#06172b_0%,rgba(6,23,43,0.88)_34%,rgba(6,23,43,0.3)_56%,rgba(6,23,43,0)_72%)]" />
          </div>
        )}

        <div className={`container-site relative z-10 order-1 grid items-center gap-10 pb-12 pt-12 sm:pt-16 lg:py-16 ${hasPhoto ? 'max-lg:pb-4' : 'lg:grid-cols-12'}`}>
          <div className={hasPhoto ? '' : 'lg:col-span-7'}>
            <h1 id="hero-heading" className="text-hero animate-rise">
              Precision<br />
              <span className="text-green-deep lg:whitespace-nowrap">In Every String</span>
            </h1>
            <p className="animate-rise mt-5 max-w-xl text-lg leading-relaxed text-white/90 [animation-delay:100ms]">
              Expert stringing service for better control, power and performance.<br className="hidden sm:inline" /> Your tension. Your game.
            </p>
            <div className="animate-rise mt-8 flex flex-col [animation-delay:200ms] sm:flex-row">
              <WhatsAppCTA label="Book Your Stringing" icon={false} trailingArrow className="min-h-14 gap-3 px-7 text-lg" />
            </div>
            <ul className="animate-rise mt-12 grid max-w-2xl grid-cols-2 gap-y-5 [animation-delay:300ms] sm:flex sm:divide-x sm:divide-white/20">
              {heroIndicators.map((item) => (
                <li key={item.label.join(' ')} className="flex items-center gap-3 sm:px-5 sm:first:pl-0">
                  <item.icon aria-hidden="true" className="size-7 shrink-0 text-green-deep" strokeWidth={1.5} />
                  <span className="text-sm leading-tight text-white/90">{item.label[0]}<br />{item.label[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          {!hasPhoto && (
            <div className="relative mx-auto aspect-square w-full max-w-56 sm:max-w-sm lg:col-span-5 lg:max-w-none">
              <RacketArt className="absolute inset-0 h-full w-full" />
            </div>
          )}
        </div>

        <p aria-hidden="true" className="absolute bottom-10 right-10 z-10 hidden -rotate-6 text-right font-script text-4xl leading-tight text-white xl:block">
          Better Strings<br />Better Game
          <svg viewBox="0 0 200 14" className="ml-auto mt-1 h-3 w-44 text-green-deep" fill="none"><path d="M2 11 C 60 2, 140 2, 198 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
        </p>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" className="pb-6 pt-12 sm:pt-14">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading
              id="services-heading"
              eyebrow="Our Services"
              title={<>Racket Stringing <Accent>Services</Accent></>}
              intro="Professional stringing, tailored to your playing style."
            />
            <Link href="/services" className="btn min-h-11 shrink-0 self-start border-2 border-green-heading bg-white px-5 text-sm text-green-heading hover:bg-green-heading hover:text-white md:self-auto">
              View All Services <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          {/* Mobile: swipeable row (next card peeks in, bleeds to the screen edge). Tablet: 2 columns.
              Desktop: 4 in a row from 1100px (68.75rem; rem so it sorts after `sm:`), the narrowest
              width where every price fits beside its arrow. */}
          <ul className="-mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 pt-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:auto-rows-fr sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:p-0 min-[68.75rem]:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {featured.map((s) => (
              <li key={s.slug} className="w-[max(82%,15.5rem)] max-w-80 shrink-0 snap-start sm:w-auto sm:max-w-none">
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-4"><TrustBar /></div>

      <StringBrandsSection />

      <ExpertAdviceBanner />

      <BookingTimeline />

      <FeaturedProducts />

      <TestimonialsSection />

      {/* Contact & location */}
      <section aria-labelledby="visit-heading" className="py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="visit-heading" eyebrow="Visit Us" title={<>Visit Our <Accent>Shop</Accent></>} />
            <div className="mt-8"><ContactDetails /></div>
          </div>
          <div className="lg:pt-14">
            <div className="rounded-xl border border-line bg-paper p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold normal-case tracking-normal text-ink">Before you visit</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                Message us first and we will tell you if your string is in stock and when your racket can be ready. For express service, this helps us keep a slot for you.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <WhatsAppCTA />
                {business.googleMapsUrl && (
                  <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary-light">
                    <MapPin aria-hidden="true" className="size-5" /> Directions
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="bg-paper py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            id="faq-heading"
            align="center"
            eyebrow="FAQ"
            title={<>Common <Accent>Questions</Accent></>}
            intro="Quick answers about restringing times, prices, strings and visiting our shop."
          />
          <div className="mt-10"><FAQ /></div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
