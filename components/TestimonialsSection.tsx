import Image from 'next/image';
import { Star } from 'lucide-react';
import { business } from '@/lib/business';
import { Accent, SectionHeading } from './Section';

type Testimonial = (typeof business.testimonials)[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6">
      {typeof t.rating === 'number' && (
        <p className="flex gap-0.5 text-navy-950" aria-label={`Rated ${t.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} aria-hidden="true" className={`size-4 ${i < t.rating! ? 'fill-green-heading text-green-heading' : 'text-line'}`} />
          ))}
        </p>
      )}
      <blockquote className="mt-4 flex-1 leading-relaxed text-ink">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {t.photo ? (
          <Image src={t.photo} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-green-heading text-sm font-bold text-white">{initials}</span>
        )}
        <span>
          <span className="block font-bold text-ink">{t.name}</span>
          <span className="block text-sm text-ink-muted">{[t.playerType, t.source].filter(Boolean).join(' · ')}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Renders only when genuine reviews exist in lib/business.ts. */
export default function TestimonialsSection() {
  if (business.testimonials.length === 0) return null;

  return (
    <section aria-labelledby="reviews-heading" className="py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading id="reviews-heading" eyebrow="What our customers say" title={<>Trusted by <Accent>badminton players</Accent></>} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {business.testimonials.map((t) => <li key={t.name + t.quote.slice(0, 12)}><TestimonialCard t={t} /></li>)}
        </ul>
      </div>
    </section>
  );
}
