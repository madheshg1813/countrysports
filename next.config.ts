import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home folder would otherwise be picked as the root.
  turbopack: { root: __dirname },
  // Let phones/laptops on the local Wi-Fi load the dev server (dev only; no effect in production).
  allowedDevOrigins: ['192.168.0.7', '192.168.*.*'],
  images: {
    formats: ['image/avif', 'image/webp'],
    // Serve AVIF/WebP at high quality (Next's default is 75); every <Image> resolves to 90.
    qualities: [90],
    // Optimised variants are cached for 30 days.
    minimumCacheTTL: 2592000,
  },
  // Old Vite-era URLs: city landing pages were removed (unverified coverage), so send
  // visitors to /services. Per-brand pages live at /brands/<slug> again.
  async redirects() {
    return [
      { source: '/chennai/:path*', destination: '/services', permanent: true },
      { source: '/services/badminton', destination: '/services', permanent: true },
    ];
  },
};

export default nextConfig;
