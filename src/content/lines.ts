export type LineColor = 'red' | 'blue' | 'green' | 'yellow';

export interface ProjectLine {
  color: LineColor;
  /** Single letter shown in the round line bullet. */
  bullet: string;
}

/** Every project runs on a line. The three flagships each own a colour. */
const PROJECT_LINES: Record<string, ProjectLine> = {
  aegis: { color: 'red', bullet: 'A' },
  flately: { color: 'blue', bullet: 'F' },
  agrovers: { color: 'green', bullet: 'G' },
  creditsense: { color: 'yellow', bullet: 'C' },
  'loan-classifier': { color: 'yellow', bullet: 'L' },
  'f1-strategy': { color: 'yellow', bullet: 'R' },
  vulnswarm: { color: 'yellow', bullet: 'V' },
};

export function lineFor(slug: string): ProjectLine {
  return PROJECT_LINES[slug] ?? { color: 'yellow', bullet: slug.charAt(0).toUpperCase() };
}

export const RESUME_PDF = '/assets/Mitul_Bhatia_Resume.pdf';
export const RESUME_DOCX = '/assets/mitul-bhatia-resume.docx';
