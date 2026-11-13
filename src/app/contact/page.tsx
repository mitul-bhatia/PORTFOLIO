import type { Metadata } from 'next';
import { PageHeader } from '@/components/shell/PageHeader';
import { ContactBlock } from '@/components/proof/ContactBlock';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Mitul Bhatia — AI & Full-Stack Engineer',
  description: 'Direct contact channels, email, phone, resume, and engineering profiles for Mitul Bhatia.',
  ...pageMetadata({
    path: '/contact',
    title: 'Contact Mitul Bhatia — AI & Full-Stack Engineer',
    description: 'Direct contact channels, email, phone, resume, and engineering profiles for Mitul Bhatia.',
    keywords: [
      'Contact Mitul Bhatia',
      'Hire Mitul Bhatia',
      'Mitul Bhatia Email',
      'Mitul Bhatia Phone',
      'Mitul Bhatia Resume',
      'Mitul Bhatia GitHub',
      'Mitul Bhatia LinkedIn',
      'Mitul Bhatia Sonipat Haryana',
    ],
  }),
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Let’s talk about the problem you’re building around."
        lead="I’m open to internships and engineering work across agentic systems, backend infrastructure, and full-stack products."
      />
      <section data-tour="contact" className="wrap section !pt-14">
        <ContactBlock />
      </section>
    </>
  );
}
