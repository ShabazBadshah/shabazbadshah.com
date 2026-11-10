import { ArrowRight, ArrowUpRight } from 'lucide-react';
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

type Props = { posts: Post[]; mednow: PublicProject; soti: PublicProject };

/** A proof card that is one link: to Syftable's site, or to the timeline on /work */
function LinkCard({
  eyebrow,
  title,
  body,
  link,
  href
}: {
  eyebrow: string;
  title: string;
  body: string;
  link: string;
  href: string;
}): JSX.Element {
  const externalLink = href.startsWith('http');
  const Arrow = externalLink ? ArrowUpRight : ArrowRight;
  // Next's <Link> supplies href to internal links, and only when the <a> has none of its own
  const card = (
    <a
      className="card group h-full gap-3 p-5 no-underline hover:border-line-strong sm:p-6"
      {...(externalLink && { href, target: '_blank', rel: 'noopener noreferrer' })}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-fg-muted">{body}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent">
        {link}
        <Arrow
          aria-hidden="true"
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
  return externalLink ? card : <Link href={href}>{card}</Link>;
}

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
        <h2 id="work-heading" className={SECTION_TITLE}>
          {home.proof.title}
        </h2>
        <div className={`mt-6 grid lg:grid-cols-2 ${GRID_GAP}`}>
          <ProjectCard project={mednow} className="lg:col-span-2" />
          <ProjectCard project={soti} />
          <div className={`grid ${GRID_GAP}`}>
            <LinkCard {...home.proof.syftable} href={siteConfig.syftable.url} />
            <LinkCard {...home.proof.clients} href="/work#independent" />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className={SECTION_TITLE}>
          {home.howIWork.title}
        </h2>
        <ol className={`mt-6 grid sm:grid-cols-2 lg:grid-cols-5 ${GRID_GAP}`}>
          {home.howIWork.steps.map((step, index) => (
            <li key={step.title} className="card gap-3 p-5">
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-pill bg-fill text-sm font-semibold"
              >
                {index + 1}
              </span>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="blog-heading">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h2 id="blog-heading" className={SECTION_TITLE}>
              {content.blog.title}
            </h2>
            <p className="text-lg font-medium text-fg-muted">{content.blog.subtitle}</p>
          </div>
          <Link href="/blog">
            <a className="group inline-flex items-center gap-1 font-medium text-accent no-underline hover:underline">
              {home.blog.viewAll}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
          </Link>
        </div>
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
