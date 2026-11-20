import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUp, TriangleAlert } from 'lucide-react';
import CTABand from '@/components/CTABand';
import { Accent, PageHero, SectionHeading } from '@/components/Section';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { business } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';
import { tensionLevels } from '@/lib/stringFinder';

export const metadata: Metadata = {
  title: 'Badminton String Tension Guide',
  description: `Which badminton string tension should you choose? Beginner, club and advanced tension ranges in lbs, what higher and lower tension changes, and your racket's maximum. From ${business.name}, Velachery, Chennai.`,
  alternates: canonical('/tension-guide'),
  openGraph: openGraph('/tension-guide', `Tension Guide | ${business.name}`),
};

/** The lbs scale drawn behind the range bars. */
const SCALE = { min: 18, max: 30 };
const ticks = Array.from({ length: (SCALE.max - SCALE.min) / 2 + 1 }, (_, i) => SCALE.min + i * 2);
const pct = (lbs: number) => ((lbs - SCALE.min) / (SCALE.max - SCALE.min)) * 100;

const effects = [
  {
    icon: ArrowUp,
    title: 'Higher tension',
    points: ['More control and a crisper feel', 'Smaller sweet spot: off-centre hits lose power', 'Needs a fast, clean swing to get length', 'Strings break sooner and frames take more stress'],
  },
  {
    icon: ArrowDown,
    title: 'Lower tension',
    points: ['More repulsion: easier length for less effort', 'Bigger, more forgiving sweet spot', 'Softer on the arm and shoulder', 'Less precise for fast, flat exchanges'],
  },
];

const adjustments = [
  ['You play attacking, smash-heavy badminton', 'Try 1 lb higher'],
  ['Your strings break often', 'Try 1 lb lower, or a thicker string'],
  ['Shuttles keep falling short at the back', 'Try 1–2 lbs lower'],
  ['Shuttles fly long or feel hard to control', 'Try 1 lb higher'],
  ['You have arm or elbow pain', 'Go lower and talk to us first'],
];

export default function TensionGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Tension Guide"
        title={<>Pick the right <span className="text-green-deep">tension</span></>}
        intro="Tension changes how your racket feels more than almost anything else. Start from your level, adjust for how you play, and never go above your racket's maximum."
      >
        <Link href="/string-finder" className="btn-primary">Get my personal range</Link>
        <WhatsAppCTA variant="secondary-dark" label="Ask on WhatsApp" enquiryPhrase="advice on the right tension for my racket" />
      </PageHero>

      <section aria-labelledby="ranges-heading" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            id="ranges-heading"
            eyebrow="Starting points"
            title={<>Tension by <Accent>level</Accent></>}
            intro="Ranges in lbs. They are starting points, not rules: we fine-tune from here once we know how you play."
          />

          <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <div aria-hidden="true" className="relative ml-0 h-6 sm:ml-40">
              {ticks.map((t) => (
                <span key={t} className="absolute -translate-x-1/2 text-xs font-semibold text-ink-muted" style={{ left: `${pct(t)}%` }}>{t}</span>
              ))}
            </div>
            <ul className="mt-2 space-y-5">
              {tensionLevels.map((l, i) => (
                <li key={l.level} className="grid items-center gap-2 sm:grid-cols-[10rem_1fr]">
                  <p className="font-display text-sm font-extrabold uppercase text-navy-900">{l.label}</p>
                  <div className="relative h-10 rounded-full bg-paper">
                    {ticks.map((t) => (
                      <span key={t} aria-hidden="true" className="absolute inset-y-2 w-px bg-line" style={{ left: `${pct(t)}%` }} />
                    ))}
                    <span
                      className={`absolute inset-y-1 flex items-center justify-center rounded-full text-sm font-bold ${['bg-green-deep/80 text-white', 'bg-green-heading text-white', 'bg-navy-900 text-white'][i]}`}
                      style={{ left: `${pct(l.low)}%`, width: `${pct(l.high) - pct(l.low)}%` }}
                    >
                      {l.low}–{l.high} lbs
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {tensionLevels.map((l) => (
              <li key={l.level} className="rounded-2xl border border-line bg-paper p-6">
                <p className="eyebrow text-navy-700">{l.label}</p>
                <p className="mt-2 font-display text-3xl font-extrabold text-navy-950">{l.low}–{l.high} <span className="text-lg">lbs</span></p>
                <p className="mt-3 text-ink"><span className="font-semibold">Who:</span> {l.who}</p>
                <p className="mt-2 text-ink-muted"><span className="font-semibold text-ink">Feel:</span> {l.feel}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="effects-heading" className="bg-paper py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading id="effects-heading" eyebrow="What changes" title={<>Higher or <Accent>lower?</Accent></>} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {effects.map(({ icon: Icon, title, points }) => (
              <div key={title} className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
                <h3 className="flex items-center gap-3 font-display text-xl font-extrabold uppercase text-navy-950">
                  <span className="flex size-10 items-center justify-center rounded-full bg-green-heading text-white"><Icon aria-hidden="true" className="size-5" /></span>
                  {title}
                </h3>
                <ul className="mt-5 space-y-3 text-ink">
                  {points.map((p) => <li key={p} className="border-l-2 border-line pl-3">{p}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <table className="w-full text-left">
              <caption className="border-b border-line p-5 text-left font-display text-lg font-extrabold uppercase text-navy-900 sm:px-8">Quick adjustments</caption>
              <thead className="sr-only"><tr><th scope="col">If</th><th scope="col">Then</th></tr></thead>
              <tbody className="divide-y divide-line">
                {adjustments.map(([when, then]) => (
                  <tr key={when}>
                    <td className="p-4 text-ink sm:px-8">{when}</td>
                    <td className="p-4 font-semibold text-green-heading sm:px-8">{then}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="max-heading" className="py-16 sm:py-20">
        <div className="container-site">
          <div className="flex flex-col gap-6 rounded-3xl border-2 border-amber-400 bg-amber-50 p-6 sm:flex-row sm:p-10">
            <TriangleAlert aria-hidden="true" className="size-10 shrink-0 text-amber-600" />
            <div>
              <h2 id="max-heading" className="font-display text-2xl font-extrabold uppercase text-navy-950">Check your racket&apos;s maximum tension</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink">
                Every racket has a recommended tension range, usually printed on the shaft or the inside of the frame, for example
                &ldquo;20–28 lbs&rdquo;. Stringing above the top number puts extra stress on the frame and can lead to cracks.
              </p>
              <ul className="mt-4 space-y-2 text-ink">
                <li>• Tell us the maximum when you book, or bring the racket and we will check it.</li>
                <li>• If the range you want is above your racket&apos;s maximum, choose the maximum or a thinner, livelier string instead.</li>
                <li>• Old or previously repaired frames are best kept a little below their maximum.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={<>Know your <span className="text-green-deep">tension?</span></>}
        text="Send us your racket, string and tension on WhatsApp. Not sure? Tell us how you play and we will suggest a range before we start."
      />
    </>
  );
}
