import { sidebarData } from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import ProfileDropdown from './ProfileDropdown';

const Navbar = (props) => {
  const router = useRouter();

  function submitSearch(event) {
    event.preventDefault();
    router.push(`/search?result=${event.target.search_term.value}`);
  }

  return (
    <div className="drawer h-screen w-full">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content mx-auto h-full w-screen">
        <div className="navbar sticky top-0 z-50 w-full bg-primary text-neutral-content shadow-lg">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button btn-square btn-sm sm:btn-md"
            >
              <FontAwesomeIcon
                fixedWidth
                icon={faBars}
                className="text-primary-content"
                size="lg"
              />
            </label>
            <Link href="/" passHref>
              <button className="btn btn-ghost hidden  text-lg font-bold normal-case text-primary-content xs:block sm:text-xl">
                Tuture
              </button>
            </Link>
          </div>
          {/* sa wad dee krub taan sa ma chik chom lom kon chob frontend */}
          <div className="navbar-center">
            <div className="form-control">
              <form onSubmit={(e) => submitSearch(e)} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-bordered input-primary input input-sm w-52 border border-secondary text-base-content xs:w-48 sm:input-md sm:w-72 md:w-96"
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
          </div>

          <div className="navbar-end flex items-center">
            <Link href="/matching">
              <a className="btn btn-ghost btn-sm text-primary-content sm:btn-md">
                Match
              </a>
            </Link>
            <button className="btn btn-ghost btn-square btn-sm sm:btn-md">
              <FontAwesomeIcon
                fixedWidth
                icon={faBell}
                className="text-primary-content"
              />
            </button>
            <ProfileDropdown
              name={'Phusaratis Jong'}
              profileImg={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w'
              }
            />
          </div>
        </div>
        <main className="relative pt-8">{props.children}</main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" />
        <ul className="menu w-80 overflow-y-auto bg-base-100 p-4">
          {sidebarData.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.link}>
                  <a className="justify-start space-x-5">
                    <FontAwesomeIcon icon={item.icon} size="sm" fixedWidth />
                    <h1>{item.name}</h1>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
