import React, { createContext, useContext, useMemo, useState } from 'react';

import { useCloseSound } from '@/lib/close-sound';

type ContactDialog = {
  /** The nav pill is expanded into the contact dialog */
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ContactDialogContext = createContext<ContactDialog>({
  open: false,
  setOpen: () => undefined
});

/** Lets anything on the page (the hero's call to action) open the contact dialog in the nav */
export const useContactDialog = (): ContactDialog => useContext(ContactDialogContext);

export default function ContactDialogProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  useCloseSound(open);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <ContactDialogContext.Provider value={value}>{children}</ContactDialogContext.Provider>;
}
