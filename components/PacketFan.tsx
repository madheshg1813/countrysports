import Image from 'next/image';
import Link from 'next/link';
import type { PacketPhoto } from '@/lib/strings';

/** Most packets in one fan. */
const MAX = 4;
/**
 * Tilt and sideways shift for each packet, left to right. Packets overlap only slightly so every
 * packet's name stays readable; the fan opens a little wider when its card (`group`) is hovered.
 */
const poses = [
  'rotate-[-9deg] -translate-x-[114%] group-hover:-translate-x-[120%]',
  'rotate-[-3deg] -translate-x-[38%] group-hover:-translate-x-[40%]',
  'rotate-[3deg] translate-x-[38%] group-hover:translate-x-[40%]',
  'rotate-[9deg] translate-x-[114%] group-hover:translate-x-[120%]',
];

/**
 * The shop's packet photos fanned out on a navy panel; each packet links to its string page.
 * Sizes are a share of the panel width, so the fan fits any width. Give the panel its height.
 */
export default function PacketFan({ photos, className = '', priority = false }: { photos: PacketPhoto[]; className?: string; priority?: boolean }) {
  const shown = photos.slice(0, MAX);
  const start = (MAX - shown.length) >> 1; // centre a shorter fan

  return (
    <div className={`on-navy bg-navy-hero relative flex items-center justify-center overflow-hidden ${className}`}>
      <div aria-hidden="true" className="string-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/60 to-transparent" />
      {shown.map((p, i) => (
        <Link
          key={p.src}
          href={`/strings/${p.slug}?color=${encodeURIComponent(p.color)}`}
          className={`absolute aspect-square w-[29%] max-w-64 drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] transition-[translate,rotate,scale] duration-500 ease-out hover:z-10 hover:-translate-y-4 hover:rotate-0 hover:scale-110 focus-visible:z-10 ${poses[start + i]}`}
        >
          <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1280px) 256px, 29vw" priority={priority} className="object-contain" />
        </Link>
      ))}
    </div>
  );
}
