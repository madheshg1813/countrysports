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
