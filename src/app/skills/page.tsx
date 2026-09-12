import React from 'react';
import type { Metadata } from 'next';
import { SkillsView } from '@/components/proof/SkillsView';

export const metadata: Metadata = {
  title: 'Skills & Architecture',
  description:
    'Technical taxonomy across 48 verified engineering nodes spanning agentic orchestration, inference runtimes, RAG retrieval, and resilient backend systems.',
};

export default function SkillsPage() {
  return <SkillsView />;
}
