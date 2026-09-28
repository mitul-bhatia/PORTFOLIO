import Link from 'next/link';
import type { NewsItem } from '@/lib/news/ingest';
import { READING_NOTES } from '@/content/readingNotes';

function formatDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date);
}

/** Proof → reading → contact: three items from the current edition on the home page. */
export function ReadingStrip({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-b border-[var(--border-notebook)] py-16 sm:py-20" aria-labelledby="reading-strip">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="reading-strip" className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            What he&apos;s reading
          </h2>
          <p className="mt-3 max-w-[var(--measure)] text-sm leading-6 text-[var(--muted)]">
            Headlines from this week&apos;s AI and DevOps edition. His reading, not his work.
          </p>
        </div>
        <Link
          href="/news"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-ink)] hover:underline"
        >
          Full edition →
        </Link>
      </div>
      <ul className="grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col bg-[var(--paper-soft)] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
              {item.source} · {formatDate(item.publishedAt)}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 font-serif text-xl font-semibold leading-snug text-[var(--ink)] hover:text-[var(--accent-ink)] hover:underline"
            >
              {item.title}
            </a>
            {READING_NOTES[item.url] ? (
              <p className="mt-3 border-l-2 border-[var(--accent)] pl-3 text-sm leading-6 text-[var(--ink)]">
                {READING_NOTES[item.url]}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
