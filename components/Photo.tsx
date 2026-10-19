import Image from 'next/image';
import type { Photo as PhotoData } from '@/lib/business';

interface PhotoProps {
  photo: PhotoData;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Rendered instead of the default placeholder art when no photo is supplied. */
  fallback?: React.ReactNode;
}

/**
 * Real photo via next/image, or navy string-bed placeholder art until the
 * shop's own photos are supplied. Aspect ratio is reserved either way (no CLS).
 */
export default function Photo({ photo, sizes, priority = false, className = '', fallback }: PhotoProps) {
  const ratio = { aspectRatio: `${photo.width} / ${photo.height}` };

  if (photo.src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={ratio}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo to be added: ${photo.alt}`}
      data-placeholder="photo"
      className={`bg-navy-deep relative overflow-hidden ${className}`}
      style={ratio}
    >
      {fallback ?? <div aria-hidden="true" className="string-grid absolute inset-0" />}
    </div>
  );
}
