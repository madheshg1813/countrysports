import { Clock, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { business, formatAddress, formatTime } from '@/lib/business';
import Placeholder from './Placeholder';

/** Address, hours, phone and map link, from lib/business.ts. Light-surface styling. */
export default function ContactDetails() {
  const { address, openingHours, hoursNote, phone, email, googleMapsUrl } = business;

  const rows = [
    {
      icon: MapPin,
      label: 'Address',
      body: address ? <>{business.name}<br />{formatAddress(address)}</> : <Placeholder>Shop address</Placeholder>,
      action: googleMapsUrl ? { href: googleMapsUrl, text: 'Open in Google Maps' } : null,
    },
    {
      icon: Clock,
      label: 'Opening hours',
      body: openingHours.length > 0
        ? <>{openingHours.map((h) => <span key={h.label} className="block">{h.label}: {formatTime(h.opens)} – {formatTime(h.closes)}</span>)}{hoursNote && <span className="block">{hoursNote}</span>}</>
        : <Placeholder>Opening hours</Placeholder>,
      action: null,
    },
    {
      icon: Phone,
      label: 'Phone',
      body: phone ? <a href={`tel:${phone.tel}`} className="text-ink underline-offset-4 hover:underline">{phone.display}</a> : <Placeholder>Phone number</Placeholder>,
      action: null,
    },
    ...(email ? [{ icon: Mail, label: 'Email', body: <a href={`mailto:${email}`} className="break-all text-ink underline-offset-4 hover:underline">{email}</a>, action: null }] : []),
  ];

  return (
    <ul className="space-y-6">
      {rows.map((row) => (
        <li key={row.label} className="flex gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-heading text-white">
            <row.icon aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-sm font-extrabold uppercase text-ink">{row.label}</h3>
            <p className="mt-1 leading-relaxed text-ink-muted">{row.body}</p>
            {row.action && (
              <a href={row.action.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-bold text-navy-700 underline-offset-4 hover:underline">
                {row.action.text}
                <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
