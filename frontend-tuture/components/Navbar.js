import { useState, useEffect } from "react";
import { sidebarData } from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { faBars, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = (props) => {
  const [sideBar, setSideBar] = useState(false);
  const [tutureName, setTutureName] = useState("");

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };
  const router = useRouter();
  function submitSearching() {
    console.log("Hello");
    router.push(`/search?result=${tutureName}`);
  }

  return (
    <>
      {/* {closedrawer && ( */}
      <div className="drawer h-screen w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content mx-auto h-full w-screen">
          <div className="navbar sticky top-0 z-50 w-full bg-primary text-neutral-content shadow-lg">
            <div className="navbar-start">
              <label
                for="my-drawer"
                className="btn sm:btn-md btn-sm btn-ghost drawer-button btn-square"
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon={faBars}
                  className="text-primary-content"
                  size="lg"
                />
              </label>
              <span className="mx-2 select-none xs:block hidden sm:text-xl text-lg font-bold text-base-100">
                Tuture
              </span>
            </div>
            {/* sa wad dee krub taan sa ma chik chom lom kon chob frontend */}
            <div className="navbar-center">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input sm:input-md input-sm text-base-content md:w-96 sm:w-72 xs:w-48 w-56"
                  value={tutureName}
                  onInput={(e) => setTutureName(e.target.value)}
                ></input>
              </div>
              <button
                className="btn btn-ghost btn-square sm:btn-md btn-sm"
                onClick={submitSearching}
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon={faSearch}
                  className="text-primary-content"
                />
              </button>
            </div>

            <div className="navbar-end flex items-center">
              <button className="btn sm:btn-md btn-sm btn-ghost btn-square">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faBell}
                  className="text-primary-content"
                />
              </button>
              <ProfileDropdown
                name={"Pracha Chan-o-yutto"}
                profileImg={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w"
                }
              />
            </div>
          </div>
          <main className="relative pt-8">{props.children}</main>
        </div>

        <div className="drawer-side">
          <label for="my-drawer" className="drawer-overlay" />
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
      {/* )} */}
    </>
  );
};

export default Navbar;
