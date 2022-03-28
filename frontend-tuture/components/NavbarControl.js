import React from 'react';
import Navbar from './Navbar';
import AnonNavbar from './AnonNavbar';
import { useSession } from 'next-auth/react';
import { NavbarProfileProvider } from '../context/NavbarProfileContext';

export default function NavbarControl({ children }) {
  const { data: session } = useSession();

  if (session)
    return (
      <NavbarProfileProvider session={session}>
        <Navbar>{children}</Navbar>
      </NavbarProfileProvider>
    );
  return <AnonNavbar>{children}</AnonNavbar>;
}
