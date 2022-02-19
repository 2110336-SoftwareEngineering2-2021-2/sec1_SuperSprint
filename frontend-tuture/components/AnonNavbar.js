import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const AnonNavbar = ({ children }) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="navbar top-0 z-50 w-full text-neutral-content shadow-md shadow-primary-focus/25">
        <div className="flex-1">
          <Link href="/" passHref>
            <button className="btn btn-ghost mx-0 text-lg font-bold normal-case text-primary xs:text-xl sm:mx-4">
              Tuture
            </button>
          </Link>
        </div>

        <div className="flex flex-none items-center">
          <label className="swap btn btn-ghost swap-rotate btn-sm sm:btn-md ">
            <input
              type="checkbox"
              onClick={() =>
                setTheme(theme === 'default' ? 'default-dark' : 'default')
              }
            />
            <FontAwesomeIcon fixedWidth icon={faSun} className="swap-off" />
            <FontAwesomeIcon fixedWidth icon={faMoon} className="swap-on" />
          </label>
          <div className="divider divider-horizontal"></div>
          <Link href="/login">
            <a className="w-20 min-w-fit text-center text-sm normal-case text-base-content transition-colors hover:text-primary-focus sm:w-24 sm:text-base">
              Log In
            </a>
          </Link>
          <Link href="/register">
            <a className="btn btn-primary btn-sm w-20 text-sm normal-case text-primary-content sm:btn-md sm:w-24 sm:text-base">
              Register
            </a>
          </Link>
        </div>
      </div>
      <main className="relative pt-8 transition-colors">{children}</main>
    </>
  );
};

export default AnonNavbar;
