import {
  faAdjust,
  faCog,
  faMoon,
  faSignOutAlt,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import Link from 'next/link';

function ProfileDropdown({ name, profileImg }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown-end dropdown h-10 w-10 xs:h-12 xs:w-12">
      <div tabIndex="0" className="avatar">
        <div className="h-10 w-10 cursor-pointer rounded-full border-2 border-white transition-colors hover:border-primary-focus xs:h-12 xs:w-12">
          <img alt="User profile picture" src={profileImg} />
        </div>
      </div>
      <ul
        tabIndex="0"
        className="dropdown-content menu rounded-box menu-compact w-56 bg-base-100 p-2 shadow-md shadow-secondary/20 sm:menu-normal sm:w-64"
      >
        <li className="menu-title">
          <div className="mb-2 flex w-full items-center justify-start gap-2">
            <div tabIndex="0" className="flex-0 avatar hidden xs:block">
              <div className="mask mask-squircle w-0 min-w-fit rounded-full xs:h-12 xs:w-12 md:h-14 md:w-14">
                <img alt="User profile picture" src={profileImg} />
              </div>
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-neutral-content">
              {name}
            </span>
          </div>
        </li>
        <li>
          <Link href="/profile">
            <a>
              <FontAwesomeIcon fixedWidth icon={faUser} />
              View Profile
            </a>
          </Link>
        </li>
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
              <input type="checkbox" />
              <FontAwesomeIcon fixedWidth icon={faSun} className="swap-on" />
              <FontAwesomeIcon fixedWidth icon={faMoon} className="swap-off" />
            </label>
            Current Theme: {theme === 'default' ? 'Light' : 'Dark'}
          </a>
        </li>
        <li>
          <Link href="/setting">
            <a>
              <FontAwesomeIcon fixedWidth icon={faCog} />
              Setting
            </a>
          </Link>
        </li>
        <li>
          <Link href="/logout">
            <a>
              <FontAwesomeIcon fixedWidth icon={faSignOutAlt} />
              Logout
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
