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
    href: "/blog",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
  {
    name: "Notes",
    href: "/notes",
    isExternal: true,
  },
];
