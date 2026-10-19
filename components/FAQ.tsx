import { Plus } from 'lucide-react';
import { faqs } from '@/lib/faq';

/**
 * Native <details> accordion: keyboard accessible with no client JS. From 1024px the
 * questions split into two independent columns (first half left, second half right), so
 * opening one answer never stretches the card beside it. Smaller screens show one list in order.
 */
export default function FAQ() {
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-5">
      {columns.map((column, i) => (
        <div key={i} className="space-y-3">
          {column.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-line bg-white open:shadow-card">
              {/* Two-column layout: room for two lines on every card, so closed cards line up across the columns */}
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-5 py-4 text-left font-sans text-base font-semibold normal-case text-ink sm:px-6 sm:py-5 sm:text-lg lg:min-h-20 lg:py-4 lg:text-base [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card text-green-heading transition-colors group-open:bg-green-heading group-open:text-white">
                  <Plus aria-hidden="true" className="size-5 transition-transform group-open:rotate-45" />
                </span>
              </summary>
              <p className="px-5 pb-5 pr-16 leading-relaxed text-ink-muted sm:px-6 sm:pb-6">{item.a}</p>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
