import type { Metadata } from 'next';
import { PageHeader } from '@/components/shell/PageHeader';
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
      <h2 className="t-h2 border-b-2 border-ink pb-4">{label}</h2>
      {items.length === 0 ? (
        <p className="py-6 text-muted">Nothing from the last two weeks in this stack.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border-b border-rule py-7">
              <p className="t-data text-muted">
                <span className="text-ink">{item.source}</span> · {formatStamp(item.publishedAt)}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="t-h3 mt-3 block hover:underline hover:decoration-red hover:decoration-[3px] hover:underline-offset-4"
              >
                {item.title}
              </a>
              {item.excerpt ? <p className="mt-3 max-w-[var(--measure)] text-muted">{item.excerpt}</p> : null}
              {READING_NOTES[item.url] ? (
                <p className="mt-3 max-w-[var(--measure)] rounded-md bg-panel p-4 text-ink">{READING_NOTES[item.url]}</p>
              ) : null}
              <AskPetButton
                lane="edition"
                prompt={`What is "${item.title}" (${item.source}) about?`}
                className="text-link mt-4 min-h-11 text-sm"
              >
                Ask {PET_NAME} about this
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
    <>
      <PageHeader
        tour="news"
        title="Recent reading, beside the work."
        lead="A digest of public AI and DevOps sources, refreshed a few times a day. These are headlines I read, not my work, and not resume claims."
      >
        <p className="t-data mt-6 text-muted">Edition {formatStamp(edition.fetchedAt, true)}</p>
      </PageHeader>

      <div className="wrap section !pt-14">
        {edition.items.length === 0 ? (
          <p className="t-lead max-w-[var(--measure)]">{emptyCopy(edition)}</p>
        ) : (
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <NewsStack label="AI" items={ai} />
            <NewsStack label="DevOps" items={devops} />
          </div>
        )}
      </div>
    </>
  );
}
