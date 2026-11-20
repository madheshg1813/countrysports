/**
 * Plain-text summary for AI crawlers (llmstxt.org format), served at /llms.txt and /llm.txt.
 * Built from lib/business.ts so it never drifts from what the site says.
 */
import { business, formatAddress, formatPrice, formatTime, services, stringBrands } from './business';
import { METADATA_BASE } from './site';

const url = (path: string) => new URL(path, METADATA_BASE).toString();

const pages: [path: string, name: string, about: string][] = [
  ['/', 'Home', 'Overview of the shop, featured services, recommended strings and FAQ'],
  ['/services', 'Services', 'Every service with labour price and turnaround'],
  ['/pricing', 'Pricing', 'Labour prices and string prices'],
  ['/strings', 'Strings', 'Catalogue of strings in stock, filterable by type, colour and brand'],
  ['/string-finder', 'String finder', 'Short quiz that suggests a string and tension'],
  ['/tension-guide', 'Tension guide', 'How string tension affects power and control'],
  ['/strings/compare', 'Compare strings', 'Side-by-side string comparison'],
  ['/brands', 'Brands', 'String brands stocked'],
  ['/clubs', 'Clubs and academies', 'Bulk stringing for clubs and coaching academies'],
  ['/contact', 'Contact', 'Address, opening hours, phone, WhatsApp and directions'],
  ['/about', 'About', 'About the workshop'],
];

export function llmsText() {
  const { address, phone, email, openingHours, hoursNote } = business;
  const lines = [
    `# ${business.name}`,
    '',
    `> ${business.tagline}. Walk-in shop that restrings badminton rackets at the tension the player asks for, with standard (within 24 hours) and express (about 3 hours) service. Bookings and enquiries are by WhatsApp.`,
    '',
    '## Shop details',
    '',
    ...(address ? [`- Address: ${formatAddress(address)}, ${address.region}, India`] : []),
    ...openingHours.map((h) => `- Hours: ${h.label}, ${formatTime(h.opens)} to ${formatTime(h.closes)}`),
    ...(hoursNote ? [`- ${hoursNote}`] : []),
    ...(phone ? [`- Phone: ${phone.display}`] : []),
    ...(email ? [`- Email: ${email}`] : []),
    `- String brands stocked: ${stringBrands.map((b) => b.name).join(', ')}`,
    '',
    '## Services',
    '',
    ...services.map((s) => {
      const price = s.price !== null ? `${formatPrice(s.price)} labour, string extra` : s.priceLabel ?? 'Price on enquiry';
      return `- ${s.name}: ${s.summary} ${price}.${s.turnaround ? ` Turnaround: ${s.turnaround.toLowerCase()}.` : ''}`;
    }),
    '',
    '## Key pages',
    '',
    ...pages.map(([path, name, about]) => `- [${name}](${url(path)}): ${about}`),
    '',
    '## Optional',
    '',
    ...stringBrands.map((b) => `- [${b.name} strings](${url(`/brands/${b.slug}`)})`),
    `- [Sitemap](${url('/sitemap.xml')})`,
    '',
  ];
  return lines.join('\n');
}

export function llmsResponse() {
  return new Response(llmsText(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
