import Link from 'next/link';
import { RESUME_DOCX, RESUME_PDF } from '@/content/lines';
import { ArrowRight, ArrowUpRight, Download } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';

/** The last stop on every long page. */
export function ContactBand() {
  return (
    <section
      className="bg-yellow text-ink"
      aria-labelledby="contact-band-heading"
      data-pip-mood="arriving"
      data-pip-react="happy"
      data-pip-say="This is the part where you email him. Go on."
    >
      <Reveal kind="stagger" className="wrap section grid gap-10">
        <div>
          <h2 id="contact-band-heading" className="t-h1 max-w-[30ch]">
            Looking for an engineer who can move between AI workflows and the product around them?
          </h2>
          <p className="t-lead mt-6 max-w-[52ch]">
            I&apos;m open to internships and engineering work across agentic systems, backend infrastructure, and
            full-stack products.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <Link href="/contact" className="btn btn-primary col-span-2 justify-center">
            Contact me
            <ArrowRight />
          </Link>
          <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn btn-secondary justify-center">
            Resume PDF
            <ArrowUpRight size={16} />
          </a>
          <a href={RESUME_DOCX} download className="btn btn-secondary justify-center">
            DOCX
            <Download size={16} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
