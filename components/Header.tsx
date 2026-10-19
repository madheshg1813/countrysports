'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

// No "Home" item: the logo links to the homepage.
const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/brands', label: 'Brands' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/** Receives the CTA from the server so the WhatsApp URL logic stays in one place. */
export default function Header({ cta }: { cta: React.ReactNode }) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="on-navy sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:font-bold focus:text-navy-950"
      >
        Skip to content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label="Country Sports Racket Care, home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    // Tighter padding on tablets (768–1023px) so six links, the logo and "Book Now" fit on one row
                    className={`relative inline-flex min-h-11 items-center rounded-md px-2 text-sm font-semibold transition-colors lg:px-4 ${active ? 'text-green-deep' : 'text-white/85 hover:text-white'}`}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="absolute inset-x-2 -bottom-[13px] h-0.5 rounded-full bg-green-deep lg:inset-x-4 lg:-bottom-[15px]" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Icon hidden at tablet widths so logo, nav and CTA fit on one row */}
        <div className="hidden md:block max-lg:[&_svg]:hidden">{cta}</div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-white/10 bg-navy-950 md:hidden">
        <nav aria-label="Mobile" className="container-site pb-6 pt-2">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex min-h-12 items-center border-b border-white/10 font-display text-lg font-extrabold uppercase ${isActive(item.href) ? 'text-green-deep' : 'text-white'}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 [&>*]:w-full">{cta}</div>
        </nav>
      </div>
    </header>
  );
}
