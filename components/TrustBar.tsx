import { ReceiptIndianRupee, SlidersHorizontal, Store, Timer, type LucideIcon } from 'lucide-react';

/**
 * Each icon sits in a solid dark-green circle, drawn in white. Labels are only
 * claims the business can back up (see lib/business.ts).
 */
const items: { icon: LucideIcon; label: [string, string] }[] = [
  { icon: SlidersHorizontal, label: ['Your String,', 'Your Tension'] },
  { icon: ReceiptIndianRupee, label: ['Clear', 'Pricing'] },
  { icon: Store, label: ['Walk-in', 'Shop'] },
  { icon: Timer, label: ['Quick', 'Turnaround'] },
];

export default function TrustBar() {
  return (
    <section aria-label="Why choose us" className="container-site">
      <ul className="grid grid-cols-2 gap-y-6 rounded-xl bg-paper px-4 py-6 ring-1 ring-line sm:px-8 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label.join(' ')} className="flex items-center justify-center gap-3 sm:gap-4">
            <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-heading text-white sm:size-12">
              <item.icon className="size-6" />
            </span>
            <span className="text-sm font-bold leading-tight text-ink">
              {item.label[0]}<br />{item.label[1]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
