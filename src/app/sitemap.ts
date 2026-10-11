import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { therapists } from '@/data/therapists';
import { services } from '@/data/services';
import { getAllResources } from '@/lib/resources';

/** Dynamic sitemap built from therapist, service and resource slugs. */
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/therapists',
    '/services',
    '/resources',
    '/corporate',
    '/book',
    '/check-in',
    '/contact',
    '/legal/privacy-policy',
    '/legal/terms',
    '/legal/cookie-policy',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  const therapistRoutes: MetadataRoute.Sitemap = therapists.map((t) => ({
    url: `${base}/therapists/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = getAllResources().map((r) => ({
    url: `${base}/resources/${r.slug}`,
    lastModified: r.date ? new Date(r.date) : now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...therapistRoutes, ...serviceRoutes, ...resourceRoutes];
}
