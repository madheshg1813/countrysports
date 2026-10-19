import Link from 'next/link';
import { ArrowRight, Feather, Gauge, Grid3x3, Hand, Spool, Timer, Wrench, type LucideIcon } from 'lucide-react';
import { formatPrice, type Service } from '@/lib/business';
import Photo from './Photo';

export const serviceIcons: Record<string, LucideIcon> = {
  'standard-stringing': Feather,
  'high-tension-stringing': Gauge,
  'express-stringing': Timer,
  'string-tension-advice': Spool,
  'racket-care': Wrench,
  'grip-replacement': Hand,
};

export function PriceTag({ service, tone = 'light' }: { service: Service; tone?: 'light' | 'dark' }) {
  const muted = tone === 'dark' ? 'text-on-navy-muted' : 'text-ink-muted';
  return service.price !== null ? (
    <p className={`font-display text-base font-extrabold ${tone === 'dark' ? 'text-white' : 'text-ink'}`}>
      {formatPrice(service.price)}
      {service.priceNote && <span className={`block font-sans text-xs font-medium ${muted}`}>{service.priceNote}</span>}
    </p>
  ) : (
    <p className={`font-display text-base font-extrabold ${tone === 'dark' ? 'text-white' : 'text-ink'}`}>{service.priceLabel ?? 'Price on enquiry'}</p>
  );
}

/** Card image: real photo when supplied, otherwise navy string-bed art with the service icon. */
function CardMedia({ service, Icon }: { service: Service; Icon: LucideIcon }) {
  const photo = service.photo ?? { src: null, alt: service.name, width: 800, height: 420 };
  return (
    <Photo
      photo={photo}
      sizes="(min-width: 1280px) 300px, (min-width: 68.75rem) 25vw, (min-width: 640px) 50vw, 82vw"
      // Caps the photo height on wide 2-column cards; narrower cards keep the full 16:9 frame.
      // w-full stops the browser shrinking the width to keep 16:9 once the cap kicks in.
      className="max-h-56 w-full transition-transform duration-500 group-hover:scale-[1.04]"
      fallback={
        <>
          <div aria-hidden="true" className="string-grid absolute inset-0 [mask-image:radial-gradient(circle_at_70%_40%,black,transparent_80%)]" />
          <Icon aria-hidden="true" className="absolute right-5 top-1/2 size-20 -translate-y-1/2 text-lime/15" strokeWidth={1.25} />
        </>
      }
    />
  );
}

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.slug] ?? Grid3x3;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="overflow-hidden">
        <CardMedia service={service} Icon={Icon} />
      </div>
      <span className="relative z-10 -mt-8 ml-4 flex size-14 items-center justify-center rounded-full bg-white text-green-heading shadow-card">
        <Icon aria-hidden="true" className="size-6" strokeWidth={2} />
      </span>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
        <h3 className="font-display text-base font-bold normal-case tracking-normal text-navy-900">{service.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <PriceTag service={service} />
          <Link
            href={`/services#${service.slug}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-green-heading text-green-heading transition-colors after:absolute after:inset-0 group-hover:border-green-heading group-hover:bg-green-heading group-hover:text-white"
          >
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
            <span className="sr-only">{service.name}: details and booking</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
