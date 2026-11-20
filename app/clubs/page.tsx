import type { Metadata } from 'next';
import { Building2, ClipboardList, GraduationCap, Trophy, Users } from 'lucide-react';
import ClubEnquiryForm from '@/components/ClubEnquiryForm';
import CTABand from '@/components/CTABand';
import { Accent, PageHero, SectionHeading } from '@/components/Section';
import { business } from '@/lib/business';
import { canonical, openGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bulk Racket Stringing for Clubs & Academies',
  description: `Bulk badminton racket restringing for coaching academies, clubs, schools and company teams at ${business.name}, Velachery, Chennai. Ask for a batch price on WhatsApp.`,
  alternates: canonical('/clubs'),
  openGraph: openGraph('/clubs', `Clubs & Academies | ${business.name}`),
};

const audiences = [
  { icon: GraduationCap, title: 'Coaching academies', text: 'Regular batches for your trainees, with each player’s tension kept the same every time.' },
  { icon: Trophy, title: 'Clubs & leagues', text: 'Get the whole team’s rackets ready before a tournament or league night.' },
  { icon: Users, title: 'Schools & colleges', text: 'Stringing for school sports kits and college teams.' },
  { icon: Building2, title: 'Company teams', text: 'Rackets for office sports days and corporate tournaments.' },
];

const steps = [
  ['Send your details', 'Use the form to tell us how many rackets, how often and which strings.'],
  ['Get a batch price', 'We reply on WhatsApp with a price for the whole batch and when it will be ready.'],
  ['Drop off with a list', 'Bring the rackets with each player’s name, string and tension.'],
  ['Collect together', 'Pick up the whole batch at once, strung to each player’s list.'],
];

export default function ClubsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clubs & Academies"
        title={<>Bulk stringing for <span className="text-green-deep">teams</span></>}
        intro="One price for the whole batch, each racket strung to its player's tension. Tell us what you need and we will send a quote on WhatsApp."
      >
        <a href="#enquire" className="btn-primary">Get a batch quote</a>
      </PageHero>

      <section aria-labelledby="who-heading" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading id="who-heading" eyebrow="Who it's for" title={<>Made for <Accent>groups</Accent></>} />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="flex size-12 items-center justify-center rounded-full bg-green-heading text-white"><Icon aria-hidden="true" className="size-6" /></span>
                <h3 className="mt-4 font-display text-lg font-extrabold uppercase text-navy-950">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="bg-paper py-16 sm:py-20">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="how-heading"
              eyebrow="How it works"
              title={<>Four simple <Accent>steps</Accent></>}
              intro="Batch prices depend on how many rackets and which strings, so we quote each group directly."
            />
            <ol className="mt-8 space-y-5">
              {steps.map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-base font-extrabold uppercase text-navy-950">{title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-ink">
              <ClipboardList aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green-heading" />
              Tip: keep a simple list of player name, racket, string and tension. Send it with your enquiry and every batch is quicker.
            </p>
          </div>
          <ClubEnquiryForm />
        </div>
      </section>

      <CTABand
        title={<>Questions about <span className="text-green-deep">bulk orders?</span></>}
        text="Message us with your academy or club name and roughly how many rackets. We will reply with options and a price."
      />
    </>
  );
}
