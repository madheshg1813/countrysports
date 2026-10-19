import type { Metadata } from 'next';
import { Check, Clock } from 'lucide-react';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import ServicePicker from '@/components/ServicePicker';
import CTABand from '@/components/CTABand';
import TrustBar from '@/components/TrustBar';
import { PageHero } from '@/components/Section';
import { PriceTag, serviceIcons } from '@/components/ServiceCard';
import { business, services } from '@/lib/business';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Badminton Racket Restringing & Repair Services',
  description:
    'Badminton racket restringing (standard and 3-hour express), grip replacement, grommet replacement and frame checks in Velachery, Chennai. Prices and turnaround times.',
  alternates: canonical('/services'),
  openGraph: { url: '/services', title: `Services | ${business.name}` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Racket stringing <span className="text-green-deep">services</span></>}
        intro="Stringing, advice, grips and racket care for badminton players. Labour prices are listed below; strings are charged at MRP."
      >
        <WhatsAppCTA label="Book Your Stringing" />
      </PageHero>

      <section aria-label="Service list" className="py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <ol className="space-y-5 lg:col-span-8">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug];
              return (
                <li key={s.slug} id={s.slug} className="scroll-mt-24">
                  <article aria-labelledby={`${s.slug}-title`} className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        {Icon && (
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-heading text-white">
                            <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                          </span>
                        )}
                        <div>
                          <h2 id={`${s.slug}-title`} className="text-xl leading-tight text-ink sm:text-2xl">{s.name}</h2>
                          <p className="mt-2 leading-relaxed text-ink-muted">{s.summary}</p>
                        </div>
                      </div>
                      <div className="shrink-0 sm:text-right">
                        <PriceTag service={s} />
                        {s.turnaround && (
                          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-muted">
                            <Clock aria-hidden="true" className="size-4 text-green-heading" /> {s.turnaround}
                          </p>
                        )}
                      </div>
                    </div>
                    <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                      {s.details.map((d) => (
                        <li key={d} className="flex gap-3 leading-relaxed text-ink">
                          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-heading">
                            <Check aria-hidden="true" className="size-3 text-white" strokeWidth={3} />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <WhatsAppCTA
                      enquiryPhrase={s.enquiryPhrase}
                      label={`Enquire about ${s.name}`}
                      variant="secondary-light"
                      className="mt-6 w-full sm:w-auto"
                    />
                  </article>
                </li>
              );
            })}
          </ol>

          <aside aria-label="Send an enquiry" className="lg:col-span-4">
            <div className="lg:sticky lg:top-24"><ServicePicker /></div>
          </aside>
        </div>
      </section>

      <div className="pb-20"><TrustBar /></div>

      <CTABand
        title={<>Not sure what your racket <span className="text-green-deep">needs?</span></>}
        text="Send us a message describing the problem, such as a broken string, a worn grip or a crack, and we will tell you what we recommend."
      />
    </>
  );
}
