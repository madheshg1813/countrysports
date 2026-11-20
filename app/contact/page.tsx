import type { Metadata } from 'next';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';
import ContactDetails from '@/components/ContactDetails';
import { PageHero } from '@/components/Section';
import { business } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact & Directions: Velachery, Chennai',
  description: `Address, opening hours and phone number for ${business.name} in Velachery, Chennai. Send a WhatsApp enquiry for restringing price and turnaround.`,
  alternates: canonical('/contact'),
  openGraph: openGraph('/contact', `Contact | ${business.name}`),
};

const heroLink = 'font-semibold text-green-deep underline-offset-4 hover:underline';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ContactPage({ searchParams }: Props) {
  // Links from the string shop and string finder prefill the form: /contact?string=yonex-bg65&color=White&tension=24#book
  const params = await searchParams;
  const one = (k: string) => (typeof params[k] === 'string' ? (params[k] as string) : undefined);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Visit or <span className="text-green-deep">message us</span></>}
        intro={<>
          The quickest way to reach us is WhatsApp. Tell us what your racket needs and we will reply with the price and when it can be ready.
          See our <Link href="/services" className={heroLink}>services</Link> and <Link href="/pricing" className={heroLink}>prices</Link> for a guide.
        </>}
      />

      <section aria-label="Contact details and enquiry" className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-section text-navy-700">Shop details</h2>
            <div className="mt-8"><ContactDetails /></div>
          </div>
          <div>
            <BookingForm prefill={{ service: one('service'), string: one('string'), color: one('color'), tension: one('tension') }} />
          </div>
        </div>
      </section>
    </>
  );
}
