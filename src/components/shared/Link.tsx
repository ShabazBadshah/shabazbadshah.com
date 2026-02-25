import React, { forwardRef, Ref } from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'> & {
    openInNewTab?: boolean | false;
  };

/**
 * Via https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a - Link.tsx
 */

const NavLink = (
  { href, as, prefetch, openInNewTab, className, ...props }: Props,
  ref: Ref<HTMLAnchorElement>
) => {
  const linkClasses = cn('no-underline text-black cursor-pointer visited:text-black', className);

  return openInNewTab ? (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <a ref={ref} target="_blank" rel="noopener noreferrer" className={linkClasses} {...props} />
    </Link>
  ) : (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <a ref={ref} className={linkClasses} {...props} />
    </Link>
  );
};

export default forwardRef<HTMLAnchorElement, Props>(NavLink);
