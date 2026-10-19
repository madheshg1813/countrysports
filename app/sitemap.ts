import type { MetadataRoute } from 'next';
import { stringBrands } from '@/lib/business';
import { METADATA_BASE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/pricing', priority: 0.8 },
    { path: '/brands', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
    { path: '/about', priority: 0.6 },
    ...stringBrands.map((b) => ({ path: `/brands/${b.slug}`, priority: 0.6 })),
  ];
  return routes.map(({ path, priority }) => ({
    url: new URL(path, METADATA_BASE).toString(),
    changeFrequency: 'monthly',
    priority,
  }));
}
