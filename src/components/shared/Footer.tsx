import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer = (): JSX.Element => {
  return (
    <footer>
      <Separator className="my-4 bg-gray-200/80" />
      <p className="text-sm">©{new Date().getFullYear()} Badshah Consulting Inc.</p>
    </footer>
  );
};

export default Footer;
