import { createHash } from 'crypto';
import { parseFeed } from '@/lib/news/parse';
import { NEWS_SOURCES, NewsSource, NewsTopic } from '@/lib/news/sources';

const MAX_PER_TOPIC = 6;
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 4000;

export interface NewsItem {
  id: string;
  topic: NewsTopic;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  excerpt: string;
}

export interface NewsEdition {
  fetchedAt: string;
  status: 'ready' | 'empty' | 'unavailable';
  items: NewsItem[];
}

function canonicalUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    url.hash = '';
    for (const key of [...url.searchParams.keys()]) {
      if (key.toLowerCase().startsWith('utm_')) url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return null;
  }
}

function itemId(url: string): string {
  return createHash('sha1').update(url).digest('hex').slice(0, 12);
}

async function readSource(source: NewsSource): Promise<NewsItem[]> {
  const response = await fetch(source.url, {
    headers: {
      Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml',
      'User-Agent': 'MitulBhatiaPortfolio/1.0',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`Feed ${source.name} returned ${response.status}`);

  const xml = await response.text();
  const cutoff = Date.now() - MAX_AGE_MS;

  return parseFeed(xml).flatMap((item) => {
    const url = canonicalUrl(item.url);
    const published = Date.parse(item.publishedAt);
    if (!url || Number.isNaN(published) || published < cutoff) return [];
    return [
      {
        id: itemId(url),
        topic: source.topic,
        title: item.title,
        url,
        source: source.name,
        publishedAt: new Date(published).toISOString(),
        excerpt: item.excerpt,
      },
    ];
  });
}

export async function buildNewsEdition(): Promise<NewsEdition> {
  const fetchedAt = new Date().toISOString();
  const results = await Promise.allSettled(NEWS_SOURCES.map((source) => readSource(source)));
  const failures = results.filter((result) => result.status === 'rejected').length;
  const seen = new Set<string>();
  const collected: NewsItem[] = [];

  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    for (const item of result.value) {
      if (seen.has(item.url)) continue;
      seen.add(item.url);
      collected.push(item);
    }
  }

  const items = (['ai', 'devops'] as const).flatMap((topic) =>
    collected
      .filter((item) => item.topic === topic)
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, MAX_PER_TOPIC),
  );

  const status = items.length > 0 ? 'ready' : failures === NEWS_SOURCES.length ? 'unavailable' : 'empty';

  return { fetchedAt, status, items };
}
