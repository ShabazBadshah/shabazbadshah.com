import { publicProject, type PublicProject } from '@/content/projects';
import { getAllPosts, type Post } from '@/lib/blog';
import { getCaseStudy, type CaseStudy } from '@/lib/case-studies';
import { getRenderedPosts } from '@/lib/render-html';

/** Featured post plus the two most recent */
export const HOME_POSTS = 3;

export type HomePageData = {
  posts: Post[];
  mednow: PublicProject;
  planned: PublicProject;
  syftable: PublicProject;
  /** The selected work's case studies by slug, so a card opens one with nothing to load */
  studies: Record<string, CaseStudy | null>;
};

export const getHomePageData = async (): Promise<HomePageData> => {
  const mednow = publicProject('mednow');
  const planned = publicProject('planned');
  const studies = Object.fromEntries(
    await Promise.all(
      [mednow, planned].map(async (project) => [
        project.slug,
        await getCaseStudy(project.caseStudy)
      ])
    )
  );

  return {
    posts: await getRenderedPosts(getAllPosts().slice(0, HOME_POSTS)),
    mednow,
    planned,
    syftable: publicProject('syftable'),
    studies
  };
};
