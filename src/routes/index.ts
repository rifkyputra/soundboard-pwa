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
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Login')),
    path: '/login',
    title: 'Login',
  },
  [Pages.Register]: {
    component: asyncComponentLoader(() => import('@/pages/Register')),
    path: '/register',
    title: 'Register',
  },
  [Pages.Logout]: {
    component: asyncComponentLoader(() => import('@/pages/Logout')),
    path: '/logout',
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
