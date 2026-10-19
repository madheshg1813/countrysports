import { Check, CircleCheck, Clock, MapPin, MessageCircle, ShieldCheck, Store, Trophy, type LucideIcon } from 'lucide-react';
import { business, services, type Service } from '@/lib/business';
import WhatsAppCTA from './WhatsAppCTA';
import { Accent, SectionHeading } from './Section';

const standard = services.find((s) => s.slug === 'standard-stringing');
const express = services.find((s) => s.slug === 'express-stringing');

/** Each step's chip states a confirmed fact from lib/business.ts (left out when the fact is missing). */
const steps: { icon: LucideIcon; title: string; text: string; chip: { icon: LucideIcon; label: string } | null }[] = [
  { icon: MessageCircle, title: 'Enquire', text: 'Message us with your racket and stringing requirements.', chip: { icon: MessageCircle, label: 'On WhatsApp' } },
  { icon: CircleCheck, title: 'Confirm', text: 'We’ll confirm the price, string options and availability.', chip: { icon: ShieldCheck, label: 'Before any work begins' } },
  { icon: Store, title: 'Drop off', text: 'Bring your racket to the shop.', chip: business.address ? { icon: MapPin, label: `${business.address.locality}, ${business.address.city}` } : null },
  { icon: Trophy, title: 'Play', text: 'Collect your racket once the service is complete.', chip: standard?.turnaround ? { icon: Clock, label: `Ready ${standard.turnaround.toLowerCase()}` } : null },
];

const ctaPoints = [
  standard?.turnaround && `Standard: ${standard.turnaround.toLowerCase()}`,
  express?.turnaround && `Express: ${express.turnaround.toLowerCase()}`,
  'Price confirmed first',
].filter(Boolean) as string[];

/**
 * "How it works": a four-step timeline (horizontal from 768px, vertical on phones) joined by a
 * dashed route line, then one WhatsApp CTA panel. Pass `service` to name that service in the
 * WhatsApp message; without it the message is a general restringing enquiry. WhatsAppCTA falls
 * back to a phone link when no WhatsApp number is configured. No animation.
 */
export default function BookingTimeline({ service }: { service?: Service }) {
  return (
    <section id="process" aria-labelledby="process-heading" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          id="process-heading"
          align="center"
          eyebrow="How it works"
          title={<>Get your racket <Accent>game-ready</Accent></>}
          intro="Four simple steps. One easy WhatsApp conversation."
        />

        {/*
          From 768px a dashed route runs between the first and last icon centres (4 columns, 1.5rem
          gaps, icon badge 88px tall), behind the badges' opaque white rims.
        */}
        <ol className="relative mx-auto mt-12 max-w-5xl md:mt-14 md:grid md:grid-cols-4 md:gap-6 md:before:absolute md:before:left-[calc((100%-4.5rem)/8)] md:before:right-[calc((100%-4.5rem)/8)] md:before:top-[2.6875rem] md:before:border-t-2 md:before:border-dashed md:before:border-green-heading/30">
          {steps.map((step, i) => (
            <li
              key={step.title}
              // Phones: badge beside the text, with a dashed line down to the next badge.
              className="relative flex gap-5 pb-10 after:absolute after:bottom-0 after:left-[2.125rem] after:top-[4.25rem] after:-translate-x-1/2 after:border-l-2 after:border-dashed after:border-green-heading/30 last:pb-0 last:after:hidden md:flex-col md:items-center md:gap-0 md:pb-0 md:text-center md:after:hidden"
            >
              {/* White rim (hides the route) > soft green halo > solid green icon, with the step number on a white tab */}
              <span aria-hidden="true" className="relative z-10 shrink-0 self-start rounded-full bg-white p-1 md:self-center md:p-1.5">
                <span className="block rounded-full bg-green-heading/10 p-1.5 md:p-2">
                  <span className="flex size-12 items-center justify-center rounded-full bg-green-heading text-white shadow-card md:size-15">
                    <step.icon className="size-5 md:size-6" />
                  </span>
                </span>
                <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 font-display text-[0.7rem] font-extrabold text-green-heading shadow-card ring-1 ring-line md:h-7 md:min-w-7 md:text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>

              {/* From 768px the chip sits at the bottom of each step so all four line up */}
              <div className="pt-2 md:mt-4 md:flex md:flex-1 md:flex-col md:items-center md:pt-0">
                <h3 className="font-display text-lg font-bold normal-case tracking-normal text-navy-900 md:text-base lg:text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted md:mx-auto md:mb-3 md:max-w-[15rem]">{step.text}</p>
                {step.chip && (
                  // A pill, except on tablets (768–1023px) where narrow columns make it plain text so it can wrap cleanly
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-green-heading ring-1 ring-line md:mt-auto md:max-lg:bg-transparent md:max-lg:p-0 md:max-lg:ring-0">
                    <step.chip.icon aria-hidden="true" className="size-3.5" />
                    {step.chip.label}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* CTA panel: stacked (full-width button on phones), text and button side by side from 1024px */}
        <div className="on-navy bg-navy-deep relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl p-6 text-white shadow-card sm:p-8 md:mt-16 lg:p-10">
          <div aria-hidden="true" className="string-grid absolute inset-y-0 right-0 w-2/3 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div>
              <h3 className="font-display text-xl font-extrabold normal-case tracking-normal sm:text-2xl lg:text-[1.75rem]">Ready to restring your racket?</h3>
              <p className="mt-2 leading-relaxed text-on-navy-muted">Tell us your service requirements. We’ll confirm the price and availability.</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                {ctaPoints.map((point) => (
                  <li key={point} className="flex items-center gap-1.5">
                    <Check aria-hidden="true" className="size-4 text-green-deep" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 lg:text-right">
              <WhatsAppCTA label="Start on WhatsApp" trailingArrow enquiryPhrase={service?.enquiryPhrase} className="min-h-14 w-full px-7 text-lg sm:w-auto" />
              <p className="mt-2.5 text-xs text-on-navy-muted lg:ml-auto lg:max-w-[17.5rem]">Nothing is booked until we confirm the price and time with you.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
