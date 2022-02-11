import React from 'react'
import {
    faHouseUser,
    faCalendarDay,
    faHistory
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const sidebarData = [
    {
        name: "Home",
        icon: faHouseUser,
        link: "/"
    },
    {
        name: "Schedule",
        icon: faCalendarDay,
        link: "/matching/schedule"
    },
    {
        name: "Match History",
        icon: faHistory,
        link: "/matching/history"
    }
]
