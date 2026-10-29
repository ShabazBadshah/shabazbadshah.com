import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { content } from '@/content/content';

type Props = {
  children: React.ReactNode;
  /** Article-width column, for pages that are a single article */
  narrow?: boolean;
};

const MainLayout = ({ children, narrow = false }: Props): JSX.Element => (
  <>
    <a
      href="#main"
      className="sr-only left-4 top-4 z-50 rounded-pill bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed"
    >
      {content.layout.skipToContent}
    </a>
    <Header />
    <main
      id="main"
      className={`mx-auto w-full px-4 pb-16 pt-8 sm:px-6 sm:pt-28 ${
        narrow ? 'max-w-article' : 'max-w-5xl'
      }`}
    >
      {children}
    </main>
    <Footer narrow={narrow} />
  </>
);

export default MainLayout;
