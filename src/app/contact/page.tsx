import React from 'react';
import { PageSheet } from '@/components/shell/PageSheet';
import { ContactBlock } from '@/components/proof/ContactBlock';

export const metadata = {
  title: 'Contact & Hiring Index',
  description: 'Direct contact coordinates, resume download, and engineering profiles for Mitul Bhatia.',
};

export default function ContactPage() {
  return (
    <PageSheet folio="05 / CONTACT — DIRECT INDEX">
      {/* Header */}
      <section className="py-8 border-b border-[#D9C9AC]">
        <div className="font-mono text-xs text-[#A8672E] tracking-widest uppercase mb-2">
          Direct Channels
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D14] mb-4">
          Initiate Contact
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-[#6B5744] font-serif leading-relaxed">
          Open to discussions on agentic infrastructure, multi-agent coordination loops, high-concurrency systems, and AI engineering internships.
        </p>
      </section>

      {/* Main Channels Block */}
      <section className="py-12">
        <ContactBlock />
      </section>
    </PageSheet>
  );
}
