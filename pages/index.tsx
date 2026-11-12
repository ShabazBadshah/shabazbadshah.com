import { ArrowRight } from 'lucide-react';
import { GetStaticPropsResult } from 'next';
import Link from 'next/link';

import { getRenderedPosts } from '@/components/blog/RenderPostHTML';
import PostGrid from '@/components/blog/PostGrid';
import Hero from '@/components/home/Hero';
import ProjectCard from '@/components/home/ProjectCard';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import { publicProject, type PublicProject } from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';
import { getAllPosts, type Post } from '@/lib/blog';
import { homeStructuredData } from '@/lib/structured-data';

const GRID_GAP = 'gap-4 sm:gap-5 lg:gap-6';
const SECTION_TITLE = 'text-2xl font-semibold tracking-tight sm:text-3xl';
/** Featured post plus the two most recent */
const HOME_POSTS = 3;

const { home } = content;

/** A section heading, with an optional subtitle, and a link to the page with all of it */
function SectionHeader({
  id,
  title,
  subtitle,
  href,
  link
}: {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  link: string;
}): JSX.Element {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <h2 id={id} className={SECTION_TITLE}>
          {title}
        </h2>
        {subtitle && <p className="text-lg font-medium text-fg-muted">{subtitle}</p>}
      </div>
      <Link href={href}>
        <a className="group inline-flex items-center gap-1 font-medium text-accent no-underline hover:underline">
          {link}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </a>
      </Link>
    </div>
  );
}

type Props = { posts: Post[]; mednow: PublicProject; soti: PublicProject };

const Index = ({ posts, mednow, soti }: Props): JSX.Element => (
  <MainLayout source="career">
    <SEO
      title={siteConfig.seo.title}
      description={siteConfig.seo.description}
      jsonLd={homeStructuredData()}
    />
    <div className="flex flex-col gap-16 sm:gap-20">
      <section id="hero" aria-label={content.hero.sectionLabel}>
        <Hero />
      </section>

      <section aria-labelledby="work-heading">
        <SectionHeader
          id="work-heading"
          title={home.proof.title}
          href="/work"
          link={home.proof.viewAll}
        />
        <div className={`mt-6 grid lg:grid-cols-2 ${GRID_GAP}`}>
          <ProjectCard project={mednow} className="lg:col-span-2" />
          <ProjectCard project={soti} className="lg:col-span-2" />
        </div>
      </section>

      <section aria-labelledby="blog-heading">
        <SectionHeader
          id="blog-heading"
          title={content.blog.title}
          subtitle={content.blog.subtitle}
          href="/blog"
          link={home.blog.viewAll}
        />
        <PostGrid posts={posts} className="mt-6" />
      </section>
    </div>
  </MainLayout>
);

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => ({
  props: {
    posts: await getRenderedPosts(getAllPosts().slice(0, HOME_POSTS)),
    mednow: publicProject('mednow'),
    soti: publicProject('soti')
  }
});
