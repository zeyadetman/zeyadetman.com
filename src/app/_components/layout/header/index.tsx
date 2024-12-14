"use client";

import { renderRoutes } from "@/app/_components/layout/utils/renderRoutes";
import { ThemeSwitcher } from "@/app/_components/theme-switcher/theme-switcher";
import { List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="mt-4 md:mt-8" suppressHydrationWarning>
      <div className="navbar bg-base-100">
        <div className="flex-grow px-4 w-24 h-24">
          <Link href="/">
            <Image
              src="/logo.png"
              className="w-full rounded-md invert-[10%]"
              alt="logo"
              width={164}
              height={164}
              priority
            />
          </Link>
        </div>

        <div className="drawer drawer-end">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="w-full navbar justify-end">
              <div className="flex-none md:hidden">
                <label
                  htmlFor="nav-drawer"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <List size={20} />
                </label>
              </div>

              <nav
                className="flex-none hidden md:flex"
                suppressHydrationWarning
              >
                <ul className="menu menu-horizontal px-1 gap-1">
                  {renderRoutes()}
                </ul>
                <ThemeSwitcher />
              </nav>
            </div>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="nav-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <ul className="menu gap-1 pt-9 p-4 w-64 min-h-full bg-base-200">
              <ThemeSwitcher />
              {renderRoutes()}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
