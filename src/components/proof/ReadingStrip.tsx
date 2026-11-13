import Link from 'next/link';
import type { NewsItem } from '@/lib/news/ingest';
import { READING_NOTES } from '@/content/readingNotes';
import { ArrowRight } from '@/components/ui/icons';

function formatDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date);
}

/** Three items from the current reading edition. Renders nothing when the edition is empty. */
export function ReadingStrip({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="wrap section !pt-0" aria-labelledby="reading-strip">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="reading-strip" className="t-h2">
            What I&apos;m reading
          </h2>
          <p className="t-body mt-3">Headlines from this week&apos;s AI and DevOps edition. Reading, not my work.</p>
        </div>
        <Link href="/news" className="text-link">
          Full edition
          <ArrowRight size={16} />
        </Link>
      </div>
      <ul className="mt-10 grid border-t-2 border-ink md:grid-cols-3">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`border-b border-rule py-6 md:border-b-0 ${index > 0 ? 'md:border-l md:border-rule md:pl-6' : ''} md:pr-6`}
          >
            <p className="t-data text-muted">
              {item.source} · {formatDate(item.publishedAt)}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline text-lg font-bold leading-snug hover:underline hover:decoration-red hover:decoration-2"
            >
              {item.title}
            </a>
            {READING_NOTES[item.url] ? (
              <p className="mt-3 text-sm leading-6 text-muted">{READING_NOTES[item.url]}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
