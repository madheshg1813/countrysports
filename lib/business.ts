/**
 * Single source of truth for business facts shown on the site and in
 * structured data. `null` means "not confirmed yet": the UI shows a clearly
 * marked placeholder (or hides the item) and structured data leaves the field
 * out entirely. Never fill these with guesses.
 */

export type Maybe<T> = T | null;

export interface OpeningHours {
  /** Schema.org day names, e.g. "Monday". */
  days: string[];
  label: string;
  opens: string; // 24h "HH:MM"
  closes: string;
}

export interface Photo {
  /** Path under /public, e.g. "/images/workshop.jpg". null until real photos are supplied. */
  src: Maybe<string>;
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  slug: string;
  name: string;
  /** Lower-case phrase used inside the WhatsApp message. */
  enquiryPhrase: string;
  summary: string;
  details: string[];
  /** Labour price in INR; null = no confirmed price. */
  price: Maybe<number>;
  priceNote?: string;
  /** Shown instead of a price when `price` is null. */
  priceLabel?: string;
  turnaround: Maybe<string>;
  /** Shown in the homepage services row. */
  featured?: boolean;
  photo?: Photo;
}

export const business = {
  name: 'Country Sports Racket Care',
  shortName: 'Country Sports',
  tagline: 'Badminton racket restringing and care in Velachery, Chennai',

  phone: { display: '+91 94446 06191', tel: '+919444606191' } as Maybe<{ display: string; tel: string }>,
  email: 'countrysports@gmail.com' as Maybe<string>,

  address: {
    street: 'No. 13, 12th Street, Ashtalakshmi Nagar',
    locality: 'Velachery',
    city: 'Chennai',
    region: 'Tamil Nadu',
    postalCode: '600042',
    country: 'IN',
  } as Maybe<{ street: string; locality: string; city: string; region: string; postalCode: string; country: string }>,

  googleMapsUrl: 'https://share.google/76WsOZhpxNPNbosmc' as Maybe<string>,

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], label: 'Monday – Saturday', opens: '10:00', closes: '20:00' },
  ] as OpeningHours[],
  /** Shown alongside opening hours; not part of structured data. */
  hoursNote: 'Sunday: by appointment only' as Maybe<string>,

  social: {
    instagram: null as Maybe<string>,
    facebook: null as Maybe<string>,
    youtube: null as Maybe<string>,
  },

  /** Facts for the About page. Leave null until the owner supplies them. */
  about: {
    foundedYear: null as Maybe<number>,
    ownerName: null as Maybe<string>,
    story: null as Maybe<string>,
  },

  /**
   * Genuine customer reviews only, with the customer's permission.
   * `rating` only if the customer actually gave one (e.g. a Google review).
   * The testimonials section stays hidden while this is empty.
   */
  testimonials: [] as { quote: string; name: string; playerType?: string; rating?: number; photo?: string; source: string }[],
};

export const services: Service[] = [
  {
    slug: 'standard-stringing',
    name: 'Standard Stringing',
    enquiryPhrase: 'standard badminton racket stringing',
    summary: 'High-quality stringing for all levels of players.',
    details: [
      'Tell us your string and preferred tension, or ask us to suggest one for how you play.',
      'Ready within 24 hours.',
      'Labour is charged separately; strings are charged at MRP.',
    ],
    price: 350,
    priceNote: 'labour + string at MRP',
    turnaround: 'Within 24 hours',
    featured: true,
    photo: { src: '/images/service-standard-stringing.jpg', alt: 'A badminton racket clamped on a stringing machine while lime-green string is woven through the frame', width: 1024, height: 576 },
  },
  {
    slug: 'high-tension-stringing',
    name: 'High Tension Stringing',
    enquiryPhrase: 'high tension badminton racket stringing',
    summary: 'Precise and consistent high-tension stringing.',
    details: [
      'For players who want a tighter string bed and more control.',
      'Tell us your racket model and target tension when you enquire.',
    ],
    price: null,
    priceLabel: 'Price on enquiry',
    turnaround: null,
    featured: true,
    photo: { src: '/images/service-high-tension.jpg', alt: 'Close-up of a tightly strung badminton racket string bed', width: 1024, height: 576 },
  },
  {
    slug: 'express-stringing',
    name: 'Express Stringing',
    enquiryPhrase: 'express (3-hour) badminton racket stringing',
    summary: 'Priority stringing for when you need your racket back the same day.',
    details: [
      'Your racket goes to the front of the queue and is ready in about 3 hours.',
      'Includes frame cleaning and a tension-retention coating.',
      'Message us first so we can confirm a same-day slot.',
    ],
    price: 600,
    priceNote: 'labour + string at MRP',
    turnaround: 'About 3 hours',
  },
  {
    slug: 'string-tension-advice',
    name: 'String & Tension Advice',
    enquiryPhrase: 'advice on the right string and tension for my game',
    summary: 'Get expert recommendations for the right string and tension.',
    details: [
      'Tell us how you play: attacking, defensive, doubles or singles.',
      'We suggest strings and a tension range before any work starts.',
    ],
    price: null,
    priceLabel: 'Ask on WhatsApp',
    turnaround: null,
    featured: true,
    photo: { src: '/images/service-string-advice.jpg', alt: 'Coils of badminton string in different colours', width: 1024, height: 576 },
  },
  {
    slug: 'racket-care',
    name: 'Racket Care & Maintenance',
    enquiryPhrase: 'badminton racket care and maintenance (grommets, frame check, cleaning)',
    summary: 'Grommet checks, frame cleaning and general racket care.',
    details: [
      'Worn or broken grommets replaced to protect your strings and frame.',
      'Frame check for cracks and damage, useful after a clash or a fall.',
      'Frame cleaning.',
    ],
    price: null,
    priceLabel: 'Price on enquiry',
    turnaround: null,
    featured: true,
    photo: { src: '/images/service-racket-care.jpg', alt: 'A technician inspecting the grommets on a badminton racket frame', width: 1024, height: 576 },
  },
  {
    slug: 'grip-replacement',
    name: 'Grip Replacement',
    enquiryPhrase: 'badminton racket grip replacement',
    summary: 'A fresh grip fitted to the thickness and feel you like.',
    details: [
      'Replacement grips and overgrips fitted in the shop.',
      'Tell us if you prefer a thinner or thicker handle.',
    ],
    price: null,
    priceLabel: 'Price on enquiry',
    turnaround: null,
  },
];

