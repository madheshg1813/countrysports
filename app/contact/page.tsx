import type { Metadata } from 'next';
import ContactDetails from '@/components/ContactDetails';
import ServicePicker from '@/components/ServicePicker';
import { PageHero } from '@/components/Section';
import { business } from '@/lib/business';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact & Directions: Velachery, Chennai',
  description: `Address, opening hours and phone number for ${business.name} in Velachery, Chennai. Send a WhatsApp enquiry for restringing price and turnaround.`,
  alternates: canonical('/contact'),
  openGraph: { url: '/contact', title: `Contact | ${business.name}` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Visit or <span className="text-green-deep">message us</span></>}
        intro="The quickest way to reach us is WhatsApp. Tell us what your racket needs and we will reply with the price and when it can be ready."
      />

      <section aria-label="Contact details and enquiry" className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-section text-navy-700">Shop details</h2>
            <div className="mt-8"><ContactDetails /></div>
          </div>
          <div>
            <h2 className="sr-only">Send a WhatsApp enquiry</h2>
            <ServicePicker />
          </div>
        </div>
      </section>
    </>
  );
}
