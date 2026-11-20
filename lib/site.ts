import { business, photos } from './business';

/**
 * Production origin from NEXT_PUBLIC_SITE_URL (no trailing slash).
 * When unset, canonical links are omitted and localhost is used only as a
 * metadata base so local builds work.
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') || null;

export const SITE_URL: string | null = configured && /^https?:\/\//.test(configured) ? configured : null;

export const METADATA_BASE = new URL(SITE_URL ?? 'http://localhost:3000');

/** Canonical alternates for a path, only when the real domain is known. */
export function canonical(path: string) {
  return SITE_URL ? { canonical: path } : undefined;
}

/** Link preview image (WhatsApp, Facebook, X) for pages without a photo of their own. */
export const SHARE_IMAGE = { url: photos.hero.src!, width: photos.hero.width, height: photos.hero.height, alt: photos.hero.alt };

/**
 * Full Open Graph block for a page. Next.js replaces (not merges) the layout's openGraph
 * when a page sets its own, so every page goes through this to keep site name, type and image.
 */
export function openGraph(path: string, title: string, image: string | typeof SHARE_IMAGE = SHARE_IMAGE) {
  return { type: 'website' as const, siteName: business.name, locale: 'en_IN', url: path, title, images: [image] };
}
