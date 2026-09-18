import type { Metadata } from 'next';
import { SkillsView } from '@/components/proof/SkillsView';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'The languages, frameworks, databases, and tools Mitul uses across AI systems and full-stack products.',
  ...pageMetadata({
    path: '/skills',
    title: 'Engineering skills — Mitul Bhatia',
    description: 'Languages, frameworks, databases, and tools used across AI systems and full-stack products.',
  }),
};

export default function SkillsPage() {
  return <SkillsView />;
}
