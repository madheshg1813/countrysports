import type { Maybe } from './business';

/**
 * String catalogue for the /strings shop page: filter by sport, play style, colour and brand.
 * `brand` must match a name in `stringBrands` (lib/business.ts) so it links to that brand's page.
 * Prices: `price` is what the customer pays; `mrp` is shown struck through when higher.
 * null = "Price on enquiry". Colours are the ones in stock (photographed). Prices are the shop's own (no MRP discount shown).
 */

export type Sport = 'Badminton' | 'Tennis' | 'Squash';
export type PlayStyle = 'Power' | 'Control' | 'Durability' | 'All-round';

/** Swatch colours for the colour filter and the coil artwork. */
export const stringColors = {
  White: '#ffffff',
  Black: '#111827',
  Red: '#e11d1d',
  Yellow: '#fde047',
  Blue: '#1d4ed8',
  Orange: '#f97316',
  Pink: '#ec4899',
  Green: '#22c55e',
  Purple: '#7c3aed',
  Lavender: '#a5b4fc',
  'Sky Blue': '#38bdf8',
  Mint: '#a7f3d0',
  Silver: '#c0c7d1',
  Grey: '#6b7280',
  Gold: '#c9a227',
} as const;

export type StringColor = keyof typeof stringColors;

export interface RacketString {
  slug: string;
  brand: string;
  name: string;
  sport: Sport;
  /** Gauge in mm. */
  gauge: number;
  style: PlayStyle;
  colors: StringColor[];
  price: Maybe<number>;
  mrp: Maybe<number>;
  /** Short line from the maker's packet, shown on the string's own page. */
  tagline?: string;
  /** Photos of the actual packets in the shop, per colour (cut out onto a clear background). */
  photos?: Partial<Record<StringColor, string>>;
}

/** Photo paths for the colours photographed: public/images/strings/<slug>-<colour>.webp */
const packs = (slug: string, colors: StringColor[]) =>
  Object.fromEntries(colors.map((c) => [c, `/images/strings/${slug}-${c.toLowerCase().replace(' ', '-')}.webp`]));

/** Packet photo for a colour, if the shop has one. */
export const stringPhoto = (s: RacketString, color: StringColor) => s.photos?.[color];

/** Ticked options per filter on /strings; also the URL query keys (?brand=Yonex&color=White,Black). */
export type StringFilters = { sport: string[]; style: string[]; color: string[]; brand: string[] };
export const filterKeys: (keyof StringFilters)[] = ['sport', 'style', 'color', 'brand'];

export const sports: Sport[] =['Badminton', 'Tennis', 'Squash'];
export const playStyles: PlayStyle[] = ['Power', 'Control', 'Durability', 'All-round'];

