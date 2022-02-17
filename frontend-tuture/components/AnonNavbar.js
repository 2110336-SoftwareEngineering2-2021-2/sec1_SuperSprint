import Link from 'next/link';

const AnonNavbar = (props) => {
  return (
    <>
      <div className="navbar top-0 z-50 w-full text-neutral-content shadow-md shadow-primary-focus/25">
        <div className="flex-1">
          <Link href="/" passHref>
            <button className="btn btn-ghost mx-0 text-lg font-bold normal-case text-primary sm:mx-4 xs:text-xl">
              Tuture
            </button>
          </Link>
        </div>

        <div className="flex flex-none items-center">
          <Link href="/login">
            <a className="w-20 min-w-fit text-center text-sm text-base-content transition-colors hover:text-primary-focus sm:w-24 sm:text-base">
              Log In
            </a>
          </Link>
          <Link href="/register">
            <a className="btn btn-primary btn-sm w-20 normal-case text-sm sm:text-base text-primary-content sm:btn-md sm:w-24">
              Register
            </a>
          </Link>
        </div>
      </div>
      <main className="relative pt-8">{props.children}</main>
    </>
  );
};

export default AnonNavbar;
