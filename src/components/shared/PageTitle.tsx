import React from 'react';
import { Home } from 'lucide-react';

import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/ui/button';

type Props = {
  children: React.ReactNode;
  href?: string;
};

const StyledPageTitle = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex flex-col gap-3">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="w-fit -ml-2.5 rounded-md hover:bg-[#eaf1f7]"
      >
        <Link href="/">
          <Home className="text-foreground" />
        </Link>
      </Button>
    </div>
    <h1 className="text-xl sm:text-2xl font-semibold leading-[52px] mt-2 pb-4">
      <span className="text-foreground no-underline">{children}</span>
    </h1>
  </>
);

const PageTitle = ({ children, href }: Props): JSX.Element => {
  if (href && href.trim().length !== 0) {
    return (
      <Link href={href}>
        <StyledPageTitle>{children}</StyledPageTitle>
      </Link>
    );
  }
  return <StyledPageTitle>{children}</StyledPageTitle>;
};

export default PageTitle;
