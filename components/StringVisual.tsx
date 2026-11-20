import Image from 'next/image';
import { stringColors, stringPhoto, type RacketString, type StringColor } from '@/lib/strings';
import StringCoil from './StringCoil';

/** The shop's packet photo for this colour, or the drawn coil when there is no photo yet. Fills its (relative) parent. */
export default function StringVisual({ s, color, sizes, priority = false }: { s: RacketString; color: StringColor; sizes: string; priority?: boolean }) {
  const src = stringPhoto(s, color);
  if (!src) return <StringCoil color={stringColors[color]} />;
  return (
    <Image
      src={src}
      alt={`${s.brand} ${s.name} string packet, ${color}`}
      fill
      sizes={sizes}
      priority={priority}
      className="object-contain p-[6%] transition-transform duration-500 group-hover:scale-105"
    />
  );
}
