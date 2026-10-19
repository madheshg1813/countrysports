import { business } from '@/lib/business';
import { SITE_URL } from '@/lib/site';

/** LocalBusiness JSON-LD built only from confirmed (non-null) business facts. */
export default function LocalBusinessSchema() {
  const { address, phone, email, googleMapsUrl, openingHours, social } = business;
  const sameAs = Object.values(social).filter(Boolean);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.tagline,
    ...(SITE_URL && { url: SITE_URL, '@id': `${SITE_URL}/#business` }),
    ...(phone && { telephone: phone.tel }),
    ...(email && { email }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${address.street}, ${address.locality}`,
        addressLocality: address.city,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
    }),
    ...(googleMapsUrl && { hasMap: googleMapsUrl }),
    ...(openingHours.length > 0 && {
      openingHoursSpecification: openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
