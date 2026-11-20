/**
 * Schema.org JSON-LD built only from confirmed (non-null) facts in lib/business.ts.
 * Entities reference each other by `@id`, so page-level markup (services, FAQ) points
 * back at the one LocalBusiness instead of repeating it.
 */
import { business, services, type Service } from './business';
import { faqs } from './faq';
import { METADATA_BASE, SITE_URL } from './site';

const abs = (path: string) => new URL(path, METADATA_BASE).toString();
const id = (name: string) => abs(`/#${name}`);

export const ORGANIZATION_ID = id('organization');
export const BUSINESS_ID = id('business');
const WEBSITE_ID = id('website');

const LOGO = '/images/country-sports-logo.webp';
const IMAGE = '/images/hero-racket-stringing.jpg';

/** Organization, LocalBusiness and WebSite: rendered once in the root layout. */
export function siteSchema() {
  const { address, phone, email, googleMapsUrl, openingHours, social, testimonials } = business;
  const sameAs = Object.values(social).filter(Boolean);
  const rated = testimonials.filter((t) => typeof t.rating === 'number');

  const organization = {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: business.name,
    ...(SITE_URL && { url: SITE_URL }),
    logo: { '@type': 'ImageObject', url: abs(LOGO), width: 1200, height: 293 },
    ...(phone && { telephone: phone.tel }),
    ...(email && { email }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  const localBusiness = {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: business.name,
    description: business.tagline,
    ...(SITE_URL && { url: SITE_URL }),
    image: abs(IMAGE),
    logo: abs(LOGO),
    parentOrganization: { '@id': ORGANIZATION_ID },
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
      areaServed: { '@type': 'City', name: address.city },
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
    // Genuine customer reviews only (see business.testimonials); nothing is emitted while the list is empty.
    ...(testimonials.length > 0 && {
      review: testimonials.map((t) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: t.name },
        reviewBody: t.quote,
        ...(typeof t.rating === 'number' && { reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 } }),
      })),
    }),
    ...(rated.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: +(rated.reduce((sum, t) => sum + t.rating!, 0) / rated.length).toFixed(1),
        reviewCount: rated.length,
        bestRating: 5,
      },
    }),
  };

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: business.name,
    ...(SITE_URL && { url: SITE_URL }),
    inLanguage: 'en-IN',
    publisher: { '@id': ORGANIZATION_ID },
  };

  return { '@context': 'https://schema.org', '@graph': [organization, localBusiness, website] };
}

function serviceEntity(s: Service) {
  return {
    '@type': 'Service',
    '@id': abs(`/services#${s.slug}`),
    name: s.name,
    serviceType: 'Badminton racket stringing and repair',
    description: [s.summary, ...s.details].join(' '),
    url: abs(`/services#${s.slug}`),
    provider: { '@id': BUSINESS_ID },
    ...(business.address && { areaServed: { '@type': 'City', name: business.address.city } }),
    ...(s.photo?.src && { image: abs(s.photo.src) }),
    ...(s.price !== null && {
      offers: {
        '@type': 'Offer',
        price: s.price,
        priceCurrency: 'INR',
        description: 'Labour price; the string is charged separately.',
      },
    }),
  };
}

/** Every service on /services, as an ItemList of Service entities. */
export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: serviceEntity(s) })),
  };
}

/** The homepage FAQ, matching the questions and answers shown on the page. */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
