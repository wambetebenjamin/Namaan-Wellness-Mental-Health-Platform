import { NextResponse } from 'next/server';
import { getAllResources, getResource, getAllSlugs } from '@/lib/resources';

/**
 * GET /api/resources
 *   ?slug=<slug>  -> a single article (metadata + MDX source)
 *   otherwise     -> the full index (metadata only)
 *
 * Returns public editorial content only. No client or enquiry data is exposed.
 */
export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const article = getResource(slug);
    if (!article) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }
    return NextResponse.json(article);
  }

  const resources = getAllResources().map(({ content: _content, ...meta }) => meta);

  return NextResponse.json({
    count: resources.length,
    slugs: getAllSlugs(),
    resources,
  });
}
