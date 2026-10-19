import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { business, services, formatAddress, formatTime } from '@/lib/business';
import Logo from './Logo';
import Placeholder from './Placeholder';

const linkCls = 'text-on-navy-muted transition-colors hover:text-green-deep';

function Column({ title, children, label }: { title: string; label?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-extrabold tracking-wide text-white">{title}</h2>
      {label ? <nav aria-label={label} className="mt-5">{children}</nav> : <div className="mt-5">{children}</div>}
    </div>
  );
}

export default function Footer() {
  const socials = Object.entries(business.social).filter(([, url]) => url) as [string, string][];

  return (
    <footer className="on-navy bg-navy-deep pb-8 pt-16 text-sm sm:pt-20">
      <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo className="h-12 sm:h-14" />
          <p className="mt-5 max-w-xs leading-relaxed text-on-navy-muted">
            {business.tagline}. Send us a WhatsApp message to check price and turnaround.
          </p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-5">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={`capitalize ${linkCls}`}>{name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2">
          <Column title="Quick Links" label="Footer: quick links">
            <ul className="space-y-3">
              {[['/', 'Home'], ['/services', 'Stringing Services'], ['/brands', 'String Brands'], ['/pricing', 'Pricing'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}><Link href={href} className={linkCls}>{label}</Link></li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-3">
          <Column title="Our Services" label="Footer: services">
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services#${s.slug}`} className={linkCls}>{s.name}</Link></li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-3">
          <Column title="Contact">
            <address className="space-y-4 not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green-deep" />
                {business.address ? (
                  business.googleMapsUrl
                    ? <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>{formatAddress(business.address)}<span className="sr-only"> (opens Google Maps)</span></a>
                    : <span className="text-on-navy-muted">{formatAddress(business.address)}</span>
                ) : <Placeholder>Shop address</Placeholder>}
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green-deep" />
                {business.phone ? <a href={`tel:${business.phone.tel}`} className={linkCls}>{business.phone.display}</a> : <Placeholder>Phone number</Placeholder>}
              </p>
              {business.email && (
                <p className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green-deep" />
                  <a href={`mailto:${business.email}`} className={`break-all ${linkCls}`}>{business.email}</a>
                </p>
              )}
              {business.openingHours.map((h) => (
                <p key={h.label} className="flex gap-3 text-on-navy-muted">
                  <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green-deep" />
                  <span>{h.label}: {formatTime(h.opens)} – {formatTime(h.closes)}{business.hoursNote && <><br />{business.hoursNote}</>}</span>
                </p>
              ))}
            </address>
          </Column>
        </div>
      </div>

      <div className="container-site mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-on-navy-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {business.name}</p>
        <p>{business.address ? `${business.address.locality}, ${business.address.city}` : ''}</p>
      </div>
    </footer>
  );
}
