import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

enum Pages {
  Welcome,
  Personal,
  Situations,
  NotFound,
  Settings,
  Login,
  Register,
  Logout,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
