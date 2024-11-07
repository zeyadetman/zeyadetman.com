import { Route } from "@/app/_components/layout/interface";

export const routes: Route[] = [
  {
    name: "Home",
    href: "/",
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
