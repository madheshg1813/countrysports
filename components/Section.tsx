type Tone = 'light' | 'dark';

/** Accented words: dark green on navy backgrounds and on light backgrounds (headings themselves are navy). */
export function Accent({ children, tone = 'light' }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={tone === 'dark' ? 'text-green-deep' : 'text-green-heading'}>{children}</span>;
}

export function Eyebrow({ children, tone = 'light', className = '' }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return <p className={`eyebrow ${tone === 'dark' ? 'text-green-deep' : 'text-ink-muted'} ${className}`}>{children}</p>;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: Tone;
  id?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, intro, tone = 'light', id, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`text-section mt-2 ${tone === 'dark' ? 'text-white' : 'text-navy-700'}`}>{title}</h2>
      {intro && <p className={`mt-2 text-base leading-relaxed sm:text-lg ${tone === 'dark' ? 'text-on-navy-muted' : 'text-ink-muted'}`}>{intro}</p>}
    </div>
  );
}

/** Navy gradient header for inner pages. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="on-navy bg-navy-hero relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <div aria-hidden="true" className="string-grid absolute inset-y-0 right-0 w-1/2 opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="container-site relative">
        <Eyebrow tone="dark" className="animate-rise">{eyebrow}</Eyebrow>
        <h1 className="text-hero animate-rise mt-4 max-w-4xl">{title}</h1>
        <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-on-navy-muted [animation-delay:100ms]">{intro}</p>
        {children && <div className="animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:200ms]">{children}</div>}
      </div>
    </section>
  );
}
