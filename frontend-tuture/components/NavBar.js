import { useState , useEffect} from 'react';
import { sideBarData } from './SideBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
import Link from 'next/link';
import {
    faUser
  } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
    const [sideBar, setSideBar] = useState(false);

    const toggleSideBar = () => {
        setSideBar(!sideBar);
    }

    return (
        <>

            <div className="navbar mb-2 shadow-lg bg-primary text-neutral-content sticky w-full">

            <div className="flex-none lg:flex">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"></input>
            <button for="my-drawer" className="btn drawer-button btn-square btn-ghost" onClick={toggleSideBar}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">           
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" className="stroke-base-100"></path>               
                </svg>
            </button> 

            </div>

            <div className="flex-1 hidden px-2 mx-2 lg:flex">
            <span className="text-lg font-bold text-base-100">
                    Tuture
                    </span>
            </div> 

            <div className="flex-1 justify-end">
            <div className="form-control">
                <input type="text" placeholder="Search..." className="input text-black"></input>
            </div>
            </div> 
            <div className="flex-none">
            <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">             
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="stroke-base-100"></path>             
                </svg>
            </button>
            </div> 
            <div className="flex-none">
            <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">     
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="stroke-base-100"></path>                     
                </svg>
            </button>
            </div> 
            <div className="flex-none">
            <div className="avatar">
                <div className="rounded-full w-10 h-10 m-1">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w"></img>
                </div>
            </div>
            </div>
            </div>



            {/* {closedrawer && ( */}
            <div className="drawer drawer-side fixed h-screen w-full" >
                <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={sideBar} />

                <div className="drawer-content mx-auto pt-8 h-screen w-screen pb-10"> 
                    {props.children}
                </div>

                <div className="drawer-side">
                    <label for="my-drawer" className="drawer-overlay" onClick={toggleSideBar} ></label>
                    <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
                    {sideBarData.map((item,index) => {
                        return (
                        <li key={index}>
                            <Link href="/testpage">
                            <a className="justify-start space-x-5">
                            <FontAwesomeIcon icon={item.icon} size="sm" fixedWidth/>
                            <h1>{item.name}</h1>
                            </a>
                            </Link>
                        </li>
                        )
                    })}
                    </ul>
                </div>
            </div> 
            {/* )} */}
        </>
    );
};

export default NavBar;