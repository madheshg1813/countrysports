import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

/** Round WhatsApp button pinned to the bottom-right on phones, so booking is always one tap away. Hidden from 768px. */
export default function FloatingWhatsApp() {
  const href = buildWhatsAppUrl();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 md:hidden"
    >
      <MessageCircle aria-hidden="true" className="size-7" strokeWidth={2.25} />
      <span className="sr-only">Chat with us on WhatsApp (opens in a new tab)</span>
    </a>
  );
}
