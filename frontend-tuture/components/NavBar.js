import { useState, useEffect } from "react";
import { sideBarData } from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
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
      <div className="navbar bg-primary text-neutral-content sticky mb-2 w-full shadow-lg">
        <div className="navbar-start">
          <div className="flex-none lg:flex">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <button
              for="my-drawer"
              className="btn drawer-button btn-square btn-ghost"
              onClick={toggleSideBar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                  className="stroke-base-100"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mx-2 hidden w-fit px-2 lg:flex">
            <span className="text-base-100 text-lg font-bold">Tuture</span>
          </div>
        </div>
        {/* sa wad dee krub taan sa ma chik chom lom kon chob frontend */}
        <div className="navbar-center">
          <div className="flex-1 justify-start">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search..."
                className="input text-base-content sm:w-96 w-54"
                value={tutureName}
                onInput={(e) => setTutureName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex-none">
            <button
              className="btn btn-square btn-ghost"
              onClick={submitSearching}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  className="stroke-base-100"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  className="stroke-base-100"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-none">
            <div className="avatar">
              <div className="m-1 h-10 w-10 rounded-full">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w"></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {closedrawer && ( */}
      <div className="drawer drawer-side fixed h-screen w-full">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={sideBar}
        />

        <div className="drawer-content mx-auto h-screen w-screen pt-8 pb-10">
          {props.children}
        </div>

        <div className="drawer-side">
          <label
            for="my-drawer"
            className="drawer-overlay"
            onClick={toggleSideBar}
          ></label>
          <ul className="menu bg-base-100 w-80 overflow-y-auto p-4">
            {sideBarData.map((item, index) => {
              return (
                <li key={index}>
                  <Link href="/testpage">
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

export default NavBar;
