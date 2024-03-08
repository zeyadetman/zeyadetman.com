"use client";

import { renderRoutes } from "@/app/components/layout/utils/renderRoutes";
import { List } from "@phosphor-icons/react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="mt-4 md:mt-8">
      <div className="navbar bg-base-100">
        <div className="flex-grow px-4 w-20 h-20">
          <Image
            src="/logo.png"
            className="w-full rounded-md invert-[10%]"
            alt="logo"
            width={50}
            height={50}
            priority
          />
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

              <nav className="flex-none hidden md:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                  {renderRoutes()}
                </ul>
              </nav>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="nav-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <ul className="menu gap-1 p-4 w-80 min-h-full bg-base-200">
              {renderRoutes()}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
