import { sidebarData, sidebarAdminData } from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProfileDropdown from './ProfileDropdown';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { NavbarProfileContext } from '../context/NavbarProfileContext';

const Navbar = (props) => {
  const { data: session } = useSession();
  const profileContext = useContext(NavbarProfileContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function submitSearch(event) {
    event.preventDefault();
    router.push(`/search?result=${event.target.search_term.value}`);
  }

  return (
    <div className="drawer h-screen w-full">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content mx-auto h-full w-screen">
        <div className="navbar sticky top-0 z-50 h-[8vh] w-full bg-primary text-neutral-content shadow-lg">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost btn-square btn-sm drawer-button sm:btn-md"
            >
              <FontAwesomeIcon
                fixedWidth
                icon={faBars}
                className="text-primary-content"
                size="lg"
              />
            </label>
            <Link
              href={session?.user?.role !== 'admin' ? '/' : '/admin'}
              passHref
            >
              <a className="btn btn-ghost w-0 text-lg font-bold normal-case text-primary-content xs:w-auto sm:text-xl">
                {session?.user?.role !== 'admin' ? 'Tuture' : 'Tuture Admin'}
              </a>
            </Link>
          </div>
          {/* sa wad dee krub taan sa ma chik chom lom kon chob frontend */}
          <div className="navbar-center">
            {session.user.role === 'student' && (
              <div className="form-control">
                <form onSubmit={(e) => submitSearch(e)} className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered input-primary input-sm w-52 border border-secondary text-base-content xs:w-48 sm:input-md sm:w-72 md:w-96"
                    id="search_term"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-square btn-sm absolute top-0 right-0 rounded-l-none border border-secondary text-xs sm:btn-md sm:text-base"
                  >
                    <FontAwesomeIcon
                      fixedWidth
                      icon={faSearch}
                      className="text-primary-content"
                    />
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="navbar-end flex items-center">
            {session.user.role === 'student' && (
              <Link href="/matching">
                <a className="btn btn-ghost btn-sm text-primary-content sm:btn-md">
                  Match
                </a>
              </Link>
            )}
            {session.user.role === 'tutor' && (
              <Link href="/appointment">
                <a className="btn btn-ghost btn-sm text-primary-content sm:btn-md">
                  Appointment
                </a>
              </Link>
            )}
            {/* <button className="btn btn-ghost btn-square btn-sm sm:btn-md">
              <FontAwesomeIcon
                fixedWidth
                icon={faBell}
                className="text-primary-content"
              />
            </button> */}
            <ProfileDropdown
              firstName={profileContext.userData.firstName}
              lastName={profileContext.userData.lastName}
              userId={session.user._id}
              profileImg={profileContext.userData.profileImg}
              onSignOut={() => profileContext.removeProfile()}
            />
          </div>
        </div>

        <main className="relative h-[92vh] pt-8 ">{props.children}</main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" />
        <ul className="menu w-80 overflow-y-auto bg-base-100 p-4">
          {session.user.role !== 'admin' ? sidebarData.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>
                <a className="justify-start space-x-5">
                  <FontAwesomeIcon icon={item.icon} size="sm" fixedWidth />
                  <h1>{item.name}</h1>
                </a>
              </Link>
            </li>
          )) : sidebarAdminData.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>
                <a className="justify-start space-x-5">
                  <FontAwesomeIcon icon={item.icon} size="sm" fixedWidth />
                  <h1>{item.name}</h1>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
