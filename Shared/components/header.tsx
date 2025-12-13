'use client';

import { App_url, NAV_CONFIG, ROLES } from '@/Shared/static';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useModalController } from '@/hooks/useModalController';
import { useAppSelector } from '@/hooks/useReduxHook';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '../lib/utils';

export function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { openModal } = useModalController();
  const [open, setOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const accessToken = useAppSelector(state => state?.auth?.accessToken);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const userType = ROLES?.USER;
  const navItems =
    userType === ROLES?.TOPPER ? NAV_CONFIG.topper : NAV_CONFIG.external;

  const renderNavItems = (isMobile = false) =>
    navItems?.map(item => {
      const active =
        item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

      const baseClass = cn(
        isMobile ? 'block rounded px-3 py-2' : 'transition-colors',
        'font-opensans-semibold text-md',
      );

      const stateClass = active
        ? isMobile
          ? 'bg-blue-600 text-white'
          : 'text-blue-600'
        : isMobile
          ? 'text-gray-800 hover:bg-gray-100'
          : 'text-gray-800 hover:text-blue-600';

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => isMobile && setOpen(false)}
          className={cn(baseClass, stateClass)}
          aria-current={active ? 'page' : undefined}
        >
          {item.name}
        </Link>
      );
    });

  const handleLogout = useCallback(
    () => openModal({ name: 'Thank You' }),
    [openModal],
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-3">
        {/* Logo */}
        <Link href={App_url.link.HOME_URL} className="flex items-center gap-2">
          <img src={App_url.icon.LOGO} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-6 xl:flex">{renderNavItems()}</nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-3 xl:flex">
          {userType === ROLES.USER && (
            <>
              <Button
                asChild
                className={cn(
                  'h-10 border-blue-600',
                  pathname === App_url.link.DASHBOARD_URL
                    ? 'bg-blue-600 text-white'
                    : 'border border-blue-600 bg-transparent text-blue-600',
                )}
              >
                <Link href={App_url.link.DASHBOARD_URL}>
                  <img
                    src={
                      pathname === App_url.link.DASHBOARD_URL
                        ? App_url.icon.CALENDER_ACTIVE
                        : App_url.icon.CALENDER
                    }
                    alt="calender"
                  />
                  Dashboard
                </Link>
              </Button>

              {/* Profile Dropdown */}
              {accessToken ? (
                <span className="group relative flex h-10 cursor-pointer items-center gap-1 rounded-sm bg-blue-600 px-3 text-white">
                  <img src={App_url.icon.PROFILE_ICON} alt="profile icon" />
                  <span>My Profile</span>

                  <ul className="absolute top-full right-0 hidden w-30 rounded-sm border bg-white px-1 py-1 shadow group-hover:block">
                    <li className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        className="h-10 w-full justify-start rounded-sm bg-transparent py-2 text-sm text-gray-800 hover:bg-blue-600 hover:text-white"
                        onClick={() => router.push(App_url.link.DASHBOARD_URL)}
                      >
                        Profile
                      </Button>

                      <Button
                        variant="ghost"
                        className="h-10 w-full justify-start rounded-sm bg-transparent py-2 text-sm text-gray-800 hover:bg-blue-600 hover:text-white"
                        disabled={isLoading}
                        onClick={handleLogout}
                      >
                        {isLoading ? 'Logging out…' : 'Logout'}
                      </Button>
                    </li>
                  </ul>
                </span>
              ) : (
                <Button asChild className="h-10 bg-blue-600 text-white">
                  <Link href={App_url.link.SIGNIN_URL}>
                    <img src={App_url.icon.SIGNIN} alt="Signin" />
                    Sign in
                  </Link>
                </Button>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="h-14 w-14 p-0 xl:hidden">
              <Menu className="h-12 w-12 text-gray-900" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0 [&>button]:hidden">
            <SheetHeader className="flex items-center justify-between border-b p-4">
              <Link
                href={App_url.link.HOME_URL}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <img src={App_url.icon.LOGO} className="h-10 w-auto" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center"
              >
                <X className="h-6 w-6 text-gray-900" />
              </button>
            </SheetHeader>

            {/* Mobile Nav */}
            <nav className="flex flex-col gap-2 p-4">
              {renderNavItems(true)}

              <div className="mt-4 flex flex-col gap-2">
                {/* Dashboard */}
                <Button
                  asChild
                  className={cn(
                    'mb-3 h-10 border-blue-600',
                    pathname === App_url.link.DASHBOARD_URL
                      ? 'bg-blue-600 text-white'
                      : 'border border-blue-600 bg-transparent text-blue-600',
                  )}
                >
                  <Link
                    href={App_url.link.DASHBOARD_URL}
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src={
                        pathname === App_url.link.DASHBOARD_URL
                          ? App_url.icon.CALENDER_ACTIVE
                          : App_url.icon.CALENDER
                      }
                      alt="cal"
                    />
                    Dashboard
                  </Link>
                </Button>

                {/* Mobile Profile */}
                {accessToken ? (
                  <>
                    <Button
                      className="flex h-10 w-full items-center gap-1 bg-blue-600 text-white"
                      onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                    >
                      <img src={App_url.icon.PROFILE_ICON} />
                      My Profile
                    </Button>

                    {mobileProfileOpen && (
                      <ul className="mt-1 w-full rounded-sm border bg-white px-1 py-1 shadow">
                        <li className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            className="h-10 w-full justify-start py-2 text-sm text-gray-800 hover:bg-blue-600 hover:text-white"
                            onClick={() => {
                              router.push(App_url.link.ABOUT_URL);
                              setOpen(false);
                            }}
                          >
                            Profile
                          </Button>
                          <Button
                            variant="ghost"
                            className="h-10 w-full justify-start py-2 text-sm text-gray-800 hover:bg-blue-600 hover:text-white"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Button asChild className="h-10 bg-blue-600 text-white">
                    <Link href={App_url.link.SIGNIN_URL}>Sign in</Link>
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
