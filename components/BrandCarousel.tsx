'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import BrandLogo, { type BrandLogoData } from './BrandLogo';

/**
 * Brand tiles that glide sideways in an endless loop, with no visible controls. The glide pauses
 * on mouse hover, while a finger is on the strip, while the strip has keyboard focus (Tab to it,
 * then arrow keys scroll it; this is the keyboard pause for WCAG 2.2.2) and for a moment after
 * any manual scroll. Visitors who prefer reduced motion see a still strip they can scroll.
 */
type Tile = { name: string; sub?: string; logo?: BrandLogoData };

/** Glide speed in pixels per second. */
const SPEED = 60;
/** How long the glide waits after a swipe, trackpad or keyboard scroll before carrying on (ms). */
const RESUME_DELAY = 2500;
/** The tiles are rendered three times so the loop can wrap without a visible jump. */
const COPIES = 3;

/** Width of one set of tiles, including the gap before the next set: scrolling by this much looks identical. */
function loopWidth(track: HTMLUListElement, count: number) {
  const first = track.children[0] as HTMLElement | undefined;
  const nextSet = track.children[count] as HTMLElement | undefined;
  return first && nextSet ? nextSet.offsetLeft - first.offsetLeft : 0;
}

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

export default function BrandCarousel({ items }: { items: Tile[] }) {
  const track = useRef<HTMLUListElement>(null);
  /** Reasons to hold the glide still: mouse over the strip, a finger on it, keyboard focus on it. */
  const hold = useRef({ hover: false, touch: false, focus: false });
  /** performance.now() time before which the glide stays put. */
  const resumeAt = useRef(0);

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);
  const playing = !reducedMotion;

  // Start on the middle copy so the strip can be swiped either way from the start.
  useEffect(() => {
    const el = track.current;
    if (el) el.scrollLeft = loopWidth(el, items.length);
  }, [items.length]);

  useEffect(() => {
    const el = track.current;
    if (!playing || !el) return;

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
      // Moved by the visitor (swipe, trackpad, keyboard): follow them and wait before gliding again.
      if (Math.abs(el.scrollLeft - pos) > 2) {
        pos = el.scrollLeft;
        resumeAt.current = now + RESUME_DELAY;
      }
      const { hover, touch, focus } = hold.current;
      if (!visible || hover || touch || focus || now < resumeAt.current) return;
      const loop = loopWidth(el, items.length);
      if (2 * loop > el.scrollWidth - el.clientWidth) return; // too few tiles to reach the wrap point
      pos += (SPEED * dt) / 1000;
      if (pos >= 2 * loop) pos -= loop;
      el.scrollLeft = pos;
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [playing, items.length]);

  const releaseTouch = () => {
    hold.current.touch = false;
    resumeAt.current = performance.now() + RESUME_DELAY; // let momentum scrolling finish
  };

  return (
    <ul
      ref={track}
      aria-label="String brands"
      // Focusable so keyboard users can stop the motion and scroll with the arrow keys.
      tabIndex={0}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') hold.current.hover = true; }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') hold.current.hover = false; }}
      onTouchStart={() => { hold.current.touch = true; }}
      onTouchEnd={releaseTouch}
      onTouchCancel={releaseTouch}
      onFocus={() => { hold.current.focus = true; }}
      onBlur={() => { hold.current.focus = false; }}
      className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {Array.from({ length: COPIES }).flatMap((_, copy) =>
        items.map((b) => (
          <li
            key={`${copy}-${b.name}`}
            // Only the first set is announced; the copies exist for the seamless loop.
            aria-hidden={copy > 0 || undefined}
            // Equal-width slots with no box, so logos sit straight on the page and stay evenly spaced.
            className="relative flex h-20 w-48 shrink-0 flex-col items-center justify-center overflow-hidden px-3 text-center sm:w-52"
          >
            <BrandLogo name={b.name} logo={b.logo} />
            {/* With a logo the brand is already shown, so the brand caption is for screen readers only */}
            {b.sub && <span className={b.logo ? 'sr-only' : 'mt-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted'}>{b.sub}</span>}
          </li>
        )),
      )}
    </ul>
  );
}
