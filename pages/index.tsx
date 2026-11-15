import { ArrowRight } from 'lucide-react';
import { GetStaticPropsResult } from 'next';
import Link from 'next/link';

import ArticleSheet from '@/components/ArticleSheet';
import PostGrid from '@/components/blog/PostGrid';
import Hero from '@/components/home/Hero';
import MainLayout from '@/components/MainLayout';
import ProjectCard from '@/components/ProjectCard';
import SEO from '@/components/SEO';
import CaseStudyArticle from '@/components/work/CaseStudyArticle';
import { content } from '@/content/content';
import type { PublicProject } from '@/content/projects';
import { useProjectSheet } from '@/lib/card-transition';
import { getHomePageData, type HomePageData } from '@/lib/home';
import { siteConfig } from '@/lib/site';
import { homeStructuredData } from '@/lib/structured-data';

const GRID_GAP = 'gap-4 sm:gap-5 lg:gap-6';
const SECTION_TITLE = 'text-2xl font-semibold tracking-tight sm:text-3xl';

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
    <div>
      {/* The title and link share a row; the subtitle runs the full width under them */}
      <div className="flex items-baseline justify-between gap-6">
        <h2 id={id} className={`min-w-0 ${SECTION_TITLE}`}>
          {title}
        </h2>
        <Link href={href}>
          <a className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-medium text-accent no-underline hover:underline">
            {link}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
        </Link>
      </div>
      {subtitle && <p className="text-lg font-medium text-fg-muted">{subtitle}</p>}
    </div>
  );
}

type Props = HomePageData;

const Index = ({ posts, mednow, planned, syftable, studies }: Props): JSX.Element => {
  const { sheet, closing, open, close, exited } = useProjectSheet<PublicProject>([mednow, planned]);

  return (
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
            <ProjectCard project={mednow} className="lg:col-span-2" onOpen={open} />
            <ProjectCard project={planned} onOpen={open} />
            <ProjectCard project={syftable} />
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
      {sheet && (
        <ArticleSheet
          key={sheet.slug}
          card={sheet.slug}
          label={sheet.name}
          pageTitle={siteConfig.seo.caseStudyTitle(sheet.name)}
          closing={closing}
          onClose={close}
          onExited={exited}
        >
          <CaseStudyArticle project={sheet} study={studies[sheet.slug]} embedded />
        </ArticleSheet>
      )}
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<HomePageData>> => ({
  props: await getHomePageData()
});
