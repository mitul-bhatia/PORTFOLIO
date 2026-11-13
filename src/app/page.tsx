import Link from 'next/link';
import { Hero } from '@/components/lines/Hero';
import { ProjectLine } from '@/components/lines/ProjectLine';
import { ExperienceBoard } from '@/components/lines/ExperienceBoard';
import { Capabilities } from '@/components/lines/Capabilities';
import { BranchList } from '@/components/lines/BranchList';
import { ContactBand } from '@/components/lines/ContactBand';
import { ReadingStrip } from '@/components/proof/ReadingStrip';
import { ArrowRight } from '@/components/ui/icons';
import { FLAGSHIP_PROJECTS, SECONDARY_PROJECTS } from '@/content/projects';
import { getNewsEdition } from '@/lib/news/edition';

export const revalidate = 21600;

export default async function HomePage() {
  const edition = await getNewsEdition().catch(() => null);
  const reading = edition?.status === 'ready' ? edition.items.slice(0, 3) : [];

  return (
    <>
      <Hero />

      <section
        id="systems"
        data-tour="selected-systems"
        data-pip-mood="focused"
        data-pip-say="Each line here is a real pipeline. Watch one run."
        className="wrap section"
        aria-labelledby="systems-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="systems-heading" className="t-h1">
              Selected systems
            </h2>
            <p className="t-lead mt-4 max-w-[52ch] text-muted">
              Three projects, each drawn as the pipeline it actually runs. Watch a request travel the line, then open
              the case study.
            </p>
          </div>
          <Link href="/work" className="text-link">
            All projects
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-16 grid gap-24 lg:gap-32">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <ProjectLine key={project.slug} project={project} flip={index % 2 === 1} />
          ))}
        </div>
      </section>

      <ExperienceBoard />

      <Capabilities />

      <section
        className="wrap section !pt-0"
        aria-labelledby="more-heading"
        data-pip-mood="jealous"
        data-pip-say="Four more. Honestly, it is a bit much."
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="more-heading" className="t-h2">
            More experiments and applied work
          </h2>
          <Link href="/work" className="text-link">
            Full work index
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10">
          <BranchList projects={SECONDARY_PROJECTS} />
        </div>
      </section>

      <ReadingStrip items={reading} />

      <ContactBand />
    </>
  );
}
