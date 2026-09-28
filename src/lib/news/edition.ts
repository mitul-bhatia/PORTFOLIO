import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { buildNewsEdition, NewsEdition } from '@/lib/news/ingest';

export const NEWS_EDITION_TAG = 'news-edition';
export const NEWS_REVALIDATE_SECONDS = 60 * 60 * 6;

/**
 * cacheComponents is off, so the supported cache for this app is the
 * tag + revalidate model rather than the `use cache` directive.
 */
export const getNewsEdition = unstable_cache(buildNewsEdition, [NEWS_EDITION_TAG], {
  tags: [NEWS_EDITION_TAG],
  revalidate: NEWS_REVALIDATE_SECONDS,
});

export async function refreshNewsEdition(): Promise<NewsEdition> {
  revalidateTag(NEWS_EDITION_TAG, { expire: 0 });
  const edition = await buildNewsEdition();
  revalidatePath('/news');
  return edition;
}
