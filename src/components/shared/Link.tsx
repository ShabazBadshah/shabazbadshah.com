import React, { forwardRef, Ref } from 'react';
import Link, { LinkProps } from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

type Props = Omit<MuiLinkProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'> & {
    openInNewTab?: boolean | false;
  };

/**
 * Via https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a - Link.tsx
 */

const linkStyle = {
  textDecoration: 'none',
  color: '#000000',
  cursor: 'pointer',
  '&:visited': {
    color: '#000000'
  }
};

const NavLink = (
  { href, as, prefetch, openInNewTab, ...props }: Props,
  ref: Ref<HTMLAnchorElement>
) => {
  return openInNewTab ? (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <MuiLink
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ ...linkStyle }}
        {...props}
      />
    </Link>
  ) : (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <MuiLink ref={ref} sx={{ ...linkStyle }} {...props} />
    </Link>
  );
};

export default forwardRef<HTMLAnchorElement, Props>(NavLink);
