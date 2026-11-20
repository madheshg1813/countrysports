import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Grid3x3, MessageCircle, ReceiptIndianRupee, Spool } from 'lucide-react';
import CostEstimator from '@/components/CostEstimator';
import CTABand from '@/components/CTABand';
import { Accent, PageHero, SectionHeading } from '@/components/Section';
import { serviceIcons } from '@/components/ServiceCard';
import StringPriceList from '@/components/StringPriceList';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { business, formatPrice, services } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';
import { racketStrings } from '@/lib/strings';

const standard = services.find((s) => s.slug === 'standard-stringing');
const express = services.find((s) => s.slug === 'express-stringing');
const cheapest = Math.min(...racketStrings.flatMap((s) => (s.price !== null ? [s.price] : [])));

export const metadata: Metadata = {
  title: 'Badminton Restringing Prices',
  description:
    standard?.price && express?.price && Number.isFinite(cheapest)
      ? `Badminton racket restringing prices at ${business.name}, Velachery, Chennai: standard ${formatPrice(standard.price)} and express ${formatPrice(express.price)} labour, plus string prices from ${formatPrice(cheapest)}.`
      : `Badminton racket restringing prices at ${business.name}, Velachery, Chennai. Labour and string prices, with a cost estimator.`,
  alternates: canonical('/pricing'),
  openGraph: openGraph('/pricing', `Pricing | ${business.name}`),
};

/** Facts from lib/business.ts: labour vs. string pricing, confirmation before work, string advice. */
const howItWorks = [
  { icon: ReceiptIndianRupee, title: 'Labour + string', text: 'Your total is the labour for the service plus the price of the string you choose. Both are listed on this page.' },
  { icon: MessageCircle, title: 'Confirmed before we start', text: 'Message us on WhatsApp and we reply with the total and when your racket will be ready. Nothing is booked until we confirm.' },
  { icon: Spool, title: 'Help choosing a string', text: 'Not sure what to pick? Tell us how you play and we will suggest strings and a tension range before any work starts.' },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Restringing <span className="text-green-deep">prices</span></>}
        intro="Labour for every service, the price of every string we stock, and a quick estimate of your total. We confirm the final price before any work begins."
      >
        <WhatsAppCTA label="Get a price on WhatsApp" />
      </PageHero>

      <section aria-labelledby="price-list-heading" className="py-16 sm:py-20">
        <div className="container-site">
          <h2 id="price-list-heading" className="text-section text-navy-700">Price list</h2>
          <p className="mt-2 text-base leading-relaxed text-ink-muted sm:text-lg">Labour per racket. The string is extra; see string prices below.</p>

          <ul className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug] ?? Grid3x3;
              return (
                <li key={s.slug} className="grid gap-4 border-b border-line p-5 last:border-b-0 sm:p-6 md:grid-cols-[minmax(0,1fr)_11rem_auto] md:items-center md:gap-8">
                  <div className="flex gap-4">
                    <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-heading text-white">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold normal-case tracking-normal text-navy-900">{s.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
                      {s.turnaround && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-green-heading">
                          <Clock aria-hidden="true" className="size-4" /> {s.turnaround}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price: indented under the name on phones, its own right-aligned column from 768px */}
                  <div className="pl-16 md:pl-0 md:text-right">
                    {s.price !== null ? (
                      <>
                        <p className="font-display text-2xl font-extrabold text-navy-900">{formatPrice(s.price)}</p>
                        {s.priceNote && <p className="text-xs font-medium text-ink-muted">{s.priceNote}</p>}
                      </>
                    ) : (
                      <p className="font-display text-base font-extrabold text-navy-900">{s.priceLabel ?? 'Price on enquiry'}</p>
                    )}
                  </div>

                  <div className="pl-16 md:pl-0">
                    <WhatsAppCTA variant="secondary-light" size="sm" label="Enquire" srContext={`about ${s.name}`} enquiryPhrase={s.enquiryPhrase} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="estimate-heading" className="pb-16 sm:pb-20">
        <div className="container-site">
          <SectionHeading id="estimate-heading" eyebrow="Cost estimator" title={<>Estimate your <Accent>total</Accent></>} intro="Pick a service, a string and how many rackets. The estimate updates as you go." />
          <div className="mt-8"><CostEstimator /></div>
        </div>
      </section>

      <section aria-labelledby="string-prices-heading" className="pb-16 sm:pb-20">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="string-prices-heading" eyebrow="String prices" title={<>Every string, <Accent>one price list</Accent></>} intro="Price per string set, on top of the labour above." />
            <div className="flex flex-wrap gap-3">
              <Link href="/strings/compare" className="btn-secondary-light min-h-11 px-4 py-2 text-sm">Compare strings</Link>
              <Link href="/string-finder" className="btn-secondary-light min-h-11 px-4 py-2 text-sm">Help me choose</Link>
            </div>
          </div>
          <div className="mt-8"><StringPriceList /></div>
        </div>
      </section>

      <section aria-labelledby="how-pricing-heading" className="bg-paper py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading id="how-pricing-heading" align="center" eyebrow="How pricing works" title={<>Clear, <Accent>upfront</Accent> pricing</>} />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {howItWorks.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-green-heading text-white">
                  <item.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold normal-case tracking-normal text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-16 sm:pt-20">
        <CTABand
          title={<>Get an exact <span className="text-green-deep">price</span></>}
          text="Send us your racket model and the string you want on WhatsApp, and we will reply with the total and when it can be ready."
        />
      </div>
    </>
  );
}
