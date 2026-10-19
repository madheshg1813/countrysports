import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

type Variant = 'primary' | 'secondary-dark' | 'secondary-light';

interface WhatsAppCTAProps {
  /** Lower-case phrase inserted into the prefilled message, e.g. "grip replacement". */
  enquiryPhrase?: string;
  label?: string;
  /** Extra words for screen readers only, e.g. "about Grip Replacement" when several buttons share a short label. */
  srContext?: string;
  variant?: Variant;
  size?: 'sm' | 'md';
  icon?: boolean;
  trailingArrow?: boolean;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  'secondary-dark': 'btn-secondary-dark',
  'secondary-light': 'btn-secondary-light',
};

/**
 * Opens a WhatsApp enquiry in a new tab. Falls back to a phone link (or a
 * visible notice) when NEXT_PUBLIC_WHATSAPP_NUMBER is not configured.
 */
export default function WhatsAppCTA({
  enquiryPhrase,
  label = 'Enquire on WhatsApp',
  srContext,
  variant = 'primary',
  size = 'md',
  icon = true,
  trailingArrow = false,
  className = '',
}: WhatsAppCTAProps) {
  const href = buildWhatsAppUrl(enquiryPhrase);
  const cls = `${variantClass[variant]} ${size === 'sm' ? 'min-h-11 whitespace-nowrap px-4 py-2 text-sm' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon && <MessageCircle aria-hidden="true" className="size-5" />}
        {label}
        {srContext && <span className="sr-only"> {srContext}</span>}
        {trailingArrow && <ArrowRight aria-hidden="true" className="size-5" />}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </a>
    );
  }

  if (business.phone) {
    return (
      <a href={`tel:${business.phone.tel}`} className={cls}>
        <Phone aria-hidden="true" className="size-5" />
        Call {business.phone.display}
      </a>
    );
  }

  return (
    <p role="note" className={`${cls} cursor-default opacity-80`}>
      WhatsApp booking coming soon
    </p>
  );
}
