import { stringBrands } from '@/lib/business';
import { Accent, SectionHeading } from './Section';
import BrandCarousel from './BrandCarousel';

/** One tile per string brand, with the brand's logo where supplied. Hidden if none are configured. */
export default function StringBrandsSection() {
  if (stringBrands.length === 0) return null;

  const tiles = stringBrands.map((b) => ({ name: b.name, logo: b.logo }));

  return (
    <section aria-labelledby="brands-heading" className="py-14 sm:py-16">
      <div className="container-site">
        <SectionHeading
          id="brands-heading"
          eyebrow="Popular String Brands"
          title={<>Premium String <Accent>Selection</Accent></>}
          intro="We use and recommend the best badminton string brands."
        />
        <div className="mt-6">
          <BrandCarousel items={tiles} />
        </div>
      </div>
    </section>
  );
}
