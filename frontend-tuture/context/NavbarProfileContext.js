import { createContext, useEffect, useState } from 'react';

export const NavbarProfileContext = createContext();

export function NavbarProfileProvider({ session, children }) {
  const [userData, setUserData] = useState({
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    profileImg: session.user.profileUrl,
  });

  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem('userData')) || {
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      profileImg: session.user.profileUrl,
    };
    setUserData(currentUserData);
  }, []);

  async function refreshProfile(force = false) {
    const currentUserData = localStorage.getItem('userData');
    if (!force && currentUserData !== null) {
      setUserData(JSON.parse(currentUserData));
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${session.user.role}/getById?id=${session.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const newUserData = {
          firstName: data.firstName,
          lastName: data.lastName,
          profileImg: data.profileUrl,
        };
        localStorage.setItem('userData', JSON.stringify(newUserData));
        setUserData(newUserData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function removeProfile() {
    localStorage.removeItem('userData');
    setUserData({
      firstName: '',
      lastName: '',
      profileImg: '',
    });
  }

  return (
    <NavbarProfileContext.Provider
      value={{ userData, refreshProfile, removeProfile }}
    >
      {children}
    </NavbarProfileContext.Provider>
  );
}
