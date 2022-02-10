import React from 'react'
import {
    faHouseUser,
    faCalendarDay,
    faHistory
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const sideBarData = [
    {
        name: "Home",
        icon: faHouseUser
    },
    {
        name: "Schedule",
        icon: faCalendarDay
    },
    {
        name: "Match History",
        icon: faHistory
    }
]
