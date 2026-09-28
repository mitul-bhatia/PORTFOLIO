export interface ParsedFeedItem {
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string;
}

function decodeEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)));
}

function toPlainText(value: string): string {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tagValue(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? toPlainText(match[1]) : '';
}

function extractLink(block: string): string {
  const textLink = block.match(/<link>([^<]+)<\/link>/i);
  if (textLink) return decodeEntities(textLink[1]).trim();

  const links = block.matchAll(/<link\b([^>]*)\/?>/gi);
  for (const link of links) {
    const attrs = link[1] ?? '';
    if (/\brel=["']self["']/i.test(attrs)) continue;
    const href = attrs.match(/\bhref=["']([^"']+)["']/i);
    if (href) return decodeEntities(href[1]).trim();
  }

  return '';
}

function extractDate(block: string): string {
  const raw =
    tagValue(block, 'pubDate') ||
    tagValue(block, 'updated') ||
    tagValue(block, 'published') ||
    tagValue(block, 'dc:date');
  const parsed = Date.parse(raw);
  if (!raw || Number.isNaN(parsed)) return '';
  return new Date(parsed).toISOString();
}

export function parseFeed(xml: string): ParsedFeedItem[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];

  return blocks.flatMap((block) => {
    const title = tagValue(block, 'title');
    const url = extractLink(block);
    const publishedAt = extractDate(block);
    const excerpt = (
      tagValue(block, 'description') ||
      tagValue(block, 'summary') ||
      tagValue(block, 'content')
    ).slice(0, 280);

    if (!title || !url || !publishedAt) return [];
    return [{ title, url, publishedAt, excerpt }];
  });
}
