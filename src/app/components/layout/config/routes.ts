import { Route } from "@/app/components/layout/interface";

export const routes: Route[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Blog",
    href: "/posts",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
  {
    name: "Notes",
    href: "https://notes.zeyadetman.com",
    isExternal: true,
  },
];
