import Image from 'next/image';
import { ChartNoAxesColumn, Target, Zap } from 'lucide-react';
import { photos } from '@/lib/business';
import WhatsAppCTA from './WhatsAppCTA';
import { Accent, Eyebrow } from './Section';

const points = [
  { icon: Target, label: 'More Control' },
  { icon: Zap, label: 'More Power' },
  { icon: ChartNoAxesColumn, label: 'Better Durability' },
];

/**
 * Wide split banner: light copy panel on the left (~48%), dark racket photo on the right (~52%)
 * behind a diagonal edge. Stacks copy above photo below 1024px.
 */
export default function ExpertAdviceBanner() {
  return (
    <section aria-labelledby="advice-heading" className="container-site">
      <div className="relative overflow-hidden rounded-2xl bg-paper shadow-card ring-1 ring-line">
        {/* Copy side */}
        {/* Extra right padding at 1024–1279px keeps the copy clear of the diagonal edge */}
        <div className="relative px-6 py-7 sm:p-10 lg:w-[48%] lg:py-12 lg:pl-8 lg:pr-12 xl:px-10">
          <Eyebrow>Not sure which string?</Eyebrow>
          {/* Always two lines: on small phones and from 1024px (half-width panel) the size follows the viewport so each line fits. */}
          <h2 id="advice-heading" className="text-section mt-2 text-navy-700 max-sm:text-[length:min(1.75rem,7.2vw)] lg:text-[length:min(2.75rem,3.6vw)]">
            <span className="block">Find Your Ideal</span>
            <Accent>String &amp; Tension</Accent>
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-ink-muted sm:text-lg">
            Tell us your playing style and we’ll recommend the best string and tension for you.
          </p>
          <WhatsAppCTA
            className="mt-6"
            label="Chat with Us on WhatsApp"
            enquiryPhrase="advice on the right string and tension for my playing style"
          />
        </div>
        {/* Photo side: the diagonal runs from 52% of the banner width at the top to 43% at the bottom */}
        <div className="on-navy bg-navy-deep relative h-60 sm:h-64 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[57%] lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]">
          {photos.hero.src ? (
            <Image src={photos.hero.src} alt="" fill sizes="(min-width: 1280px) 700px, (min-width: 1024px) 57vw, 100vw" className="object-cover object-[85%_30%]" />
          ) : (
            <div aria-hidden="true" className="string-grid absolute inset-0" />
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,23,43,0.1)_0%,rgba(6,23,43,0.75)_100%)]" />
          {/* One row at every width: icon above label on phones, beside it from 640px */}
          <ul className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 p-4 sm:flex sm:items-center sm:justify-center sm:gap-6 sm:p-5 lg:justify-end lg:p-8">
            {points.map((p) => (
              <li key={p.label} className="flex flex-col items-center gap-1 text-center text-xs font-bold text-white sm:flex-row sm:gap-2.5 sm:text-left sm:text-sm">
                <span className="flex size-9 items-center justify-center text-green-deep sm:size-10">
                  <p.icon aria-hidden="true" className="size-7 sm:size-8" strokeWidth={1.75} />
                </span>
                {p.label}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
