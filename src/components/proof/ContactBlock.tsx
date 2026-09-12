import React from 'react';
import { PROFILE } from '@/content/profile';
import { Magnetic } from '@/components/shell/Magnetic';

export function ContactBlock() {
  return (
    <div className="space-y-12">
      {/* Primary Communication Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email Direct Action */}
        <div className="border border-[#2B1D14] bg-[#EADFC8] p-8 shadow-notebook flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#A8672E] font-semibold mb-2">
              PRIMARY COMMUNICATION
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2B1D14] mb-2">
              Institutional & Direct Mail
            </h2>
            <p className="font-mono text-sm text-[#2B1D14] mb-6">
              {PROFILE.email}
            </p>
          </div>
          <div>
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-block px-6 py-3 bg-[#2B1D14] text-[#F3E9DA] font-mono text-xs font-semibold hover:bg-[#A8672E] transition-colors shadow-notebook"
              >
                COMPOSE EMAIL ↗
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Resume PDF Action */}
        <div className="border border-[#2B1D14] bg-[#EADFC8] p-8 shadow-notebook flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#A8672E] font-semibold mb-2">
              CURRICULUM VITAE
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2B1D14] mb-2">
              Verified Technical Resume
            </h2>
            <p className="text-xs text-[#6B5744] mb-6">
              Includes full course transcripts (CGPA 9.80 / 10.0), AI Studio program highlights, and project technical breakdowns.
            </p>
          </div>
          <div>
            <Magnetic strength={0.25}>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#F3E9DA] text-[#2B1D14] border border-[#2B1D14] font-mono text-xs font-semibold hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors shadow-notebook"
              >
                DOWNLOAD RESUME (PDF) ↗
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Profiles & Footprint */}
      <div>
        <div className="font-mono text-xs text-[#6B5744] uppercase tracking-wider mb-6">
          Verified Profiles & Code Repositories
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-[#D9C9AC] bg-[#F3E9DA] hover:border-[#2B1D14] transition-colors shadow-notebook block"
          >
            <div className="font-mono text-[10px] text-[#A8672E] font-bold">SOURCE CODE</div>
            <div className="font-serif text-lg font-bold text-[#2B1D14]">GitHub</div>
            <div className="font-mono text-xs text-[#6B5744] mt-1">@mitul-bhatia ↗</div>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-[#D9C9AC] bg-[#F3E9DA] hover:border-[#2B1D14] transition-colors shadow-notebook block"
          >
            <div className="font-mono text-[10px] text-[#A8672E] font-bold">PROFESSIONAL</div>
            <div className="font-serif text-lg font-bold text-[#2B1D14]">LinkedIn</div>
            <div className="font-mono text-xs text-[#6B5744] mt-1">/in/mitul-bhatia ↗</div>
          </a>

          <a
            href={PROFILE.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-[#D9C9AC] bg-[#F3E9DA] hover:border-[#2B1D14] transition-colors shadow-notebook block"
          >
            <div className="font-mono text-[10px] text-[#A8672E] font-bold">ALGORITHMS</div>
            <div className="font-serif text-lg font-bold text-[#2B1D14]">LeetCode</div>
            <div className="font-mono text-xs text-[#6B5744] mt-1">Rating: {PROFILE.ratings.leetcode} ↗</div>
          </a>

          <a
            href={PROFILE.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-[#D9C9AC] bg-[#F3E9DA] hover:border-[#2B1D14] transition-colors shadow-notebook block"
          >
            <div className="font-mono text-[10px] text-[#A8672E] font-bold">COMPETITIVE</div>
            <div className="font-serif text-lg font-bold text-[#2B1D14]">Codeforces</div>
            <div className="font-mono text-xs text-[#6B5744] mt-1">Rating: {PROFILE.ratings.codeforces} ↗</div>
          </a>
        </div>
      </div>

      {/* Direct Phone */}
      <div className="pt-6 border-t border-[#D9C9AC] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#6B5744]">
        <div>
          <span>Direct Phone: </span>
          <span className="text-[#2B1D14] font-semibold">{PROFILE.phone}</span>
        </div>
        <div>
          <span>Location: </span>
          <span className="text-[#2B1D14]">{PROFILE.location}</span>
        </div>
      </div>
    </div>
  );
}
