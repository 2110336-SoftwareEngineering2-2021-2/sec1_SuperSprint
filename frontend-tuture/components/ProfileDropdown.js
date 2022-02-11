import {
  faAdjust,
  faCog,
  faSignOutAlt,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function ProfileDropdown({ name, profileImg }) {
  return (
    <div className="dropdown-end dropdown h-10 w-10 xs:h-12 xs:w-12">
      <div tabIndex="0" className="avatar">
        <div className="h-10 w-10 cursor-pointer rounded-full border-2 border-white transition-colors hover:border-primary-focus xs:h-12 xs:w-12">
          <img src={profileImg} />
        </div>
      </div>
      <ul
        tabIndex="0"
        className="dropdown-content menu rounded-box menu-compact w-56 bg-base-100 p-2 shadow-md shadow-secondary/20 sm:menu-normal sm:w-64"
      >
        <li className="menu-title">
          <div className="mb-2 flex w-full items-center justify-around gap-2">
            <div tabIndex="0" className="flex-0 avatar">
              <div className="invisible w-0 min-w-fit rounded-full xs:visible xs:h-12 xs:w-12 md:h-14 md:w-14">
                <img src={profileImg} />
              </div>
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
              {name}
            </span>
          </div>
        </li>
        <li>
          <Link href="/profile">
            <a>
              <FontAwesomeIcon fixedWidth icon={faUser} className="mr-2" />
              View Profile
            </a>
          </Link>
        </li>
        <li>
          <a>
            <FontAwesomeIcon fixedWidth icon={faAdjust} className="mr-2" />
            Current Theme: {"Light"}
          </a>
        </li>
        <li>
          <Link href="/setting">
            <a>
              <FontAwesomeIcon fixedWidth icon={faCog} className="mr-2" />
              Setting
            </a>
          </Link>
        </li>
        <li>
          <Link href="/logout">
            <a>
              <FontAwesomeIcon
                fixedWidth
                icon={faSignOutAlt}
                className="mr-2"
              />
              Logout
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
