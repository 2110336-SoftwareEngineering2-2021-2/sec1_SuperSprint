import React from 'react';
import Navbar from './Navbar';
import AnonNavbar from './AnonNavbar';
import { useSession } from 'next-auth/react';

export default function NavbarControl({ children, signedIn = true }) {
  const { data: session } = useSession()

  if (session) return <Navbar>{children}</Navbar>;
  return <AnonNavbar>{children}</AnonNavbar>;
}
