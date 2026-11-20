'use client';

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Cards that glide slowly to the left in an endless loop, with previous/next buttons and native
 * swipe. The glide pauses on mouse hover, while a finger is on the row, while a card has keyboard
 * focus and for a moment after any manual scroll. Visitors who prefer reduced motion get a still
 * row they can scroll.
 */

/** Glide speed in pixels per second. */
const SPEED = 30;
/** How long the glide waits after a swipe, button press or keyboard scroll before carrying on (ms). */
const RESUME_DELAY = 2500;
/** The cards are rendered three times so the loop can wrap without a visible jump. */
const COPIES = 3;

/** Width of one set of cards, including the gap before the next set: scrolling by this much looks identical. */
function loopWidth(track: HTMLUListElement, count: number) {
  const first = track.children[0] as HTMLElement | undefined;
  const nextSet = track.children[count] as HTMLElement | undefined;
  return first && nextSet ? nextSet.offsetLeft - first.offsetLeft : 0;
}

/** Card width plus gap. */
function cardStep(track: HTMLUListElement) {
  const [a, b] = [track.children[0], track.children[1]] as (HTMLElement | undefined)[];
  return a && b ? b.offsetLeft - a.offsetLeft : track.clientWidth;
}

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

export default function ShowcaseCarousel({ cards, label }: { cards: ReactNode[]; label: string }) {
  const n = cards.length;
  const track = useRef<HTMLUListElement>(null);
  /** Reasons to hold the glide still: mouse over the row, a finger on it, keyboard focus in it. */
  const hold = useRef({ hover: false, touch: false, focus: false });
  /** performance.now() time before which the glide stays put. */
  const resumeAt = useRef(0);

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);

  // Start on the middle copy so the row can be swiped either way from the start.
  useEffect(() => {
    const el = track.current;
    if (el) el.scrollLeft = loopWidth(el, n);
  }, [n]);

  useEffect(() => {
    const el = track.current;
    if (reducedMotion || !el) return;

    let frame = 0;
    let last = 0;
    let pos = el.scrollLeft; // kept as a float: browsers may round scrollLeft to whole pixels
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(el);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(now - (last || now), 50); // clamp so a backgrounded tab doesn't leap ahead
      last = now;
      const loop = loopWidth(el, n);
      // Moved by the visitor (swipe, button, keyboard): follow them and wait before gliding again.
      if (Math.abs(el.scrollLeft - pos) > 2) {
        pos = el.scrollLeft;
        resumeAt.current = now + RESUME_DELAY;
      }
      const { hover, touch, focus } = hold.current;
      if (!visible || hover || touch || focus || now < resumeAt.current) {
        // Keep a manual scroll inside the middle copy so the loop never runs out.
        if (loop && now >= resumeAt.current - RESUME_DELAY + 600) {
          if (pos >= 2 * loop) el.scrollLeft = pos -= loop;
          else if (pos < loop) el.scrollLeft = pos += loop;
        }
        return;
      }
      if (2 * loop > el.scrollWidth - el.clientWidth) return; // too few cards to reach the wrap point
      pos += (SPEED * dt) / 1000;
      if (pos >= 2 * loop) pos -= loop;
      el.scrollLeft = pos;
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reducedMotion, n]);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    resumeAt.current = performance.now() + RESUME_DELAY;
    el.scrollBy({ left: dir * cardStep(el), behavior: 'smooth' });
  };

  const releaseTouch = () => {
    hold.current.touch = false;
    resumeAt.current = performance.now() + RESUME_DELAY; // let momentum scrolling finish
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') hold.current.hover = true; }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') hold.current.hover = false; }}
      onFocus={() => { hold.current.focus = true; }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hold.current.focus = false; }}
    >
      <ul
        ref={track}
        onTouchStart={() => { hold.current.touch = true; }}
        onTouchEnd={releaseTouch}
        onTouchCancel={releaseTouch}
        className="-my-4 flex gap-6 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          cards.map((card, i) => (
            <li
              key={`${copy}-${i}`}
              // Only the middle set is announced; the other copies exist for the seamless loop.
              aria-hidden={copy !== 1 || undefined}
              className="w-[85%] shrink-0 sm:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-3rem)/3)]"
            >
              {card}
            </li>
          )),
        )}
      </ul>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={() => nudge(-1)} aria-label="Previous brand" className="grid size-11 place-items-center rounded-full border-2 border-line bg-white text-ink transition-colors hover:border-green-heading hover:text-green-heading">
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button type="button" onClick={() => nudge(1)} aria-label="Next brand" className="grid size-11 place-items-center rounded-full border-2 border-line bg-white text-ink transition-colors hover:border-green-heading hover:text-green-heading">
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