export interface StringBrand {
  /** URL part of the brand's own page: /brands/<slug>. */
  slug: string;
  name: string;
  /** `wordmark: true` = the logo already spells the brand name, so the text name is hidden visually. */
  logo?: { src: string; width: number; height: number; wordmark?: boolean };
  /** Optional paragraph for the brand's page, written by the shop. Leave out until confirmed. */
  about?: string;
}

/**
 * String brands the shop stocks: tiles in the homepage brand carousel and on the Brands
 * page, each with its own page at /brands/<slug>. A brand without a `logo` is shown as its
 * name in text; add the logo file to /public/images/brands when one is supplied.
 */
export const stringBrands: StringBrand[] = [
  { slug: 'yonex', name: 'Yonex', logo: { src: '/images/brands/yonex.png', width: 269, height: 148 } },
  { slug: 'victor', name: 'Victor', logo: { src: '/images/brands/victor.png', width: 160, height: 148 } },
  { slug: 'li-ning', name: 'Li-Ning', logo: { src: '/images/brands/li-ning.png', width: 181, height: 148, wordmark: true } },
  { slug: 'ashaway', name: 'Ashaway', logo: { src: '/images/brands/ashaway.png', width: 186, height: 148 } },
  { slug: 'apacs', name: 'Apacs', logo: { src: '/images/brands/apacs.png', width: 101, height: 101 } },
  { slug: 'kizuna', name: 'Kizuna', logo: { src: '/images/brands/kizuna.png', width: 451, height: 81, wordmark: true } },
  { slug: 'babolat', name: 'Babolat', logo: { src: '/images/brands/babolat.png', width: 922, height: 157, wordmark: true } },
  { slug: 'gosen', name: 'Gosen', logo: { src: '/images/brands/gosen.png', width: 554, height: 140, wordmark: true } },
];

/**
 * Featured string products (strings the shop stocks). `price: null` shows
 * "Price on enquiry" — add real prices here when confirmed.
 */
export const featuredProducts: { name: string; brand: string; summary: string; bestFor: string; price: Maybe<number> }[] = [
  {
    name: 'BG65',
    brand: 'Yonex',
    summary: 'A durable all-round string with a comfortable, controlled feel.',
    bestFor: 'Regular club play and beginners',
    price: null,
  },
  {
    name: 'BG80',
    brand: 'Yonex',
    summary: 'A crisp, hard-hitting string with a sharp feel on impact.',
    bestFor: 'Attacking players who want power',
    price: null,
  },
  {
    name: 'Exbolt',
    brand: 'Yonex',
    summary: 'A thin, fast-repelling string for quick, powerful shots.',
    bestFor: 'Fast doubles and smash-heavy play',
    price: null,
  },
];

/** Placeholder photos: replace `src` with real images in /public/images. */
export const photos = {
  hero: { src: '/images/hero-racket-stringing.jpg', alt: 'A badminton racket with lime-green strings mounted on a stringing machine', width: 1600, height: 900 } as Photo,
  advice: { src: null, alt: 'Close-up of badminton racket strings', width: 900, height: 900 } as Photo,
};

export function formatAddress(a: NonNullable<typeof business.address>) {
  return `${a.street}, ${a.locality}, ${a.city} ${a.postalCode}`;
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}
