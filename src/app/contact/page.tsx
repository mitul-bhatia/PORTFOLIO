import type { Metadata } from 'next';
import { PageSheet } from '@/components/shell/PageSheet';
import { ContactBlock } from '@/components/proof/ContactBlock';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email, resume, and engineering profiles for Mitul Bhatia.',
  ...pageMetadata({
    path: '/contact',
    title: 'Contact Mitul Bhatia',
    description: 'Email, resume, and engineering profiles for Mitul Bhatia.',
  }),
};

export default function ContactPage() {
  return (
    <PageSheet folio="Contact / Direct channels">
      <section className="border-b border-[var(--border-notebook)] pb-12 pt-4 sm:pb-16">
        <h1 className="balanced-heading max-w-[860px] font-serif text-5xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-6xl">
          Let&apos;s talk about the problem you&apos;re building around.
        </h1>
        <p className="mt-6 max-w-[66ch] text-base leading-7 text-[var(--muted)] sm:text-lg">
          I&apos;m open to internships and engineering work across agentic systems, backend infrastructure, and full-stack products.
        </p>
      </section>

      {/* Main Channels Block */}
      <section className="py-12 sm:py-16">
        <ContactBlock />
      </section>
    </PageSheet>
  );
}
