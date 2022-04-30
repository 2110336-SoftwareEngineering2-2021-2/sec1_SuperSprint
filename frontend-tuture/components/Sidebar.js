import {
  faHouseUser,
  faCalendarDay,
  faComment,
  faHistory,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';

export const sidebarData = [
  {
    name: 'Home',
    icon: faHouseUser,
    link: '/',
    permit: ['student', 'tutor'],
  },
  {
    name: 'Chat',
    icon: faComment,
    link: '/chat',
    permit: ['student', 'tutor'],
  },
  {
    name: 'Appointment',
    icon: faCalendarDay,
    link: '/appointment',
    permit: ['student', 'tutor'],
  },
  // {
  //   name: 'Match History',
  //   icon: faHistory,
  //   link: '/matching/history',
  //   permit: ['student', 'tutor'],
  // },
];

export const sidebarAdminData = [
  {
    name: 'Home',
    icon: faHouseUser,
    link: '/admin',
    permit: ['admin'],
  },
  {
    name: 'Score',
    icon: faCheckDouble,
    link: '/admin/score',
    permit: ['admin'],
  },
];
