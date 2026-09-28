import type { Metadata } from 'next';
import { PageSheet } from '@/components/shell/PageSheet';
import { NewsEdition, NewsItem } from '@/lib/news/ingest';
import { getNewsEdition } from '@/lib/news/edition';
import { pageMetadata } from '@/lib/site';
import { AskPetButton } from '@/components/pet/AskPetButton';
import { READING_NOTES } from '@/content/readingNotes';
import { PET_NAME } from '@/content/pet';

export const revalidate = 21600;

export const metadata: Metadata = {
  title: 'AI & DevOps Reading Digest — Mitul Bhatia',
  description: 'Recent AI, LLM systems, and DevOps engineering reading collected for Mitul Bhatia’s portfolio.',
  ...pageMetadata({
    path: '/news',
    title: 'AI & DevOps Reading Digest — Mitul Bhatia',
    description: 'A scheduled digest of recent AI, agentic systems, and DevOps reading curated by Mitul Bhatia.',
    keywords: [
      'Mitul Bhatia News',
      'Mitul Bhatia Reading Digest',
      'AI Reading List',
      'DevOps Headlines',
      'Agentic Systems Research',
    ],
  }),
};

function formatStamp(iso: string, withTime = false): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'an unknown time';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  }).format(date);
}

function NewsStack({ label, items }: { label: string; items: NewsItem[] }) {
  return (
    <section>
      <h2 className="border-b border-[var(--ink)] pb-3 font-serif text-3xl font-semibold text-[var(--ink)]">{label}</h2>
      {items.length === 0 ? (
        <p className="py-6 text-sm leading-6 text-[var(--muted)]">Nothing from the last two weeks in this stack.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border-b border-[var(--border-notebook)] py-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent-dark)]">
                {item.source}
                <span className="text-[var(--muted)]"> · {formatStamp(item.publishedAt)}</span>
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-serif text-2xl font-semibold leading-tight text-[var(--ink)] underline-offset-4 hover:text-[var(--accent-dark)] hover:underline"
              >
                {item.title}
              </a>
              {item.excerpt ? <p className="mt-3 max-w-[var(--measure)] text-sm leading-6 text-[var(--muted)]">{item.excerpt}</p> : null}
              {READING_NOTES[item.url] ? (
                <p className="mt-3 max-w-[var(--measure)] border-l-2 border-[var(--accent)] pl-3 text-sm leading-6 text-[var(--ink)]">
                  {READING_NOTES[item.url]}
                </p>
              ) : null}
              <AskPetButton
                lane="edition"
                prompt={`What is "${item.title}" (${item.source}) about?`}
                className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-ink)] hover:underline"
              >
                Ask {PET_NAME} →
              </AskPetButton>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function emptyCopy(edition: NewsEdition): string {
  const checked = formatStamp(edition.fetchedAt, true);
  if (edition.status === 'unavailable') {
    return `The digest has not arrived. Last checked ${checked}.`;
  }
  return `No AI or DevOps items from the last two weeks. Last checked ${checked}.`;
}

export default async function NewsPage() {
  const edition = await getNewsEdition();
  const ai = edition.items.filter((item) => item.topic === 'ai');
  const devops = edition.items.filter((item) => item.topic === 'devops');

  return (
    <PageSheet folio="News / What he has been reading">
      <section data-tour="news" className="border-b border-[var(--border-notebook)] pb-12 pt-4 sm:pb-16">
        <h1 className="balanced-heading max-w-[var(--measure-wide)] font-serif text-5xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-6xl">
          Recent reading, beside the work.
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base leading-7 text-[var(--muted)] sm:text-lg">
          A digest of public AI and DevOps sources, refreshed a few times a day. These are headlines he reads, not his
          work, and not résumé claims.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
          Edition {formatStamp(edition.fetchedAt, true)}
        </p>
      </section>

      {edition.items.length === 0 ? (
        <p className="max-w-[var(--measure)] py-12 text-base leading-7 text-[var(--ink)]">{emptyCopy(edition)}</p>
      ) : (
        <div className="grid gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          <NewsStack label="AI" items={ai} />
          <NewsStack label="DevOps" items={devops} />
        </div>
      )}
    </PageSheet>
  );
}
