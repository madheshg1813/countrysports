import type { Metadata, Viewport } from 'next';
import { DM_Sans, Kaushan_Script, Montserrat } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import { business } from '@/lib/business';
import { METADATA_BASE } from '@/lib/site';
import './globals.css';

const display = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const script = Kaushan_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kaushan',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: `${business.name} | Badminton Racket Restringing in Velachery, Chennai`,
    template: `%s | ${business.name}`,
  },
  description:
    'Badminton racket restringing, express 3-hour restringing, grip and grommet replacement at our Velachery, Chennai shop. Enquire on WhatsApp for price and turnaround.',
  applicationName: business.name,
  openGraph: {
    type: 'website',
    siteName: business.name,
    locale: 'en_IN',
  },
  twitter: { card: 'summary' },
};

export const viewport: Viewport = {
  themeColor: '#06172b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${script.variable}`}>
      <body>
        <Header cta={<WhatsAppCTA label="Book Now" size="sm" icon={false} />} />
        <main id="main">{children}</main>
        <Footer />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
