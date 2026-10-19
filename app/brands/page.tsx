import type { Metadata } from 'next';
import BrandGrid from '@/components/BrandGrid';
import CTABand from '@/components/CTABand';
import FeaturedProducts from '@/components/FeaturedProducts';
import { PageHero } from '@/components/Section';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { business, stringBrands } from '@/lib/business';
import { canonical } from '@/lib/site';

const brandNames = stringBrands.map((b) => b.name);

export const metadata: Metadata = {
  title: 'Badminton String Brands',
  description: `Badminton strings we stock at ${business.name}, Velachery, Chennai: ${brandNames.join(', ')}. Ask on WhatsApp which string suits your game.`,
  alternates: canonical('/brands'),
  openGraph: { url: '/brands', title: `String Brands | ${business.name}` },
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="String Brands"
        title={<>Premium string <span className="text-green-deep">brands</span></>}
        intro="We string rackets with strings from leading badminton brands. Tell us your favourite, or ask us to suggest one for how you play."
      >
        <WhatsAppCTA label="Ask which string suits you" enquiryPhrase="advice on the right string and tension for my game" />
      </PageHero>

      <section aria-labelledby="brands-grid-heading" className="py-16 sm:py-20">
        <div className="container-site">
          <h2 id="brands-grid-heading" className="text-section text-navy-700">Brands we stock</h2>
          <p className="mt-2 text-base leading-relaxed text-ink-muted sm:text-lg">Strings are charged at MRP. Pick a brand to see its strings, or message us to check a particular string is in stock.</p>
          <BrandGrid brands={stringBrands} />
        </div>
      </section>

      <FeaturedProducts />

      <div className="pt-16 sm:pt-20">
        <CTABand
          title={<>Not sure which <span className="text-green-deep">string?</span></>}
          text="Tell us how you play (attacking, defensive, doubles or singles) and we will suggest strings and a tension range before any work starts."
        />
      </div>
    </>
  );
}
