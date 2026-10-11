import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Self-care resources are authored as MDX in /content/resources and compiled
 * at build time. Pages that use this module are ISR (revalidate 3600).
 */

export const CATEGORIES = [
  'Anxiety',
  'Stress',
  'Grief',
  'Relationships',
  'Parenting',
  'Workplace',
  'Sleep',
  'Self-Compassion',
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ResourceMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  authorSlug?: string;
  date: string;
  readTime: string;
  image?: string;
};

export type Resource = ResourceMeta & { content: string };

const DIR = path.join(process.cwd(), 'content', 'resources');

function readAll(): Resource[] {
  if (!fs.existsSync(DIR)) return [];

  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, '');

      return {
        slug,
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ''),
        category: (data.category ?? 'Anxiety') as Category,
        author: String(data.author ?? 'The Naaman Wellness Team'),
        authorSlug: data.authorSlug ? String(data.authorSlug) : undefined,
        date: String(data.date ?? ''),
        readTime: readingTime(content),
        image: data.image ? String(data.image) : undefined,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function readingTime(mdx: string): string {
  const words = mdx
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function getAllResources(): Resource[] {
  return readAll();
}

export function getAllSlugs(): string[] {
  return readAll().map((r) => r.slug);
}

export function getResource(slug: string): Resource | undefined {
  return readAll().find((r) => r.slug === slug);
}

export function getRelated(slug: string, limit = 3): Resource[] {
  const all = readAll();
  const current = all.find((r) => r.slug === slug);
  if (!current) return all.slice(0, limit);

  const sameCategory = all.filter(
    (r) => r.slug !== slug && r.category === current.category
  );
  const others = all.filter((r) => r.slug !== slug && r.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}

export function countByCategory(): Record<string, number> {
  return readAll().reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});
}
