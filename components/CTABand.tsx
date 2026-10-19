import WhatsAppCTA from './WhatsAppCTA';

export default function CTABand({
  title = <>Ready to get back <span className="text-green-deep">on court?</span></>,
  text = 'Send us a WhatsApp message with your racket, string and tension. We will reply with the price and when it will be ready.',
}: { title?: React.ReactNode; text?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="container-site pb-20 sm:pb-24">
      <div className="on-navy bg-navy-hero relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-14">
        <div aria-hidden="true" className="string-grid absolute inset-y-0 right-0 w-2/3 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="text-section text-white">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-on-navy-muted">{text}</p>
          </div>
          <WhatsAppCTA label="Book Your Stringing" className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
