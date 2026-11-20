import { racketStrings, type RacketString } from './strings';

/**
 * String & tension finder: turns a player's answers into string picks and a tension range.
 * Rules of thumb only; the shop confirms the final choice on WhatsApp.
 */

export type Answers = {
  level: 'beginner' | 'intermediate' | 'advanced';
  style: 'attack' | 'defence' | 'allround';
  format: 'singles' | 'doubles' | 'both';
  frequency: '1-2' | '3-4' | '5+';
  breaks: 'often' | 'sometimes' | 'rarely';
  /** The racket's maximum tension in lbs (printed on the shaft), or 'unknown'. */
  maxTension: 'unknown' | '24' | '26' | '28' | '30';
};

export type Question = { [K in keyof Answers]: { key: K; title: string; hint?: string; options: { value: Answers[K]; label: string; detail?: string }[] } }[keyof Answers];

export const questions: Question[] = [
  {
    key: 'level',
    title: 'How long have you been playing?',
    options: [
      { value: 'beginner', label: 'Beginner', detail: 'Under a year, or play casually' },
      { value: 'intermediate', label: 'Intermediate', detail: 'Regular club or league player' },
      { value: 'advanced', label: 'Advanced', detail: 'Tournament player or coached' },
    ],
  },
  {
    key: 'style',
    title: 'How do you like to play?',
    options: [
      { value: 'attack', label: 'Attacking', detail: 'Smashes, jump smashes, fast pushes' },
      { value: 'defence', label: 'Control & defence', detail: 'Net play, drops, placement' },
      { value: 'allround', label: 'All-round', detail: 'A bit of everything' },
    ],
  },
  {
    key: 'format',
    title: 'Singles or doubles?',
    options: [
      { value: 'singles', label: 'Mostly singles' },
      { value: 'doubles', label: 'Mostly doubles' },
      { value: 'both', label: 'Both' },
    ],
  },
  {
    key: 'frequency',
    title: 'How often do you play?',
    options: [
      { value: '1-2', label: '1–2 times a week' },
      { value: '3-4', label: '3–4 times a week' },
      { value: '5+', label: '5 or more times a week' },
    ],
  },
  {
    key: 'breaks',
    title: 'How often do your strings break?',
    options: [
      { value: 'often', label: 'Often', detail: 'Within a few weeks' },
      { value: 'sometimes', label: 'Sometimes', detail: 'Every month or two' },
      { value: 'rarely', label: 'Rarely', detail: 'They lose tension before they break' },
    ],
  },
  {
    key: 'maxTension',
    title: "What is your racket's maximum tension?",
    hint: 'It is usually printed on the shaft or frame, e.g. "20–28 lbs".',
    options: [
      { value: '24', label: 'Up to 24 lbs' },
      { value: '26', label: 'Up to 26 lbs' },
      { value: '28', label: 'Up to 28 lbs' },
      { value: '30', label: '30 lbs or more' },
      { value: 'unknown', label: "I don't know" },
    ],
  },
];

function score(s: RacketString, a: Answers) {
  let n = 0;
  const thick = s.gauge >= 0.68;
  const thin = s.gauge <= 0.65;

  if (a.style === 'attack') n += s.style === 'Power' ? 3 : s.style === 'All-round' ? 1 : 0;
  if (a.style === 'defence') n += s.style === 'Control' ? 3 : s.style === 'All-round' ? 1 : 0;
  if (a.style === 'allround') n += s.style === 'All-round' ? 3 : s.style === 'Durability' ? 0 : 1;

  if (a.breaks === 'often') n += (s.style === 'Durability' ? 4 : 0) + (thick ? 2 : 0) - (thin ? 3 : 0);
  if (a.breaks === 'sometimes') n += s.gauge >= 0.66 ? 1 : 0;
  if (a.breaks === 'rarely') n += thin ? 1 : 0;

  if (a.level === 'beginner') n += (s.style === 'Durability' ? 2 : 0) + (thick ? 1 : 0) - (s.gauge <= 0.62 ? 2 : 0);
  if (a.level === 'advanced') n += s.gauge <= 0.66 ? 1 : 0;

  if (a.format === 'doubles') n += (s.style === 'Power' ? 1 : 0) + (s.gauge <= 0.66 ? 1 : 0);
  if (a.frequency === '5+' && s.style === 'Durability') n += 1;
  return n;
}

/** Top three badminton strings for these answers (cheaper first on a tie). */
export function recommendStrings(a: Answers): RacketString[] {
  return racketStrings
    .filter((s) => s.sport === 'Badminton')
    .map((s) => ({ s, n: score(s, a) }))
    .sort((x, y) => y.n - x.n || (x.s.price ?? Infinity) - (y.s.price ?? Infinity))
    .slice(0, 3)
    .map((x) => x.s);
}

/** Starting tension range (lbs) per playing level: used by the finder and the tension guide page. */
export const tensionLevels: { level: Answers['level']; label: string; low: number; high: number; who: string; feel: string }[] = [
  { level: 'beginner', label: 'Beginner', low: 20, high: 22, who: 'New players, casual and weekend games, juniors', feel: 'Forgiving, with a big sweet spot and easy length on clears' },
  { level: 'intermediate', label: 'Club player', low: 23, high: 25, who: 'Regular club and league players with a full swing', feel: 'A balance of power and control' },
  { level: 'advanced', label: 'Advanced', low: 26, high: 28, who: 'Tournament and coached players with fast racket speed', feel: 'Crisp and precise, but needs a strong, clean swing' },
];

/** Suggested tension range in lbs, kept within the racket's maximum. */
export function recommendTension(a: Answers): { low: number; high: number; capped: boolean } {
  let { low, high } = tensionLevels.find((l) => l.level === a.level)!;
  if (a.style === 'attack' && a.level !== 'beginner') { low += 1; high += 1; }
  if (a.breaks === 'often') { low -= 1; high -= 1; }
  const max = a.maxTension === 'unknown' ? null : Number(a.maxTension);
  const capped = max !== null && high > max;
  if (max !== null) { high = Math.min(high, max); low = Math.min(low, high - 2); }
  return { low, high, capped };
}

export function restringInterval(a: Answers) {
  return a.frequency === '1-2' ? 'every 3–4 months' : a.frequency === '3-4' ? 'every 1–2 months' : 'every 2–4 weeks';
}
