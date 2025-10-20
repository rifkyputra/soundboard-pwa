import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  [Pages.Personal]: {
    component: asyncComponentLoader(() => import('@/pages/Personal')),
    path: '/personal',
    title: 'Personal',
  },
  [Pages.Situations]: {
    component: asyncComponentLoader(() => import('@/pages/Situations')),
    path: '/situations',
    title: 'Situations',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
  [Pages.Settings]: {
    component: asyncComponentLoader(() => import('@/pages/Settings')),
    path: '/settings',
    title: 'Settings',
  },
};

export default routes;
