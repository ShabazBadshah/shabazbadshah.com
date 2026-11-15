import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import { renderPostHtml } from '@/lib/render-html';
import { SHOW_PLACEHOLDERS, VERIFY } from '@/lib/todo';
import {
  CURRENT_ROLE,
  currentRoleProjects,
  projectsOfKind,
  caseStudyProjects,
  type PublicProject,
  type WorkTab
} from '@/content/projects';

/**
 * Long-form case studies, one Markdown file each in src/content/case-studies/ (see the README
 * there), attached to a project by its `caseStudy` field. A file still marked `draft` is shown only
 * in development; in production its project falls back to the fields in projects.ts.
 */

export type CaseStudySection = { title: string; html: string };

/** Screens under NDA, shown where a section has a `<!-- locked-media -->` comment */
export type LockedMedia = {
  /** A pre-blurred preview in public/; null until the file is added */
  image: string | null;
  alt: string;
  message: string;
};

export type CaseStudy = {
  title: string;
  summary: string;
  status: string | null;
  role: string;
  client: string;
  timeline: string;
  team: string | null;
  customers: string | null;
  /** "The problem", shown in the summary rather than the body */
  problemHtml: string | null;
  sections: CaseStudySection[];
  lockedMedia: LockedMedia | null;
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

/**
 * MDX has no HTML comments: the locked media one becomes a marker element (LOCKED_MEDIA_HTML once
 * rendered), any other is dropped
 */
const replaceComments = (markdown: string): string =>
  markdown
    .replace(/<!--\s*locked-media\s*-->/g, '<div data-locked-media="" />')
    .replace(/<!--[\s\S]*?-->/g, '');

const read = (file: string) => {
  const source = fs.readFileSync(join(DIR, `${file}.md`), 'utf8');
  return { source, ...matter(source) };
};

/** A file's position on /work, from its `order` field; one without comes last */
export const caseStudyOrder = (file: string | null): number =>
  (file && read(file).data.order) ?? Infinity;

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
  const { source, data, content } = read(file);

  // The file name is the page's URL (see routeSlug in projects.ts)
  if (data.slug !== file) {
    throw new Error(
      `src/content/case-studies/${file}.md has slug "${data.slug}"; it must match the file name`
    );
  }
  if (!data.draft && VERIFY.test(source)) {
    throw new Error(
      `src/content/case-studies/${file}.md is published (draft: false) but still has  markers`
    );
  }
  if (data.draft && !SHOW_PLACEHOLDERS) return null;

  const sections = await Promise.all(
    splitSections(content).map(async ({ title, markdown }) => ({
      title,
      html: markVerify(await renderPostHtml(file, replaceComments(markdown)))
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
    problemHtml: problem?.html ?? null,
    sections: sections.filter((section) => section !== problem),
    lockedMedia: data.lockedMedia
      ? {
          image: fs.existsSync(join(process.cwd(), 'public', data.lockedMedia.image))
            ? data.lockedMedia.image
            : null,
          alt: data.lockedMedia.alt,
          message: data.lockedMedia.message
        }
      : null
  };
};

export type WorkPageData = {
  current: typeof CURRENT_ROLE;
  groups: Record<WorkTab, PublicProject[]>;
  clients: PublicProject[];
  /** Each project's case study by slug, so a row opens it with nothing to load */
  studies: Record<string, CaseStudy | null>;
};

/** By each case study file's `order`; rows without one keep their place after them */
export const byOrder = (projects: PublicProject[]): PublicProject[] =>
  [...projects].sort((a, b) => caseStudyOrder(a.caseStudy) - caseStudyOrder(b.caseStudy));

export const getWorkPageData = async (): Promise<WorkPageData> => {
  const groups = {
    employment: byOrder(projectsOfKind('employment')),
    volunteer: byOrder(projectsOfKind('volunteer'))
  };
  const clients = byOrder(currentRoleProjects());
  const projects = [...clients, ...Object.values(groups).flat()];
  const studies = Object.fromEntries(
    await Promise.all(
      projects.map(async (project) => [project.slug, await getCaseStudy(project.caseStudy)])
    )
  );
  return { current: CURRENT_ROLE, groups, clients, studies };
};

export const getCaseStudyPaths = (): string[] =>
  caseStudyProjects().map((project) => `/work/${project.slug}`);

export const getCaseStudyPageData = async (
  slug?: string
): Promise<{ project: PublicProject; study: CaseStudy | null } | null> => {
  const project = caseStudyProjects().find((p) => p.slug === slug);
  if (!project) return null;
  return { project, study: await getCaseStudy(project.caseStudy) };
};
