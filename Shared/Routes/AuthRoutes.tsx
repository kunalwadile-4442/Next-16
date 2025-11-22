import { App_url } from '../static';

export const privateRoutes = [App_url.link.DASHBOARD_URL];

export const authRestrictedRoutes = [
  App_url.link.SIGNIN_URL,
  App_url.link.SIGNUP_URL,
];

export const publicRoutes = Object.values(App_url.link).filter(
  link => !privateRoutes.includes(link) && !authRestrictedRoutes.includes(link),
);

export const TopperRoute = [App_url?.link?.HOME_URL];
