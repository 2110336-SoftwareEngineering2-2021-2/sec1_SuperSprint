import React from 'react';
import Navbar from './Navbar';
import AnonNavbar from './AnonNavbar';

export default function NavbarControl({ children, signedIn = true }) {
  return (
    <>
      {signedIn ? (
        <Navbar>{children}</Navbar>
      ) : (
        <AnonNavbar>{children}</AnonNavbar>
        // <div className="h-full w-screen">{children}</div>
      )}
    </>
  );
}
