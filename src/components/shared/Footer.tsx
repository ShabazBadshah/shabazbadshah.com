import React from 'react';
import { Separator } from '@/components/ui/separator';

type Props = {
  extraFooterContent?: React.ReactNode;
};

const Footer = ({ extraFooterContent }: Props): JSX.Element => {
  return (
    <footer>
      <div className="bg-background pb-8">
        {extraFooterContent}
        <Separator className="my-4" />
        <p className="text-sm">©{new Date().getFullYear()} built by Shabaz Badshah</p>
      </div>
    </footer>
  );
};

export default Footer;
