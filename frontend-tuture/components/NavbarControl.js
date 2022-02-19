import React from 'react';
import Navbar from './Navbar';
import AnonNavbar from './AnonNavbar';

export default function NavbarControl({ children, signedIn = true }) {
  if (signedIn) return <Navbar>{children}</Navbar>;
  return <AnonNavbar>{children}</AnonNavbar>;
}
