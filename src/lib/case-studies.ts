import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import { renderPostHtml } from '@/components/blog/RenderPostHTML';
import { SHOW_PLACEHOLDERS, VERIFY } from '@/lib/todo';

/**
 * Long-form case studies, one Markdown file each in src/content/case-studies/ (see the README
 * there), attached to a project by its `caseStudy` field. A file still marked `draft` is shown only
 * in development; in production its project falls back to the fields in projects.ts.
 */

export type CaseStudySection = { title: string; html: string };

export type CaseStudy = {
  title: string;
  summary: string;
  status: string | null;
  role: string;
  client: string;
  timeline: string;
  team: string | null;
  customers: string | null;
  stack: string[];
  outcome: string;
  /** "The problem", shown in the summary rather than the body */
  problemHtml: string | null;
  sections: CaseStudySection[];
};

const DIR = join(process.cwd(), 'src/content/case-studies');
const PROBLEM = 'The problem';

/** Unconfirmed facts stay visible as dashed placeholders (the same look as a TODO) */
const markVerify = (html: string): string =>
  html.replace(
    new RegExp(VERIFY.source, 'g'),
    (marker) =>
      `<span class="rounded-chip border border-dashed border-line-strong px-1.5 text-fg-muted">${marker}</span>`
  );

/** Splits the body at its "## " headings, which are the sections */
const splitSections = (body: string): { title: string; markdown: string }[] =>
  body
    .split(/^## /m)
    .slice(1)
    .map((chunk) => {
      const [title, ...rest] = chunk.split('\n');
      return { title: title.trim(), markdown: rest.join('\n').trim() };
    });

export const getCaseStudy = async (file: string | null): Promise<CaseStudy | null> => {
  if (!file) return null;
  const source = fs.readFileSync(join(DIR, `${file}.md`), 'utf8');
  const { data, content } = matter(source);

  if (!data.draft && VERIFY.test(source)) {
    throw new Error(
      `src/content/case-studies/${file}.md is published (draft: false) but still has  markers`
    );
  }
  if (data.draft && !SHOW_PLACEHOLDERS) return null;

  const sections = await Promise.all(
    splitSections(content).map(async ({ title, markdown }) => ({
      title,
      html: markVerify(await renderPostHtml(file, markdown))
    }))
  );
  const problem = sections.find((section) => section.title === PROBLEM);

  return {
    title: data.title,
    summary: data.summary,
    status: data.status ?? null,
    role: data.role,
    client: data.client,
    timeline: data.timeline,
    team: data.team ?? null,
    customers: data.customers ?? null,
    stack: data.stack ?? [],
    outcome: data.outcome,
    problemHtml: problem?.html ?? null,
    sections: sections.filter((section) => section !== problem)
  };
};
