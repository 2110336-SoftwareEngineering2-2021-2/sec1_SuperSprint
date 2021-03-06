import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const AnonNavbar = ({ children }) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="navbar top-0 z-50 w-full text-neutral-content shadow-md shadow-primary-focus/25">
        <div className="flex-1">
          <Link href="/" passHref>
            <a className="btn btn-ghost mx-0 text-lg font-bold normal-case text-primary xs:text-xl sm:mx-4">
              Tuture
            </a>
          </Link>
          <div></div>
        </div>

        <div className="flex flex-none items-center">
          <label className="btn swap btn-ghost btn-sm swap-rotate sm:btn-md ">
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
          <a
            href="/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="w-20 min-w-fit cursor-pointer text-center text-sm normal-case text-base-content transition-colors hover:text-primary-focus sm:w-24 sm:text-base"
          >
            Sign In
          </a>
          <Link href="/signup">
            <a className="btn btn-primary btn-sm w-20 text-sm normal-case text-primary-content sm:btn-md sm:w-24 sm:text-base">
              Sign Up
            </a>
          </Link>
        </div>
      </div>
      <main className="relative pt-8 transition-colors">{children}</main>
    </>
  );
};

export default AnonNavbar;