export const racketStrings: RacketString[] = [
  // Badminton: the strings in the shop, with photos of the actual packets
  { slug: 'yonex-bg65', brand: 'Yonex', name: 'BG 65', sport: 'Badminton', gauge: 0.70, style: 'Durability', colors: ['Black', 'Yellow', 'Blue', 'Sky Blue', 'Purple', 'Lavender'], price: 550, mrp: null,
    tagline: 'Trusted string with high durability.', photos: packs('yonex-bg65', ['Black', 'Yellow', 'Blue', 'Sky Blue', 'Purple', 'Lavender']) },
  { slug: 'yonex-bg65-titanium', brand: 'Yonex', name: 'BG 65 Titanium', sport: 'Badminton', gauge: 0.70, style: 'Durability', colors: ['Blue', 'Pink'], price: 600, mrp: null,
    tagline: 'Highly durable all-around model.', photos: packs('yonex-bg65-titanium', ['Blue', 'Pink']) },
  { slug: 'yonex-bg66-ultimax', brand: 'Yonex', name: 'BG 66 Ultimax', sport: 'Badminton', gauge: 0.65, style: 'Control', colors: ['White', 'Orange'], price: 750, mrp: null,
    tagline: 'Quick repulsion. Lightning speed.', photos: packs('yonex-bg66-ultimax', ['White', 'Orange']) },
  { slug: 'yonex-bg80-power', brand: 'Yonex', name: 'BG 80 Power', sport: 'Badminton', gauge: 0.68, style: 'Power', colors: ['White'], price: 750, mrp: null,
    tagline: 'Quick repulsion. Strong, powerful smash.', photos: packs('yonex-bg80-power', ['White']) },
  { slug: 'victor-vbs-66n', brand: 'Victor', name: 'VBS-66 Nano', sport: 'Badminton', gauge: 0.66, style: 'Control', colors: ['White', 'Mint'], price: 700, mrp: null,
    tagline: 'High resilience with a medium feeling.', photos: packs('victor-vbs-66n', ['White', 'Mint']) },
  { slug: 'victor-vbs-70', brand: 'Victor', name: 'VBS-70', sport: 'Badminton', gauge: 0.70, style: 'Durability', colors: ['White', 'Green', 'Yellow'], price: 500, mrp: null,
    tagline: 'Built for durability with a medium feeling.', photos: packs('victor-vbs-70', ['White', 'Green', 'Yellow']) },

  // Badminton: more strings the shop can fit; prices are approximate until the shop confirms them
  { slug: 'yonex-bg80', brand: 'Yonex', name: 'BG 80', sport: 'Badminton', gauge: 0.68, style: 'Power', colors: ['White'], price: 750, mrp: null,
    tagline: 'Quick repulsion. Overpowering heavy smash.', photos: packs('yonex-bg80', ['White']) },
  { slug: 'yonex-exbolt-63', brand: 'Yonex', name: 'Exbolt 63', sport: 'Badminton', gauge: 0.63, style: 'Power', colors: ['White'], price: 900, mrp: null,
    tagline: 'Quick repulsion. Pierce through with agile drives.', photos: packs('yonex-exbolt-63', ['White']) },
  { slug: 'yonex-exbolt-65', brand: 'Yonex', name: 'Exbolt 65', sport: 'Badminton', gauge: 0.65, style: 'All-round', colors: ['White'], price: 900, mrp: null,
    tagline: 'Quick repulsion. Drill through with agile shots.', photos: packs('yonex-exbolt-65', ['White']) },
  { slug: 'yonex-exbolt-68', brand: 'Yonex', name: 'Exbolt 68', sport: 'Badminton', gauge: 0.68, style: 'Durability', colors: ['White'], price: 900, mrp: null,
    tagline: 'Durability. Strike through with agile smashes.', photos: packs('yonex-exbolt-68', ['White']) },
  { slug: 'yonex-aerobite', brand: 'Yonex', name: 'Aerobite', sport: 'Badminton', gauge: 0.67, style: 'Control', colors: ['Red'], price: 950, mrp: null,
    tagline: 'Control with a medium feeling. 0.67 mm mains, 0.61 mm crosses.', photos: packs('yonex-aerobite', ['Red']) },
  { slug: 'yonex-nanogy-95', brand: 'Yonex', name: 'Nanogy 95', sport: 'Badminton', gauge: 0.69, style: 'Durability', colors: ['Gold'], price: 800, mrp: null,
    tagline: 'Durability with a medium feeling.', photos: packs('yonex-nanogy-95', ['Gold']) },
  { slug: 'yonex-nanogy-98', brand: 'Yonex', name: 'Nanogy 98', sport: 'Badminton', gauge: 0.66, style: 'Power', colors: ['Blue', 'Yellow', 'Black', 'Gold'], price: 850, mrp: null,
    tagline: 'Repulsion power with a sharp feel.', photos: packs('yonex-nanogy-98', ['Blue', 'Yellow', 'Black', 'Gold']) },
  { slug: 'victor-vbs-63', brand: 'Victor', name: 'VBS-63', sport: 'Badminton', gauge: 0.63, style: 'Power', colors: ['White'], price: 750, mrp: null,
    tagline: 'High resilience with a medium feeling.', photos: packs('victor-vbs-63', ['White']) },
  { slug: 'victor-vbs-68p', brand: 'Victor', name: 'VBS-68 Power', sport: 'Badminton', gauge: 0.68, style: 'Control', colors: ['White'], price: 700, mrp: null,
    tagline: 'Control with a soft feeling.', photos: packs('victor-vbs-68p', ['White']) },
  { slug: 'li-ning-no1', brand: 'Li-Ning', name: 'No.1', sport: 'Badminton', gauge: 0.65, style: 'Power', colors: ['White'], price: 800, mrp: null,
    tagline: 'High repulsion power.', photos: packs('li-ning-no1', ['White']) },
  { slug: 'li-ning-no5', brand: 'Li-Ning', name: 'No.5', sport: 'Badminton', gauge: 0.69, style: 'Durability', colors: ['White'], price: 650, mrp: null,
    tagline: 'Durability plus repulsion power.', photos: packs('li-ning-no5', ['White']) },
  { slug: 'babolat-ifeel-66', brand: 'Babolat', name: 'iFeel 66', sport: 'Badminton', gauge: 0.66, style: 'Control', colors: ['White'], price: 750, mrp: null, photos: packs('babolat-ifeel-66', ['White']) },
  { slug: 'babolat-ifeel-68', brand: 'Babolat', name: 'iFeel 68', sport: 'Badminton', gauge: 0.68, style: 'All-round', colors: ['White'], price: 700, mrp: null, photos: packs('babolat-ifeel-68', ['White']) },
  { slug: 'babolat-ifeel-70', brand: 'Babolat', name: 'iFeel 70', sport: 'Badminton', gauge: 0.70, style: 'Durability', colors: ['White'], price: 650, mrp: null, photos: packs('babolat-ifeel-70', ['White']) },
  { slug: 'ashaway-zymax-62-fire', brand: 'Ashaway', name: 'ZyMax 62 Fire', sport: 'Badminton', gauge: 0.62, style: 'Power', colors: ['Orange'], price: 850, mrp: null,
    tagline: 'Ultimate repulsion. Maintains tension.', photos: packs('ashaway-zymax-62-fire', ['Orange']) },
  { slug: 'ashaway-zymax-66-fire-power', brand: 'Ashaway', name: 'ZyMax 66 Fire Power', sport: 'Badminton', gauge: 0.66, style: 'Power', colors: ['Orange'], price: 800, mrp: null,
    tagline: 'Ultimate power. Maintains tension.', photos: packs('ashaway-zymax-66-fire-power', ['Orange']) },
  { slug: 'ashaway-zymax-69-fire', brand: 'Ashaway', name: 'ZyMax 69 Fire', sport: 'Badminton', gauge: 0.69, style: 'Durability', colors: ['Orange'], price: 800, mrp: null,
    tagline: 'Ultimate strength. Maintains tension.', photos: packs('ashaway-zymax-69-fire', ['Orange']) },
  { slug: 'gosen-g-tone-5', brand: 'Gosen', name: 'G-Tone 5', sport: 'Badminton', gauge: 0.65, style: 'All-round', colors: ['Orange', 'Sky Blue'], price: 650, mrp: null, photos: packs('gosen-g-tone-5', ['Orange', 'Sky Blue']) },
  { slug: 'gosen-g-tone-9', brand: 'Gosen', name: 'G-Tone 9', sport: 'Badminton', gauge: 0.69, style: 'Durability', colors: ['Grey'], price: 700, mrp: null, photos: packs('gosen-g-tone-9', ['Grey']) },
  { slug: 'kizuna-z58', brand: 'Kizuna', name: 'Z58 Premium', sport: 'Badminton', gauge: 0.58, style: 'Power', colors: ['Pink'], price: 1000, mrp: null,
    tagline: 'High repulsion and distance.', photos: packs('kizuna-z58', ['Pink']) },
  { slug: 'kizuna-z63', brand: 'Kizuna', name: 'Z63 Premium', sport: 'Badminton', gauge: 0.63, style: 'Control', colors: ['White'], price: 950, mrp: null,
    tagline: 'High repulsion and control.', photos: packs('kizuna-z63', ['White']) },
  { slug: 'kizuna-z69', brand: 'Kizuna', name: 'Z69 Premium', sport: 'Badminton', gauge: 0.69, style: 'Durability', colors: ['Yellow'], price: 900, mrp: null,
    tagline: 'High durability.', photos: packs('kizuna-z69', ['Yellow']) },
  { slug: 'apacs-virtuoso-pro-70', brand: 'Apacs', name: 'Virtuoso Pro 70', sport: 'Badminton', gauge: 0.70, style: 'Durability', colors: ['Yellow'], price: 550, mrp: null,
    tagline: 'Durability with a hard feel.', photos: packs('apacs-virtuoso-pro-70', ['Yellow']) },
  { slug: 'apacs-power-66', brand: 'Apacs', name: 'Power 66', sport: 'Badminton', gauge: 0.66, style: 'Power', colors: ['Purple'], price: 500, mrp: null,
    tagline: 'High repulsion power.', photos: packs('apacs-power-66', ['Purple']) },

  // Tennis: prices are approximate until the shop confirms them
  { slug: 'babolat-rpm-blast', brand: 'Babolat', name: 'RPM Blast', sport: 'Tennis', gauge: 1.25, style: 'Control', colors: ['Black'], price: 1500, mrp: null, photos: packs('babolat-rpm-blast', ['Black']) },
  { slug: 'babolat-xcel', brand: 'Babolat', name: 'Xcel', sport: 'Tennis', gauge: 1.30, style: 'All-round', colors: ['White'], price: 1400, mrp: null, photos: packs('babolat-xcel', ['White']) },
  { slug: 'babolat-pro-hurricane-tour', brand: 'Babolat', name: 'Pro Hurricane Tour', sport: 'Tennis', gauge: 1.25, style: 'Durability', colors: ['Yellow'], price: 1100, mrp: null, photos: packs('babolat-pro-hurricane-tour', ['Yellow']) },
  { slug: 'yonex-poly-tour-pro', brand: 'Yonex', name: 'Poly Tour Pro', sport: 'Tennis', gauge: 1.25, style: 'Control', colors: ['Yellow', 'Blue'], price: 1200, mrp: null, photos: packs('yonex-poly-tour-pro', ['Yellow', 'Blue']) },
  { slug: 'yonex-poly-tour-rev', brand: 'Yonex', name: 'Poly Tour Rev', sport: 'Tennis', gauge: 1.25, style: 'Power', colors: ['Purple'], price: 1250, mrp: null, photos: packs('yonex-poly-tour-rev', ['Purple']) },
  { slug: 'gosen-og-sheep-micro', brand: 'Gosen', name: 'OG-Sheep Micro', sport: 'Tennis', gauge: 1.30, style: 'All-round', colors: ['White'], price: 800, mrp: null, photos: packs('gosen-og-sheep-micro', ['White']) },
  { slug: 'ashaway-monogut-zx', brand: 'Ashaway', name: 'MonoGut ZX', sport: 'Tennis', gauge: 1.27, style: 'Power', colors: ['White'], price: 2000, mrp: null, photos: packs('ashaway-monogut-zx', ['White']) },

  // Squash: prices are approximate until the shop confirms them
  { slug: 'ashaway-supernick-xl', brand: 'Ashaway', name: 'SuperNick XL', sport: 'Squash', gauge: 1.30, style: 'Durability', colors: ['White'], price: 900, mrp: null, photos: packs('ashaway-supernick-xl', ['White']) },
  { slug: 'ashaway-powernick-18', brand: 'Ashaway', name: 'PowerNick 18', sport: 'Squash', gauge: 1.15, style: 'Power', colors: ['Red'], price: 1100, mrp: null, photos: packs('ashaway-powernick-18', ['Red']) },
  { slug: 'ashaway-ultranick-17', brand: 'Ashaway', name: 'UltraNick 17', sport: 'Squash', gauge: 1.20, style: 'Control', colors: ['Green'], price: 1200, mrp: null, photos: packs('ashaway-ultranick-17', ['Green']) },
  { slug: 'babolat-xcel-squash', brand: 'Babolat', name: 'Xcel', sport: 'Squash', gauge: 1.25, style: 'All-round', colors: ['White'], price: 1000, mrp: null, photos: packs('babolat-xcel-squash', ['White']) },
];

