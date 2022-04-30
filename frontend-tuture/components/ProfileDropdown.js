import {
  faCog,
  faMoon,
  faSignOutAlt,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import avatarUrl from '../lib/avatarUrl';
import { useSession } from 'next-auth/react';

function ProfileDropdown({
  firstName,
  lastName,
  userId,
  profileImg,
  onSignOut,
}) {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="avatar btn btn-ghost btn-circle">
        <div className="w-10 rounded-full xs:w-12">
          <img
            alt="User profile picture"
            src={avatarUrl(profileImg, firstName + lastName + userId)}
          />
        </div>
      </label>
      <ul
        tabIndex="0"
        className="dropdown-content menu rounded-box menu-compact w-56 bg-base-100 p-2 shadow-md shadow-secondary/20 sm:menu-normal sm:w-64"
      >
        <li className="menu-title">
          <div className="mb-2 flex w-full items-center justify-start gap-2">
            <div tabIndex="0" className="flex-0 avatar hidden xs:block">
              <div className="mask mask-squircle w-0 min-w-fit rounded-full xs:h-12 xs:w-12 md:h-14 md:w-14">
                <img
                  alt="User profile picture"
                  src={avatarUrl(profileImg, firstName + lastName + userId)}
                />
              </div>
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-neutral-content">
              {`${firstName} ${lastName}`}
            </span>
          </div>
        </li>
        {session?.user?.role !== 'admin' && (
          <li>
            <Link href="/profile">
              <a>
                <FontAwesomeIcon fixedWidth icon={faUser} />
                View Profile
              </a>
            </Link>
          </li>
        )}
        <li>
          <a
            onClick={() =>
              setTheme(theme === 'default' ? 'default-dark' : 'default')
            }
          >
            <label
              className={`swap swap-rotate ${
                theme === 'default' ? 'swap-active' : ''
              }`}
            >
              <FontAwesomeIcon fixedWidth icon={faSun} className="swap-on" />
              <FontAwesomeIcon fixedWidth icon={faMoon} className="swap-off" />
            </label>
            Current Theme: {theme === 'default' ? 'Light' : 'Dark'}
          </a>
        </li>
        {/* <li>
          <Link href="/setting">
            <a>
              <FontAwesomeIcon fixedWidth icon={faCog} />
              Setting
            </a>
          </Link>
        </li> */}
        <li>
          <a
            onClick={() => {
              if (onSignOut) onSignOut();
              signOut({ callbackUrl: '/signin' });
            }}
          >
            <FontAwesomeIcon fixedWidth icon={faSignOutAlt} />
            Sign Out
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
