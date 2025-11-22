'use client';

import {
  authRestrictedRoutes,
  privateRoutes,
  publicRoutes,
  TopperRoute,
} from '@/Shared/Routes/AuthRoutes';
import { App_url, ROLES } from '@/Shared/static';
import { useAppSelector } from '@/hooks/useReduxHook';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const userType = ROLES?.USER;

  const access_token = useAppSelector(state => state?.auth?.accessToken);

  useEffect(() => {
    if (!pathname) return;

    const isPrivate = privateRoutes?.some(route => pathname?.startsWith(route));
    const isAuthRestricted = authRestrictedRoutes?.some(route =>
      pathname?.startsWith(route),
    );
    const isPublic = publicRoutes?.some(route => pathname?.startsWith(route));

    if (userType === ROLES?.TOPPER) {
      const isTopperRoute = TopperRoute?.some(route =>
        pathname?.startsWith(route),
      );

      if (!isTopperRoute) {
        redirect(App_url?.link?.HOME_URL);
      }
      return;
    }

    if (access_token && pathname === App_url?.link?.SIGNIN_URL) {
      return;
    }

    if (isPrivate && !access_token) {
      redirect(App_url?.link?.SIGNIN_URL);
    } else if (isAuthRestricted && access_token) {
      redirect(App_url?.link?.HOME_URL);
    } else if (!isPrivate && !isAuthRestricted && !isPublic) {
      redirect(App_url?.link?.HOME_URL);
    }
  }, [pathname, access_token]);

  return <>{children}</>;
}