export const findString = (slug: string) => racketStrings.find((s) => s.slug === slug);

/** Who each string type suits, in plain words for the brand pages. */
export const styleBestFor: Record<PlayStyle, string> = {
  Power: 'Smashes and attacking play',
  Control: 'Touch, net play and placement',
  Durability: 'Frequent play, fewer breaks',
  'All-round': 'A bit of everything',
};

export type PacketPhoto = { src: string; alt: string; slug: string; color: StringColor };

/**
 * One brand's strings (cheapest first), lowest price, every colour in stock (catalogue colour order)
 * and every packet photo, one per string first so a short list still shows each string.
 */
export function brandStrings(brand: string) {
  const list = racketStrings.filter((s) => s.brand === brand).sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  const prices = list.flatMap((s) => (s.price !== null ? [s.price] : []));
  const inStock = new Set(list.flatMap((s) => s.colors));
  const colors = (Object.keys(stringColors) as StringColor[]).filter((c) => inStock.has(c));
  const all: PacketPhoto[] = list.flatMap((s) =>
    s.colors.flatMap((c) => (s.photos?.[c] ? [{ src: s.photos[c]!, alt: `${s.brand} ${s.name}, ${c}`, slug: s.slug, color: c }] : [])),
  );
  const firsts = list.flatMap((s) => all.find((p) => p.slug === s.slug) ?? []);
  const photos = [...firsts, ...all.filter((p) => !firsts.includes(p))];
  return { list, from: prices.length ? Math.min(...prices) : null, colors, photos };
}

export type Ratings = { power: number; control: number; durability: number };

/**
 * Rough 1–5 ratings for the comparison table, worked out from gauge (compared with other strings
 * for the same sport) and play style. A guide only, not manufacturer figures.
 */
export function stringRatings(s: RacketString): Ratings {
  const gauges = racketStrings.filter((x) => x.sport === s.sport).map((x) => x.gauge);
  const [min, max] = [Math.min(...gauges), Math.max(...gauges)];
  const thickness = max > min ? (s.gauge - min) / (max - min) : 0.5; // 0 = thinnest, 1 = thickest
  const clamp = (n: number) => Math.max(1, Math.min(5, Math.round(n)));
  return {
    power: clamp(1 + (1 - thickness) * 3 + (s.style === 'Power' ? 1 : 0)),
    control: clamp(2 + (s.style === 'Control' ? 2 : s.style === 'All-round' ? 1 : 0) + (thickness > 0.25 && thickness < 0.9 ? 1 : 0)),
    durability: clamp(1 + thickness * 3 + (s.style === 'Durability' ? 1 : 0)),
  };
}

/** Most strings the comparison table shows side by side. */
export const MAX_COMPARE = 4;
