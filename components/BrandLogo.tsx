import Image from 'next/image';

export type BrandLogoData = { src: string; width: number; height: number; wordmark?: boolean };

/**
 * A brand's logo as shown in the brand carousel and on the Brands page.
 * - Wordmark logos (they spell the name) show alone; the name stays for screen readers.
 *   Wide wordmarks fit a 168 × 28px box (keeping their shape); squarer files (padding built in) are sized by height.
 * - Symbol logos show beside the brand name; brands without a logo show the name alone.
 *   `stacked` puts the symbol above the name below 640px, for narrow tiles.
 */
export default function BrandLogo({ name, logo, stacked = false }: { name: string; logo?: BrandLogoData; stacked?: boolean }) {
  if (logo?.wordmark) {
    return (
      <>
        <Image
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          className={logo.width > 2 * logo.height ? 'h-auto max-h-7 w-auto max-w-[min(10.5rem,100%)]' : 'h-[4.75rem] w-auto scale-[1.2]'}
        />
        <span className="sr-only">{name}</span>
      </>
    );
  }
  return (
    <span className={`flex items-center ${stacked ? 'flex-col gap-1.5 sm:flex-row sm:gap-2.5' : 'gap-2.5'}`}>
      {logo && <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="h-9 w-auto rounded-md" />}
      <span className={`font-display font-extrabold uppercase italic tracking-tight text-navy-950 ${stacked ? 'text-lg sm:text-xl' : 'text-xl'}`}>{name}</span>
    </span>
  );
}
