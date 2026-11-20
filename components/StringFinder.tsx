'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, CalendarClock, Gauge, MessageCircle, RotateCcw, TriangleAlert } from 'lucide-react';
import { business, formatPrice } from '@/lib/business';
import { questions, recommendStrings, recommendTension, restringInterval, type Answers } from '@/lib/stringFinder';
import { buildWhatsAppUrlForMessage } from '@/lib/whatsapp';
import StringVisual from './StringVisual';

/** One question per step; picking an option moves on. The last step shows string picks and a tension range. */
export default function StringFinder() {
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [step, setStep] = useState(0);
  const done = step >= questions.length;

  const pick = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };
  const restart = () => { setAnswers({}); setStep(0); };

  if (done) return <Results answers={answers as Answers} onBack={() => setStep(questions.length - 1)} onRestart={restart} />;

  const q = questions[step];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-sm font-semibold text-ink-muted">
        <span>Question {step + 1} of {questions.length}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="inline-flex min-h-11 items-center gap-1.5 hover:text-ink">
            <ArrowLeft aria-hidden="true" className="size-4" /> Back
          </button>
        )}
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-card" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={step} aria-label="Progress">
        <div className="h-full rounded-full bg-lime transition-[width] duration-300" style={{ width: `${(step / questions.length) * 100}%` }} />
      </div>

      <fieldset key={q.key} className="animate-rise mt-8">
        <legend className="font-display text-2xl font-extrabold uppercase text-navy-900 sm:text-3xl">{q.title}</legend>
        {q.hint && <p className="mt-2 text-ink-muted">{q.hint}</p>}
        <div className="mt-6 grid gap-3">
          {q.options.map((o) => {
            const selected = answers[q.key] === o.value;
            return (
              <label
                key={o.value}
                className={`flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-xl border-2 bg-white px-5 py-4 transition-colors hover:border-green-heading has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-navy-700 ${selected ? 'border-green-heading bg-green-heading/5' : 'border-line'}`}
              >
                <input type="radio" name={q.key} value={o.value} checked={selected} onChange={() => pick(q.key, o.value)} className="sr-only" />
                <span>
                  <span className="block font-semibold text-ink">{o.label}</span>
                  {o.detail && <span className="mt-0.5 block text-sm text-ink-muted">{o.detail}</span>}
                </span>
                <span aria-hidden="true" className={`size-5 shrink-0 rounded-full border-2 ${selected ? 'border-[6px] border-green-heading' : 'border-ink/30'}`} />
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function Results({ answers, onBack, onRestart }: { answers: Answers; onBack: () => void; onRestart: () => void }) {
  const picks = recommendStrings(answers);
  const tension = recommendTension(answers);
  const range = `${tension.low}–${tension.high} lbs`;

  const message = (stringName: string) =>
    `Hello ${business.name}, I used the string finder on your website. I would like my badminton racket restrung with ${stringName} at ${range}. Please share the price and when it can be ready.`;

  return (
    <div className="animate-rise">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="on-navy bg-navy-hero rounded-2xl p-6 text-white sm:p-8">
          <p className="eyebrow text-green-deep">Your tension</p>
          <p className="mt-2 flex items-center gap-3 font-display text-4xl font-extrabold sm:text-5xl">
            <Gauge aria-hidden="true" className="size-10 text-lime" /> {range}
          </p>
          <p className="mt-3 text-on-navy-muted">
            {answers.level === 'beginner'
              ? 'A lower tension gives a bigger sweet spot and easier power while your technique develops.'
              : answers.level === 'advanced'
                ? 'A higher tension gives sharper control, as long as your swing is fast enough to load the string.'
                : 'A middle range that balances power and control for regular club play.'}
          </p>
          {tension.capped && <p className="mt-3 text-sm text-on-navy-muted">Kept within your racket&apos;s maximum so the frame stays safe.</p>}
          {answers.maxTension === 'unknown' && (
            <p className="mt-4 flex gap-2 rounded-lg bg-white/10 p-3 text-sm">
              <TriangleAlert aria-hidden="true" className="size-5 shrink-0 text-lime" />
              Check your racket&apos;s maximum tension before stringing. Bring it in and we will check it for you.
            </p>
          )}
          <Link href="/tension-guide" className="mt-4 inline-block text-sm font-semibold text-lime hover:underline">How tension changes your game →</Link>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
          <p className="eyebrow text-ink-muted">Restring</p>
          <p className="mt-2 flex items-center gap-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            <CalendarClock aria-hidden="true" className="size-9 text-green-heading" /> {restringInterval(answers)}
          </p>
          <p className="mt-3 text-ink-muted">
            Strings lose tension even when they don&apos;t break. Restringing on time keeps your shots consistent.
          </p>
        </div>
      </div>

      <h2 className="text-section mt-12 text-navy-700">Strings we suggest</h2>
      <ol className="mt-6 grid gap-6 md:grid-cols-3">
        {picks.map((s, i) => {
          const name = `${s.brand} ${s.name}`;
          const href = buildWhatsAppUrlForMessage(message(name));
          return (
            <li key={s.slug} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
              <div className="relative flex aspect-[4/3] items-center justify-center rounded-xl bg-white">
                <span className="absolute left-0 top-0 z-10 rounded bg-navy-950 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white">
                  {i === 0 ? 'Best match' : `Option ${i + 1}`}
                </span>
                <StringVisual s={s} color={s.colors[0]} sizes="(min-width: 768px) 30vw, 90vw" />
              </div>
              <h3 className="mt-3 font-display text-xl font-extrabold normal-case text-navy-950">{name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{s.style} · {s.gauge.toFixed(2)} mm</p>
              <p className="mt-2 font-semibold text-ink">{s.price !== null ? formatPrice(s.price) : 'Price on enquiry'}</p>
              <div className="mt-auto flex flex-col gap-2 pt-5">
                {href && (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-11 px-4 py-2 text-sm">
                    <MessageCircle aria-hidden="true" className="size-4" /> Book on WhatsApp
                    <span className="sr-only"> with {name} at {range} (opens WhatsApp in a new tab)</span>
                  </a>
                )}
                <Link href={`/contact?string=${s.slug}&tension=${tension.low + 1}#book`} className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
                  Choose colour &amp; book<span className="sr-only"> {name}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={onBack} className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
          <ArrowLeft aria-hidden="true" className="size-4" /> Change last answer
        </button>
        <button type="button" onClick={onRestart} className="btn-secondary-light min-h-11 px-4 py-2 text-sm">
          <RotateCcw aria-hidden="true" className="size-4" /> Start again
        </button>
        <Link href={`/strings/compare?ids=${picks.map((s) => s.slug).join(',')}`} className="btn-secondary-light min-h-11 px-4 py-2 text-sm">Compare these {picks.length}</Link>
        <Link href="/strings" className="btn-secondary-light min-h-11 px-4 py-2 text-sm">Browse all strings</Link>
      </div>
    </div>
  );
}
