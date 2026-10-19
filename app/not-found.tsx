import type { Metadata } from 'next';
import Link from 'next/link';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { Eyebrow } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="on-navy bg-navy-hero py-24 text-white sm:py-32">
      <div className="container-site max-w-3xl">
        <Eyebrow tone="dark">Error 404</Eyebrow>
        <h1 className="text-hero mt-4">Out <span className="text-green-deep">of bounds</span></h1>
        <p className="mt-6 text-lg leading-relaxed text-on-navy-muted">
          We couldn’t find that page. It may have moved, or the link may be wrong.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-bold text-green-deep">
          <li><Link href="/" className="underline-offset-4 hover:underline">Home</Link></li>
          <li><Link href="/services" className="underline-offset-4 hover:underline">Services and prices</Link></li>
          <li><Link href="/contact" className="underline-offset-4 hover:underline">Contact and directions</Link></li>
        </ul>
        <WhatsAppCTA className="mt-10" />
      </div>
    </section>
  );
}
