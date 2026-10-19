import { business } from './business';

/**
 * WhatsApp click-to-chat helpers.
 * Format: https://wa.me/<number>?text=<url-encoded message>
 * The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER: full international
 * format, digits only (no "+", spaces or punctuation).
 */

export function getWhatsAppNumber(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? '';
  // E.164 allows up to 15 digits; anything else is treated as "not configured".
  return /^[1-9]\d{7,14}$/.test(raw) ? raw : null;
}

export function buildWhatsAppMessage(enquiryPhrase = 'badminton racket restringing'): string {
  return `Hello ${business.name}, I would like to enquire about ${enquiryPhrase}. Please share the price, available options, and expected turnaround time.`;
}

/** Returns null when no valid number is configured, so callers can show a fallback. */
export function buildWhatsAppUrl(enquiryPhrase?: string): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(enquiryPhrase))}`;
}
