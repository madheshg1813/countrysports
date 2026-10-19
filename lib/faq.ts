import { business, featuredProducts, formatAddress, formatTime, services, formatPrice, stringBrands } from './business';

const standard = services.find((s) => s.slug === 'standard-stringing');
const express = services.find((s) => s.slug === 'express-stringing');
const hours = business.openingHours[0];

/** "A, B and C" */
const listJoin = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items[0] ?? '');
const brands = listJoin(stringBrands.map((b) => b.name));
const featuredStrings = listJoin(featuredProducts.map((p) => `${p.brand} ${p.name}`));

/**
 * Answers use only confirmed facts from lib/business.ts. The homepage shows the
 * first half in the left column and the second half in the right column.
 */
export const faqs: { q: string; a: string }[] = [
  // Timing, price and booking
  {
    q: 'How long does badminton racket restringing take?',
    a: `Standard restringing is ready within 24 hours. If you need it sooner, express restringing takes about 3 hours. Message us first so we can confirm the time.`,
  },
  {
    q: 'How much does restringing cost?',
    a: standard?.price && express?.price
      ? `Labour is ${formatPrice(standard.price)} for standard restringing and ${formatPrice(express.price)} for express. Strings are charged separately at MRP, so the total depends on the string you choose.`
      : 'Send us a WhatsApp message with your racket and preferred string and we will share the price.',
  },
  {
    q: 'What does express restringing include?',
    a: express
      ? `Your racket goes to the front of the queue and is ready in ${express.turnaround?.toLowerCase() ?? 'about 3 hours'}. Express also includes frame cleaning and a tension-retention coating.${express.price ? ` Labour is ${formatPrice(express.price)}, plus the string at MRP.` : ''} Message us first so we can confirm a same-day slot.`
      : 'Message us on WhatsApp and we will tell you if we can restring your racket the same day.',
  },
  {
    q: 'Do I need an appointment?',
    a: hours
      ? `You can walk in ${hours.label}, ${formatTime(hours.opens)} to ${formatTime(hours.closes)}.${business.hoursNote ? ` ${business.hoursNote}.` : ''} Messaging ahead on WhatsApp helps us plan, especially for express service.`.trim()
      : 'Message us on WhatsApp before visiting so we can confirm a time.',
  },
  {
    q: 'Does sending a WhatsApp message confirm my booking?',
    a: 'No. Your message starts an enquiry. We reply to confirm the price, string availability and when your racket will be ready.',
  },

  // Strings, services and visiting
  {
    q: 'Which string and tension should I choose?',
    a: 'Tell us the string and tension you usually play with. If you are not sure, describe how you play and we will suggest options before we start.',
  },
  {
    q: 'Which string brands do you stock?',
    a: brands
      ? `We stock strings from ${brands}.${featuredStrings ? ` Popular choices include ${featuredStrings}.` : ''} Ask on WhatsApp to check a particular string is in stock.`
      : 'Ask us on WhatsApp which strings are in stock.',
  },
  {
    q: 'Can you string my racket at high tension?',
    a: 'Yes. High tension stringing is for players who want a tighter string bed and more control. Tell us your racket model and target tension when you enquire and we will confirm the price.',
  },
  {
    q: 'Can you replace my grip or broken grommets?',
    a: 'Yes. We fit replacement grips and replace worn or broken grommets. Ask on WhatsApp for the price for your racket.',
  },
  {
    q: 'Where is your shop?',
    a: business.address
      ? `We are at ${formatAddress(business.address)}. Message us on WhatsApp before you visit so we can check your string is in stock.`
      : 'Message us on WhatsApp and we will share directions to the shop.',
  },
];
