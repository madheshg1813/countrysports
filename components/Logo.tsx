import Image from 'next/image';

/**
 * Country Sports logo (shuttle, racket and name). Its navy outline matches the navy header and
 * footer, so only the white, lime and racket details show. Size it with a height class; the width follows.
 */
export default function Logo({ className = 'h-10 lg:h-12' }: { className?: string }) {
  return (
    <Image
      src="/images/country-sports-logo.webp"
      alt="Country Sports Racket Care"
      // Display size at 48px tall (source is 1200 × 293); Next.js serves 1x/2x versions from it.
      width={197}
      height={48}
      loading="eager"
      className={`w-auto ${className}`}
    />
  );
}
