import { routes } from "@/app/_components/layout/config/routes";
import { ArrowSquareOut } from "@phosphor-icons/react";
import Link from "next/link";

export const renderRoutes = () => {
  return routes.map((route) => (
    <li key={route.name}>
      <Link
        href={route.href}
        target={route.isExternal ? "_blank" : "_self"}
        rel="noreferrer"
      >
        {route.name}
        {route.isExternal && <ArrowSquareOut />}
      </Link>
    </li>
  ));
};
